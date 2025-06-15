const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Kết nối thành công với MongoDB Atlas'))
  .catch(err => console.error('Lỗi kết nối MongoDB Atlas:', err));

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  image: String
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  status: String
});

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const memberSchema = new mongoose.Schema({
  name: String,
  position: String
});

const Project = mongoose.model('Project', projectSchema);
const User = mongoose.model('User', userSchema);
const Contact = mongoose.model('Contact', contactSchema);
const Member = mongoose.model('Member', memberSchema);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Truy cập bị từ chối' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token không hợp lệ' });
  }
};

// Khởi tạo tài khoản admin mặc định
User.findOne({ email: 'admin@flashtech1.vn' }).then(user => {
  if (!user) {
    bcrypt.hash('admin123', 10).then(hashedPassword => {
      User.create({
        name: 'Tung Lê Bá',
        email: 'admin@flashtech1.vn',
        password: hashedPassword,
        role: 'super_admin',
        status: 'active'
      }).then(() => console.log('Tài khoản admin mặc định được tạo'));
    });
  }
});

// Endpoint đăng nhập
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }
    const token = jwt.sign({ id: user._id, email: user.email, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// Endpoint lấy thông tin người dùng
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// Endpoint lấy danh sách dự án
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().select('_id title description technologies image');
    res.json(projects.map(p => ({ id: p._id, title: p.title, description: p.description, technologies: p.technologies, image: p.image })));
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// Các endpoint khác có thể được thêm tương tự (POST, PUT, DELETE cho projects, users, members, contact)

app.listen(3000, () => console.log('Server running on port 3000'));