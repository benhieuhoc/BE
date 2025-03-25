const Prj_u = require('../models/project_user');
const Project = require('../models/project');

class ProjectController {

    // GET /project/get_all
    getall(req,res,next){
        try{
            Project.find({})
            .then((project) => {
                if(!project){
                    return res.status(404).json({message: "Không tìm thấy dự án!"});
                }
                res.status(200).json({message: "Đã tìm thấy toàn bộ", data: project});
            })
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }

    // GET /projetc/get_my_project
    getmy(req,res,next){
        const id = req.body;
        try{
            let Projectlist;
            Prj_u.find({user_id: id})
            .then((prj_u) => {
                if(!prj_u){
                    return res.status(404).json({message: "Không tìm thấy dự án!"})
                }
                const listId = prj_u.map(x => x.project_id);
                Project.find({ _id: { $in: listId }})
                .then((project) => {
                    Projectlist = project.map(prj => ({
                        id: prj._id,
                        nameproject: prj.nameproject,
                        author: prj.author,
                        description: prj.description,
                    }))
                })
            });
            res.status(200).json({message:"Đã tìm thấy toàn bộ", data: Projectlist});
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }

    // GET /project/get_by_autho
    getbyauthor(req,res,next){
        const id = req.body;
        try{
            Project.find({author: id})
            .then((project) => {
                if(!project){
                    return res.status(404).json({message: "Không tìm thấy dự án!"});
                }
                res.status(200).json({message: "Đã tìm thấy dự án", data: project})
            })
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }

    // POST /project/create
    async create(req,res,next){
        const {nameproject, author_id, description} = req.body;
        console.log(req.body);
        try{
            if(!nameproject || !author_id){
                res.status(400).json({message: "Vui lòng cập nhật đầy đủ thông tin!"});
            }
            let createProject = await Project.create({nameproject, author_id, description})

            if(createProject){
                res.status(200).json({
                    message: "Thêm dự án thành công",
                    data: createProject
                })
            }else{
                res.status(404).json({message: "Thêm dự án thất bại"})
            }
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Lỗi máy chủ' }); 
        }
    }

    // PUT /project/update
    update(req,res,next){
        try{
            Project.findOneAndUpdate({_id: req.body.id}, req.body)
            .then((project) => {
                if(!project){
                    return res.status(404).json({message: "Không tìm thấy dự án!"});
                }
                else{
                    return res.status(200).json({message: "Cập nhật thành công", project});
                }
            })
        }catch(error){
            console.error(error);
            res.status(500).json({message: "Lỗi máy chủ!"});
        }
    }

    // DELETE /project/delete/:id
    delete(req,res,next){
        const id = req.params.id;
        try{
            Project.deleteOne({_id: id})
            .then((project) => {
                if(!project){
                    res.status(404).json({message: "Không tìm thấy dự án, xóa thát bại!"});
                }
                else{
                    res.status(200).json({message: "Xóa dự án thành công"});
                }
            })
        }catch(error){
            console.error(error);
            res.status(500).json({message: "Lỗi máy chủ!"});
        }
    }
}

module.exports = new ProjectController;
