require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const app = express();

// Set CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Allow all origins (use cautiously)
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true, 
};

// Apply CORS middleware with the options
app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  

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
  const { email, password, hoTen } = req.body; 
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationCode();
    const tokenExpiration = new Date(Date.now() + 5 * 60 * 1000); // Expires in 5 minutes

    // Insert the account data into SQL Server
    let request = new sql.Request();
    const accountResult = await request
      .input('Email', sql.NVarChar, email)
      .input('Password', sql.VarBinary, Buffer.from(hashedPassword))
      .input('VerificationToken', sql.NVarChar, verificationToken)
      .input('TokenExpiration', sql.DateTime, tokenExpiration)
      .query(`INSERT INTO Account (Email, Password, VerificationToken, TokenExpiration, CreatedAt)
              VALUES (@Email, @Password, @VerificationToken, @TokenExpiration, GETDATE());
              SELECT SCOPE_IDENTITY() AS AccountID;`);
    const accountId = accountResult.recordset[0].AccountID;

    // Insert the default role 'Người Tìm Việc' into AccountRole
    request = new sql.Request(); // Create a new request for each query
    await request
      .input('AccountID', sql.Int, accountId)
      .input('RoleID', sql.Int, 1) // 'Người Tìm Việc'
      .query(`INSERT INTO AccountRole (AccountID, RoleID, CreatedAt) VALUES (@AccountID, @RoleID, GETDATE())`);

    // Insert the full name (HoTen) into UserProfile
    request = new sql.Request(); // Create another new request
    await request
      .input('AccountID', sql.Int, accountId)
      .input('HoTen', sql.NVarChar, hoTen)
      .query(`INSERT INTO UserProfile (AccountID, HoTen, CreatedAt) VALUES (@AccountID, @HoTen, GETDATE())`);

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
    const jwtSecret = process.env.JWT_SECRET || 'your_default_jwt_secret';
    const token = jwt.sign({ userID: result.recordset[0].AccountID, email: email }, jwtSecret, { expiresIn: '1h' });

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

    // Ensure both tokens are strings and trim any whitespace
    if (String(VerificationToken).trim() !== String(verificationToken).trim()) {
      return res.status(400).json({ message: 'Mã xác thực không chính xác.' });
    }

    if (new Date() > TokenExpiration) {
      return res.status(400).json({ message: 'Mã xác thực đã hết hạn.' });
    }

    await request.query(`UPDATE Account SET IsVerified = 1, VerificationToken = NULL, TokenExpiration = NULL WHERE Email = '${email}'`);
    res.json({ message: 'Xác thực tài khoản thành công.' });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ message: 'Lỗi khi xác thực tài khoản.' });
  }
});

// Additional endpoints for UserProfile, AccountRole, etc., would follow similar adjustments


// Cấu hình lưu trữ cho Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = './uploads/';

    // Kiểm tra nếu thư mục chưa tồn tại thì tạo nó
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // Lưu trữ tệp trong thư mục uploads
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Đổi tên tệp khi lưu (bảo đảm không trùng tên)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Cấu hình Multer với giới hạn kích thước tệp
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // Giới hạn kích thước tệp là 10MB
});

// Cấu hình middleware cho phép gửi dữ liệu từ frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API tải lên CV mà không yêu cầu xác thực
app.post('/uploadCV', upload.single('cvFile'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("Không có tệp được gửi lên.");
    }
    
    const cvFilePath = req.file.path;
    const { TieuDe } = req.body;
    
    if (!cvFilePath) {
      return res.status(400).json({ message: 'Vui lòng chọn tệp CV để tải lên.' });
    }
    
    if (!TieuDe) {
      return res.status(400).json({ message: 'Vui lòng cung cấp tiêu đề cho CV.' });
    }

    const pool = await sql.connect(config);

    await pool.request()
      .input('FilePathAttribute', sql.NVarChar(sql.MAX), cvFilePath)
      .input('TieuDe', sql.NVarChar(255), TieuDe)
      .query(`
        INSERT INTO CV (FilePathAttribute, TieuDe, CreatedAt, UpdatedAt)
        VALUES (@FilePathAttribute, @TieuDe, GETDATE(), GETDATE());
      `);

    res.status(200).json({ message: 'CV đã được tải lên thành công.' });
  } catch (error) {
    console.error('Lỗi khi tải lên CV:', error);  // Ghi lại chi tiết lỗi
    res.status(500).json({ message: 'Lỗi khi tải lên CV. Vui lòng thử lại sau.', error: error.message });
  }
});


// API lấy danh sách CV đã tải lên
app.get('/api/getCVs', async (req, res) => {
  try {
    const pool = await sql.connect(config);  // config là thông tin kết nối cơ sở dữ liệu
    const result = await pool.request()
      .query('SELECT CV_ID, TieuDe, FilePathAttribute, CreatedAt, UpdatedAt FROM CV ORDER BY CreatedAt DESC');
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Không có CV nào trong hệ thống.' });
    }
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách CV:', error);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách CV. Vui lòng thử lại sau.' });
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

