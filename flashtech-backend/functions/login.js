const mongoose = require('mongoose');
   const bcrypt = require('bcryptjs');
   const jwt = require('jsonwebtoken');

   let conn = null;
   const uri = process.env.MONGODB_URI;

   const connectToDatabase = async () => {
     if (conn == null) {
       conn = await mongoose.connect(uri, {
         useNewUrlParser: true,
         useUnifiedTopology: true
       });
       console.log('Kết nối thành công với MongoDB Atlas');
     }
     return conn;
   };

   const userSchema = new mongoose.Schema({
     name: String,
     email: { type: String, unique: true },
     password: String,
     role: String,
     status: String
   });
   const User = mongoose.model('User', userSchema);

   const initializeAdminUser = async () => {
     const adminEmail = 'admin@flashtech1.vn';
     const adminExists = await User.findOne({ email: adminEmail });
     if (!adminExists) {
       const hashedPassword = await bcrypt.hash('admin123', 10);
       await User.create({
         name: 'Tung Lê Bá',
         email: adminEmail,
         password: hashedPassword,
         role: 'super_admin',
         status: 'active'
       });
       console.log('Tài khoản admin mặc định được tạo');
     }
   };

   exports.handler = async (event, context) => {
     context.callbackWaitsForEmptyEventLoop = false;
     await connectToDatabase();
     await initializeAdminUser();

     const headers = {
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
       'Access-Control-Allow-Methods': 'POST, OPTIONS'
     };

     if (event.httpMethod === 'OPTIONS') {
       return { statusCode: 200, headers, body: '' };
     }

     if (event.httpMethod !== 'POST') {
       return {
         statusCode: 405,
         headers,
         body: JSON.stringify({ message: 'Phương thức không được phép' })
       };
     }

     try {
       const { email, password } = JSON.parse(event.body);
       const user = await User.findOne({ email });
       if (!user) {
         return {
           statusCode: 401,
           headers,
           body: JSON.stringify({ message: 'Email hoặc mật khẩu không đúng' })
         };
       }
       const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) {
         return {
           statusCode: 401,
           headers,
           body: JSON.stringify({ message: 'Email hoặc mật khẩu không đúng' })
         };
       }
       const token = jwt.sign(
         { id: user._id, email: user.email, name: user.name, role: user.role },
         process.env.JWT_SECRET,
         { expiresIn: '1h' }
       );
       return {
         statusCode: 200,
         headers,
         body: JSON.stringify({ token })
       };
     } catch (error) {
       console.error('Lỗi đăng nhập:', error);
       return {
         statusCode: 500,
         headers,
         body: JSON.stringify({ message: 'Lỗi server' })
       };
     }
   };