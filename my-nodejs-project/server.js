require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer = require('multer');

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

const jwt = require('jsonwebtoken');

// Thêm logic tạo JWT token trong quá trình đăng nhập
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const request = new sql.Request();
    const result = await request
      .input('Email', sql.NVarChar, email)
      .query('SELECT Password, AccountID FROM Account WHERE Email = @Email');

    if (result.recordset.length === 0) {
      return res.status(400).json({ message: 'Email không tồn tại.' });
    }

    const hashedPassword = result.recordset[0].Password.toString();
    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      return res.status(401).json({ message: 'Mật khẩu không chính xác.' });
    }

    // Tạo JWT token sau khi đăng nhập thành công
    const user = result.recordset[0];
    const token = jwt.sign({ userID: user.AccountID, email: email }, 'your_jwt_secret', { expiresIn: '1h' });

    // Trả về token cho người dùng
    res.status(200).json({ message: 'Đăng nhập thành công!', token });
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



// Cấu hình Multer để lưu trữ file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Thư mục để lưu trữ CV
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file độc nhất dựa vào thời gian
  }
});

const upload = multer({ storage: storage });

// Middleware xác thực JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Không có token, vui lòng đăng nhập.' });

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Token không hợp lệ.' });
    req.user = user;  // Lưu thông tin người dùng vào đối tượng req
    next();
  });
};

// API tải lên CV
app.post('/uploadCV', authenticateToken, upload.single('cvFile'), async (req, res) => {
  try {
    const { email, fullName, jobPosition } = req.user; // Lấy thông tin người dùng từ token
    const cvFilePath = req.file ? req.file.path : null;

    if (!cvFilePath) {
      return res.status(400).json({ message: 'Vui lòng chọn tệp CV để tải lên.' });
    }

    const pool = await sql.connect(config); // Đảm bảo bạn sử dụng đúng cấu hình kết nối SQL
    const result = await pool.request()
      .input('FilePathAttribute', sql.NVarChar(sql.MAX), cvFilePath)
      .input('TieuDe', sql.NVarChar(255), jobPosition) // Ví dụ sử dụng tên vị trí làm tiêu đề
      .input('CTCV_ID', sql.Int, 1) // Cập nhật giá trị thực tế của CTCV_ID theo yêu cầu
      .input('UserID', sql.Int, req.user.userID) // Lấy từ token đã lưu
      .query(`
        INSERT INTO CV (FilePathAttribute, TieuDe, CTCV_ID, UserID, CreatedAt, UpdatedAt)
        VALUES (@FilePathAttribute, @TieuDe, @CTCV_ID, @UserID, GETDATE(), GETDATE())
      `);

    res.status(200).json({ message: 'CV đã được tải lên thành công.' });
  } catch (error) {
    console.error('Lỗi khi tải lên CV:', error);
    res.status(500).json({ message: 'Lỗi khi tải lên CV.' });
  }
});



app.post("/change-password", async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    // Truy xuất chi tiết người dùng từ cơ sở dữ liệu
    const result = await sql.query`SELECT Password FROM Account WHERE Email = ${email}`;
    const user = result.recordset[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // So sánh mật khẩu hiện tại với mật khẩu trong cơ sở dữ liệu
    const isPasswordMatch = await bcrypt.compare(currentPassword, user.Password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Băm mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu trong cơ sở dữ liệu
    await sql.query`UPDATE Account SET Password = ${hashedPassword} WHERE Email = ${email}`;

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Server error" });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});