// API lấy danh sách tin tuyển dụng
app.get('/api/jobs', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
      SELECT * FROM TinTuyenDung;
      SELECT 
        TTD.TieuDe, 
        TTD.MucLuong, 
        TTD.DiaDiem, 
        CTTTD.HinhURL, 
        CT.TenCongTy
      FROM TinTuyenDung TTD
      LEFT JOIN ThongTinTinTuyenDung CTTTD ON TTD.CTTTD_ID = CTTTD.CTTTD_ID
      LEFT JOIN CongTy CT ON TTD.UserID = CT.CT_ID
      WHERE TTD.TrangThai = 'Đã Duyệt';
    `);

    if (result.recordsets[0].length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy công việc nào.' });
    }

    const jobListings = result.recordsets[0]; 
    const jobDetails = result.recordsets[1];  
    
    // Trả về dữ liệu dưới dạng JSON
    res.json({ jobListings, jobDetails });

  } catch (err) {
    console.error("Lỗi khi lấy danh sách công việc: ", err);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách công việc', error: err.message });
  }
});

// API để lấy danh sách địa điểm từ bảng TinTuyenDung
app.get('/api/regions', (req, res) => {
  const query = 'SELECT DISTINCT DiaDiem FROM TinTuyenDung'; // Lấy các địa điểm duy nhất từ bảng TinTuyenDung
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Lỗi khi truy vấn dữ liệu' });
    }
    // Trả về danh sách địa điểm cho frontend
    const regions = results.map(row => row.DiaDiem); // Dùng 'DiaDiem' thay vì 'region'
    res.json(regions);
  });
});

// Endpoint lấy danh sách hình ảnh từ bảng CongTy
app.get('/api/company-images', (req, res) => {
  const query = 'SELECT HinhURL FROM CongTy';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching images:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json({ images: results.map(row => row.HinhURL) }); // Trả về danh sách URL hình ảnh
  });
});

// API lấy chi tiết công việc từ database
app.get('/api/job-details/:jobId', async (req, res) => {
  const jobId = parseInt(req.params.jobId, 10);

  if (isNaN(jobId)) {
    return res.status(400).json({ message: 'Invalid job ID' });
  }

  const query = `
    SELECT 
      t.TieuDe, 
      t.MucLuong, 
      t.DiaDiem, 
      t.KinhNghiem, 
      t.HanNopHoSo,  
      t.ViTriUngTuyen, 
      t.CreatedAt,
      c.TenCongTy, 
      c.QuyMo, 
      c.LinhVuc, 
      c.DiaChiCT, 
      tt.CapBac, 
      tt.SoLuongTuyen, 
      tt.HinhThucLamViec, 
      tt.GioiTinh, 
      tt.MoTa, 
      tt.YeuCauUngVien, 
      tt.QuyenLoi, 
      tt.CachThucUngTuyen 
    FROM 
      TinTuyenDung t
    JOIN 
      CongTy c ON t.CTTTD_ID = c.CT_ID 
    JOIN 
      ThongTinTinTuyenDung tt ON t.CTTTD_ID = tt.CTTTD_ID
    WHERE 
      t.TTD_ID = @jobId;
  `;

  try {
    // Kết nối với cơ sở dữ liệu
    await sql.connect(config);

    // Khai báo tham số đầu vào cho query
    const request = new sql.Request();
    request.input('jobId', sql.Int, jobId); // Khai báo tham số jobId và kiểu dữ liệu

    // Thực hiện truy vấn SQL
    const result = await request.query(query);

    // Kiểm tra nếu không có dữ liệu nào
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Trả về dữ liệu tìm thấy
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  } finally {
    // Đảm bảo kết nối được đóng
    await sql.close();
  }
});

// API lấy chi tiết công việc yêu thích từ database
app.get('/api/favorite-job-details/:jobId', async (req, res) => {
  const jobId = parseInt(req.params.jobId, 10);

  if (isNaN(jobId)) {
    return res.status(400).json({ message: 'Invalid job ID' });
  }

  const query = `
    SELECT 
      t.TieuDe, 
      t.MucLuong, 
      t.DiaDiem, 
      t.KinhNghiem, 
      t.HanNopHoSo,  
      t.ViTriUngTuyen, 
      t.CreatedAt,
      c.TenCongTy, 
      c.QuyMo, 
      c.LinhVuc, 
      c.DiaChiCT, 
      tt.CapBac, 
      tt.SoLuongTuyen, 
      tt.HinhThucLamViec, 
      tt.GioiTinh, 
      tt.MoTa, 
      tt.YeuCauUngVien, 
      tt.QuyenLoi, 
      tt.CachThucUngTuyen, 
      IFNULL(f.UserID, 'none') AS IsFavorite  -- Kiểm tra nếu công việc này đã được yêu thích
    FROM 
      TinTuyenDung t
    JOIN 
      CongTy c ON t.CTTTD_ID = c.CT_ID 
    JOIN 
      ThongTinTinTuyenDung tt ON t.CTTTD_ID = tt.CTTTD_ID
    LEFT JOIN
      YeuThich f ON t.TTD_ID = f.JobID AND f.UserID = @userId  -- Kiểm tra công việc yêu thích của người dùng
    WHERE 
      t.TTD_ID = @jobId;
  `;

  try {
    const userId = req.userId; // Giả sử bạn lấy được userId từ session hoặc JWT

    if (!userId) {
      return res.status(403).json({ message: 'User not authenticated' });
    }

    // Kết nối với cơ sở dữ liệu
    await sql.connect(config);

    // Khai báo tham số đầu vào cho query
    const request = new sql.Request();
    request.input('jobId', sql.Int, jobId); // Khai báo tham số jobId
    request.input('userId', sql.Int, userId); // Khai báo tham số userId (người dùng yêu thích công việc)

    // Thực hiện truy vấn SQL
    const result = await request.query(query);

    // Kiểm tra nếu không có dữ liệu nào
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Trả về dữ liệu tìm thấy
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  } finally {
    // Đảm bảo kết nối được đóng
    await sql.close();
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});