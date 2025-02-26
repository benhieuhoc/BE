const Prj_u = require('../models/project_user');
const Project = require('../models/project');
const project = require('../models/project');

class ProjectController {

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
    getbyauthor(req,res,nexxt){
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

}

module.exports = new ProjectController;
