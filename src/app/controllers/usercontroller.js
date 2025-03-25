const User = require ('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

class UserController {

    // POST user/login
    login(req,res,next){
        const {email, password} = req.body;
        try{
            User.findOne({email: email})
            .then(async(user) => {
                if(!user){
                    return res.status(401).json({massage:"Email không tồn tại"});
                }
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(password, saltRounds);

                // console.log("admin.password: ",user.password);
                // console.log("password: ",password);
                // console.log("hashedPassword: ",hashedPassword);
                console.log('JWT_SECRET:', JWT_SECRET);
                console.log('EXPIRESIN:', process.env.EXPIRESIN);
                
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(401).json({ message: 'Mật khẩu không chính xác' });
                    // console.log("Không khớp mật khẩu")
                }

                 // Tạo token JWT
                 const token = jwt.sign(
                    { userId: user._id, email: user.email },
                    JWT_SECRET,
                    { expiresIn: process.env.EXPIRESIN } // Thời gian hết hạn của token
                );
                console.log("token:",token);
                
                res.cookie('token', token, {
                    httpOnly: true, // Bảo mật hơn khi chỉ có server mới có thể truy cập cookie này
                    secure: process.env.NODE_ENV === 'production', // Chỉ cho phép cookie qua HTTPS nếu là production
                    maxAge: parseInt(process.env.MAXAGE), // 1 giờ
                });

                res.json({message:"Đăng nhập thành công!", data: user, access_token: token});
            })
        }catch(error){
            console.error(error);
            res.status(500).json({message:"Lỗi máy chủ"});
        }
    };

    // POST user/singin
    async singin(req,res,next){
        console.log("req.body: ",req.body);
        const {email, password, name, phone} = req.body;
        try{
            console.log("Kiểm tra email tồn tại!");
            User.findOne({email: email})
            .then((user) => {
                if(user){
                    return res.status(400).json({ 
                        success: false, 
                        message: 'Tài Khoản Đã Tồn Tại! Vui Lòng Chọn Email Khác!' 
                    });
                }
            });
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("hashedPassword: ",hashedPassword);
            const FormData = new User({
                email: email,
                password: hashedPassword,
                name: name,
                phone: phone,
            });
            console.log("FormData: ",FormData);
            FormData.save({})
            .then((user) => {
                return res.status(201).json({ 
                    success: true, 
                    message: 'Đăng ký tài khoản thành công', 
                    data: user
                })
            })
            .catch(next);
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Lỗi máy chủ'})
        }
    }

    // POST user/logout
    logout(req,res,next){
        try{
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Bảo đảm chỉ xóa cookie qua HTTPS nếu là production
            });

            res.status(200).json({ message: 'Đăng xuất thành công' });
        }catch (error){
            console.error(error);
            res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    };
}

module.exports = new UserController
