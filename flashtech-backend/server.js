const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
require('dotenv').config();

mongoose.connect('mongodb://localhost/flashtech', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  image: String
})

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  status: String
})

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
})

const memberSchema = new mongoose.Schema({
  name: String,
  position: String
})

const Project = mongoose.model('Project', projectSchema)
const User = mongoose.model('User', userSchema)
const Contact = mongoose.model('Contact', contactSchema)
const Member = mongoose.model('Member', memberSchema)

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Access denied' })
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret')
    req.user = decoded
    next()
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' })
  }
}

// Initialize admin user and clean up old data
User.findOne({ email: 'admin@flashtech1.vn' }).then(user => {
  if (!user) {
    bcrypt.hash('admin123', 10).then(hashedPassword => {
      User.create({
        name: 'Tung Lê Bá',
        email: 'admin@flashtech1.vn',
        password: hashedPassword,
        role: 'super_admin',
        status: 'active'
      }).then(() => console.log('Default admin user created'))
    })
  }
})

// Clean up old/unwanted users
User.deleteMany({ 
  $or: [
    { name: 'Nguyễn văn admin' },
    { email: { $regex: /nguyen.*admin/i } }
  ]
}).then(() => console.log('Cleaned up old admin users'))

// Initialize default members
Member.find().then(members => {
  if (members.length === 0) {
    Member.insertMany([
      { name: 'Lê Bá Tùng', position: 'Lập trình viên Frontend' },
      { name: 'Trần Gia Bảo', position: 'Lập trình viên Backend' },
      { name: 'Nguyễn Hoàng Anh Huy', position: 'Thiết kế UI/UX' }
    ]).then(() => console.log('Default members created'))
  }
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    const token = jwt.sign({ id: user._id, email: user.email, name: user.name, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' })
    res.json({ token })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().select('_id title description technologies image')
    res.json(projects.map(p => ({ id: p._id, title: p.title, description: p.description, technologies: p.technologies, image: p.image })))
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.post('/api/projects', authenticateToken, async (req, res) => {
  try {
    const project = await Project.create(req.body)
    res.status(201).json(project)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.put('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(project)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.post('/api/projects/reset-demo', authenticateToken, async (req, res) => {
  try {
    await Project.deleteMany({})
    await Project.insertMany([
      {
        title: 'E-commerce Platform',
        description: 'Nền tảng thương mại điện tử hoàn chỉnh với tính năng thanh toán, quản lý kho và phân tích dữ liệu.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        image: '/placeholder.svg?height=300&width=400'
      },
      {
        title: 'Mobile Banking App',
        description: 'Ứng dụng ngân hàng di động với bảo mật cao, hỗ trợ chuyển tiền và quản lý tài chính cá nhân.',
        technologies: ['React Native', 'Firebase', 'Node.js'],
        image: '/placeholder.svg?height=300&width=400'
      },
      {
        title: 'Healthcare Management System',
        description: 'Hệ thống quản lý bệnh viện tích hợp đầy đủ từ đặt lịch khám đến quản lý hồ sơ bệnh án.',
        technologies: ['Vue.js', 'Python', 'PostgreSQL'],
        image: '/placeholder.svg?height=300&width=400'
      }
    ])
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    const users = await User.find().select('-password')
    // Map _id to id for frontend consistency
    const usersWithId = users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    }))
    res.json(usersWithId)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

app.post('/api/users', authenticateToken, async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body
    
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' })
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashedPassword, role, status })
    
    // Return user without password and with proper id mapping
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    }
    
    res.status(201).json(userResponse)
  } catch (error) {
    console.error('Error creating user:', error)
    if (error.code === 11000) {
      return res.status(400).json({ message: 'User with this email already exists' })
    }
    res.status(500).json({ message: 'Server error' })
  }
})

app.put('/api/users/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' })
    }
    
    const { name, email, role, status } = req.body
    const updateData = { name, email, role, status }
    
    // Only hash password if it's provided
    if (req.body.password && req.body.password.trim() !== '') {
      updateData.password = await bcrypt.hash(req.body.password, 10)
    }
    
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password')
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    
    // Return with proper id mapping
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    }
    
    res.json(userResponse)
  } catch (error) {
    console.error('Error updating user:', error)
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' })
    }
    res.status(500).json({ message: 'Server error' })
  }
})

app.delete('/api/users/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' })
    }
    
    const result = await User.findByIdAndDelete(userId)
    if (!result) {
      return res.status(404).json({ message: 'User not found' })
    }
    
    res.status(204).send()
  } catch (error) {
    console.error('Error deleting user:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

app.post('/api/contact', async (req, res) => {
  try {
    await Contact.create(req.body)
    res.status(201).json({ message: 'Contact form submitted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.get('/api/members', async (req, res) => {
  try {
    const members = await Member.find().select('_id name position')
    res.json(members.map(m => ({ id: m._id, name: m.name, position: m.position })))
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.post('/api/members', authenticateToken, async (req, res) => {
  try {
    const member = await Member.create(req.body)
    res.status(201).json(member)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.put('/api/members/:id', authenticateToken, async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(member)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.delete('/api/members/:id', authenticateToken, async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.listen(3000, () => console.log('Server running on port 3000'))