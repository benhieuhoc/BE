const Notification = require('../models/notification');
const User = require('../models/user');


class NotificationController {

    // GET /notification/get_all
    getall(req,res,next){
        const _id = req.query._id
        try{
            Notification.find({user_id: _id})
            .populate('project_id user_id sender_id')
            .then((notification) => {
                if(!notification){
                    return res.status(404).json({message: "Không tìm thấy thông báo!"});
                }
                res.status(200).json({message: "Đã tìm thấy toàn bộ", data: notification});
            })
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }

    // POST /notification/send_invite
    async sendInvite(req, res, next) {
        const { user_id, sender_id, project_id, content } = req.body;  
        console.log("req", req.body);
        const type= "invite"
        const status = "pending"
        try{
            User.findById(user_id)
            .then((user) => {
                if(!user){
                    return res.status(404).json({ message: "Người dùng không tồn tại!" });
                }
            })
            let createNotification = await Notification.create({user_id, sender_id, project_id, content, type, status});
            if(createNotification){
                res.status(200).json({
                    message: "Gửi lời mời thành công",
                    data: createNotification
                })
            }else{
                res.status(404).json({message: "Gửi lời mời thất bại"})
            }
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Lỗi máy chủ' }); 
        }
    }

    // POST /notification/respond_invite
    async respondInvite(req, res, next) {
        const { user_id, sender_id, project_id, content } = req.body; 
        console.log("req", req.body);
        const type= "reminder"

        try{
            User.findById(user_id)
            .then((user) => {
                if(!user){
                    return res.status(404).json({ message: "Người dùng không tồn tại!" });
                }
            })
            let createNotification = await Notification.create({user_id, sender_id, project_id, content, type});
            if(createNotification){
                res.status(200).json({
                    message: "Gửi lời mời thành công",
                    data: createNotification
                })
            }else{
                res.status(404).json({message: "Gửi lời mời thất bại"})
            }
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Lỗi máy chủ' }); 
        }
    }

    // PUT /notification/chance_status
    chanceStatus(req,res,next){
        const {notification_id, response} = req.body;
        if (!['accepted', 'rejected'].includes(response)) {
            return res.status(400).json({ message: "Response phải là 'accepted' hoặc 'rejected'" });
        }
        const status = response;
        try{
            Notification.findOneAndUpdate({_id: notification_id}, { status: response },)
            .then((notification) => {
                if(!notification){
                    return res.status(404).json({message: "Cập nhật thất bại, do thông báo này không tồn tại!"});
                }
                else{
                    return res.status(200).json({message: "Cập nhật thành công", data: notification});
                }
            })
        }catch(error){
            console.error(error);
            res.status(500).json({message: "Lỗi máy chủ!"});
        }
    }

    // PUT /notification/chance_read
    chanceRead(req,res,next){
        const {notification_id} = req.body;
        const read = true;
        try{
            Notification.findOneAndUpdate({_id: notification_id}, { read: read },)
            .then((notification) => {
                if(!notification){
                    return res.status(404).json({message: "Cập nhật thất bại, do thông báo này không tồn tại!"});
                }
                else{
                    return res.status(200).json({message: "Cập nhật thành công", data: notification});
                }
            })
        }catch(error){
            console.error(error);
            res.status(500).json({message: "Lỗi máy chủ!"});
        }
    }

}

module.exports = new NotificationController;
