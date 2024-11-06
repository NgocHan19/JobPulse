require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// SQL Server configuration
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Connect to SQL Server
sql.connect(config)
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error:', err));

// Nodemailer configuration for email sending
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate random verification code
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send verification email
async function sendVerificationEmail(email, verificationToken) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Xác thực tài khoản',
    text: `Mã xác thực của bạn là: ${verificationToken}. Mã này sẽ hết hạn trong 5 phút.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Registration endpoint
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationCode();
    const tokenExpiration = new Date(Date.now() + 5 * 60 * 1000); // Expires in 5 minutes

    // Insert the account data into SQL Server
    const request = new sql.Request();
    const accountResult = await request
      .input('Email', sql.NVarChar, email)
      .input('Password', sql.VarBinary, Buffer.from(hashedPassword))
      .input('VerificationToken', sql.NVarChar, verificationToken)
      .input('TokenExpiration', sql.DateTime, tokenExpiration)
      .query(`INSERT INTO Account (Email, Password, VerificationToken, TokenExpiration, CreatedAt)
              VALUES (@Email, @Password, @VerificationToken, @TokenExpiration, GETDATE());
              SELECT SCOPE_IDENTITY() AS AccountID;`);
    const accountId = accountResult.recordset[0].AccountID;

    // Assign default role 'Người Tìm Việc' to Account
    await request
      .input('AccountID', sql.Int, accountId)
      .input('RoleID', sql.Int, 1) // Assuming 1 is the RoleID for 'Người Tìm Việc'
      .query(`INSERT INTO AccountRole (AccountID, RoleID, CreatedAt) VALUES (@AccountID, @RoleID, GETDATE())`);

    // Send the OTP email
    const emailSent = await sendVerificationEmail(email, verificationToken);
    if (emailSent) {
      res.status(201).json({ message: 'Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản.' });
    } else {
      res.status(500).json({ message: 'Lỗi khi gửi email xác thực.' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Lỗi khi đăng ký tài khoản.' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const request = new sql.Request();
      const result = await request
          .input('Email', sql.NVarChar, email)
          .query('SELECT Password FROM Account WHERE Email = @Email');

      if (result.recordset.length === 0) {
          return res.status(400).json({ message: 'Email không tồn tại.' });
      }

      const hashedPassword = result.recordset[0].Password.toString();
      const match = await bcrypt.compare(password, hashedPassword);

      if (!match) {
          return res.status(401).json({ message: 'Mật khẩu không chính xác.' });
      }

      res.status(200).json({ message: 'Đăng nhập thành công!' });
  } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Lỗi khi đăng nhập.' });
  }
});

// OTP Verification endpoint
app.post('/OTPVerification', async (req, res) => {
  const { email, verificationToken } = req.body;
  try {
    const request = new sql.Request();
    const result = await request
      .input('Email', sql.NVarChar, email)
      .query(`SELECT VerificationToken, TokenExpiration FROM Account WHERE Email = @Email`);

    if (result.recordset.length === 0) {
      return res.status(400).json({ message: 'Email không tồn tại.' });
    }

    const { VerificationToken, TokenExpiration } = result.recordset[0];
    if (VerificationToken !== verificationToken) {
      return res.status(400).json({ message: 'Mã xác thực không chính xác.' });
    }

    if (new Date() > TokenExpiration) {
      return res.status(400).json({ message: 'Mã xác thực đã hết hạn.' });
    }

    // Update the account's verification status
    await request.query(`UPDATE Account SET IsVerified = 1, VerificationToken = NULL, TokenExpiration = NULL WHERE Email = '${email}'`);
    res.json({ message: 'Xác thực tài khoản thành công.' });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ message: 'Lỗi khi xác thực tài khoản.' });
  }
});

// Additional endpoints for UserProfile, AccountRole, etc., would follow similar adjustments











const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
