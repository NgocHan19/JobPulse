require('dotenv').config(); // Load các biến môi trường từ file .env
const express = require('express');
const sql = require('mssql');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Cấu hình SQL Server
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

// Kết nối đến SQL Server
sql.connect(config)
  .then(() => console.log('Đã kết nối với cơ sở dữ liệu'))
  .catch(err => console.error('Lỗi kết nối cơ sở dữ liệu:', err));

// Cấu hình Nodemailer để gửi email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Hàm tạo mã xác thực ngẫu nhiên
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


// Gửi email xác thực
 async function sendVerificationEmail(email, verificationToken) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Xác thực tài khoản',
    text: `Mã xác thực của bạn là: ${verificationToken}. Mã này sẽ hết hạn trong 5 phút.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true; // Trả về true nếu gửi thành công
  } catch (error) {
    console.error('Lỗi gửi email:', error);
    return false; // Trả về false nếu gửi không thành công
  }
}
// Endpoint đăng ký
app.post('/register', async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    const pool = await sql.connect(config);
    const existingUser = await pool.request()
      .input('Email', sql.NVarChar, email)
      .query(`SELECT * FROM Account WHERE Email = @Email`);

    if (existingUser.recordset.length > 0) {
      return res.status(400).json({ message: 'Email đã được sử dụng.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.request()
      .input('Email', sql.NVarChar, email)
      .input('Password', sql.VarBinary, Buffer.from(hashedPassword, 'utf-8'))
      .input('IsVerified', sql.Bit, 1) // Đặt trạng thái IsVerified thành 1
      .query(`INSERT INTO Account (Email, Password, IsVerified) VALUES (@Email, @Password, @IsVerified)`);

    res.status(200).json({ message: 'Đăng ký thành công! Bạn có thể đăng nhập ngay.' });
  } catch (err) {
    console.error('Error in register:', err);
    res.status(500).json({ message: 'Lỗi máy chủ, vui lòng thử lại sau.' });
  }
});

// Endpoint đăng nhập
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Kết nối đến cơ sở dữ liệu
      let pool = await sql.connect(dbConfig);

      // Kiểm tra xem tài khoản có tồn tại không
      const result = await pool.request()
          .input('email', sql.VarChar, email)
          .query(`
              SELECT AccountID, Password, IsVerified
              FROM Account
              WHERE Email = @email
          `);

      if (result.recordset.length === 0) {
          return res.status(404).json({ message: "Tài khoản không tồn tại." });
      }

      const user = result.recordset[0];

      // Kiểm tra tài khoản đã xác thực chưa
      if (!user.IsVerified) {
          return res.status(401).json({ message: "Tài khoản chưa được xác thực." });
      }

      // So sánh mật khẩu
      const isPasswordValid = await bcrypt.compare(password, user.Password);
      if (!isPasswordValid) {
          return res.status(401).json({ message: "Mật khẩu không đúng." });
      }

      // Trả về thông tin thành công
      res.json({ message: "Đăng nhập thành công." });

  } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      res.status(500).json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau." });
  }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});
