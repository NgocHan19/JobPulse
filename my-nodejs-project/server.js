require('dotenv').config(); // Nạp các biến môi trường từ file .env
const express = require('express');
const sql = require('mssql');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Để xử lý JSON trong request body

// In ra giá trị biến môi trường để kiểm tra
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

// Cấu hình kết nối SQL Server
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true
  },
  // authentication: {
  //   type: 'default',
  //   options: {
  //     domain: '',
  //     userName: '',
  //     password: ''
  //   }
  // }
};
// Kết nối đến SQL Server
sql.connect(config)
    .then(pool => {
        console.log('Kết nối thành công!');
        // Phần còn lại của mã xử lý đăng ký
    })
    .catch(err => {
        console.error('Kết nối thất bại:', err);
    });

// Cấu hình nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Thay đổi theo máy chủ SMTP của bạn
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Endpoint đăng ký
app.post('/api/register', async (req, res) => {
  const { email, password, fullname } = req.body;

  try {
    const pool = await sql.connect(config);
    const existingUser = await pool.request()
      .input('Email', sql.NVarChar, email) 
      .query(`SELECT * FROM Account WHERE Email = @Email`);

    if (existingUser.recordset.length > 0) {
      return res.status(400).json({ message: 'Email đã được sử dụng.' });
    }

    // Băm mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    // Chuyển đổi mật khẩu băm sang dạng nhị phân
    const binaryPassword = Buffer.from(hashedPassword, 'utf-8');

    const verificationToken = generateVerificationToken(); // Hàm sinh token
    const tokenExpiration = new Date(Date.now() + 5 * 60 * 1000); // Token hết hạn sau 5 phút

    // Lưu thông tin vào bảng Account
    await pool.request()
      .input('Email', sql.NVarChar, email)
      .input('Password', sql.VarBinary, binaryPassword)
      .input('VerificationToken', sql.NVarChar, verificationToken)
      .input('TokenExpiration', sql.DateTime, tokenExpiration)
      .query(`
        INSERT INTO Account (Email, Password, VerificationToken, TokenExpiration) 
        VALUES (@Email, @Password, @VerificationToken, @TokenExpiration)
      `);

    // Lấy AccountID mới tạo
    const newAccount = await pool.request()
      .query(`SELECT TOP 1 AccountID FROM Account ORDER BY AccountID DESC`);
    const accountId = newAccount.recordset[0].AccountID;

    // Lưu thông tin vào bảng UserProfile
    await pool.request()
      .input('HoTen', sql.NVarChar, fullname)
      .input('AccountID', sql.Int, accountId)
      .query(`INSERT INTO UserProfile (HoTen, AccountID) VALUES (@HoTen, @AccountID)`);

    // Gửi email xác nhận
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Xác nhận đăng ký',
      text: `Cảm ơn bạn đã đăng ký! Vui lòng xác thực tài khoản của bạn bằng cách nhấp vào liên kết sau: 
              http://localhost:3000/verify?token=${verificationToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Lỗi khi gửi email xác nhận.' });
      }
      res.status(200).json({ message: 'Đăng ký thành công! Kiểm tra email để xác nhận.' });
    });
  } catch (err) {
    console.error('Error in register:', err);
    res.status(500).json({ message: 'Lỗi máy chủ, vui lòng thử lại sau.' });
  }
});

// Hàm sinh mã xác thực
function generateVerificationToken() {
  return Math.random().toString(36).substring(2, 15);
}

// Endpoint xác thực tài khoản
app.get('/verify', async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send('Mã xác thực không hợp lệ.');
  }

  try {
    const pool = await sql.connect(config);
    
    // Kiểm tra xem token có tồn tại và chưa hết hạn
    const result = await pool.request()
      .input('Token', sql.NVarChar, token)
      .query(`
        SELECT * FROM Account 
        WHERE VerificationToken = @Token 
          AND TokenExpiration > GETDATE()
      `);
    
    const account = result.recordset[0];

    if (!account) {
      return res.status(400).send('Mã xác thực không hợp lệ hoặc đã hết hạn.');
    }

    // Cập nhật cột IsVerified thành 1
    await pool.request()
      .input('AccountID', sql.Int, account.AccountID)
      .query(`
        UPDATE Account 
        SET IsVerified = 1, VerificationToken = NULL, TokenExpiration = NULL 
        WHERE AccountID = @AccountID
      `);

    res.status(200).send('Tài khoản đã được xác thực thành công. Bạn có thể đăng nhập.');
  } catch (error) {
    console.error('Lỗi khi xác thực tài khoản:', error);
    res.status(500).send('Có lỗi xảy ra, vui lòng thử lại sau.');
  }
});

// Đăng nhập
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email và mật khẩu là bắt buộc!');
  }

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('Email', sql.NVarChar, email)
      .query('SELECT * FROM Account WHERE Email = @Email');

    const account = result.recordset[0];

    if (!account) {
      return res.status(400).send('Email không tồn tại.');
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, account.Password);
    if (!isMatch) {
      return res.status(400).send('Mật khẩu không chính xác.');
    }

    // Đăng nhập thành công
    res.status(200).send('Đăng nhập thành công!');
  } catch (error) {
    console.error('Lỗi khi đăng nhập: ', error);
    res.status(500).send('Có lỗi xảy ra, vui lòng thử lại sau!');
  }
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});