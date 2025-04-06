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

    // GET /project/get_by_id
    getbyid(req,res,next){
        const id = req.query.id;
        console.log('/project/get_by_id: ',req.query);
        try{
            Project.findById(id)
            .populate('author_id member_id category_id')
            .populate('task_id')
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
    
    // GET /project/get_by_author
    getbyauthor(req,res,next){
        const id = req.query.id;
        const date = req.query.date;
        // console.log('req project', req.query)
        try {
            let filter = {
                author_id: id
            };
            if (date) {
                filter.dateEnd = { $gt: new Date(date) };
            }

            Project.find(filter)
                .then((projects) => {
                    if (!projects || projects.length === 0) {
                        return res.status(404).json({ message: "Không tìm thấy dự án!", data: null });
                    }
                    res.status(200).json({ message: "Đã tìm thấy dự án", data: projects });
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ message: "Lỗi máy chủ" });
                });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Lỗi máy chủ" });
        }
    }

    // GET /project/get_by_category
    getbycategory(req, res, next) {
        console.log('req: ',req.query);
        const idcategory = req.query.categoryId;
        const iduser = req.query.userId;

        try {
            let filter = {
                category_id: idcategory
            };
            if (iduser) {
                filter.$or = [
                    { author_id: iduser },
                    { member_id: iduser }
                ];
            }

            Project.find(filter)
                .populate('author_id member_id category_id')
                .populate('task_id')
                .then((projects) => {
                    if (!projects || projects.length === 0) {
                        return res.status(404).json({ message: "Không tìm thấy dự án!" });
                    }
                    res.status(200).json({ message: "Đã tìm thấy dự án", data: projects });
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ message: "Lỗi máy chủ" });
                });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Lỗi máy chủ" });
        }
    }


    // POST /project/create
    async create(req,res,next){
        const {author_id, nameproject, description, category_id, endDate} = req.body;
        console.log(req.body);
        const dateEnd = endDate;
        try{
            if(!nameproject || !author_id){
                res.status(400).json({message: "Vui lòng cập nhật đầy đủ thông tin!"});
            }
            let createProject = await Project.create({author_id, nameproject, description, category_id, dateEnd})

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
        console.log(req.body);
        try{
            Project.findOneAndUpdate({_id: req.body._id}, req.body)
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

    // POST /project/add_member
    addUser(req,res,next){
        const { Project_id, user_id } = req.body;
        console.log('project_id: ', Project_id, 'user_id: ', user_id);
        try {
            Project.findById(Project_id)
            .then(async(project) => {
                if (!project) {
                    return res.status(404).json({ message: 'Không tìm thấy dự án!' });
                }
                const alreadyAdded = project.member_id.includes(user_id);
                if (alreadyAdded) {
                    return res.status(400).json({ message: 'Người dùng đã là thành viên của dự án' });
                }
                project.member_id.push(user_id);
                await project.save();
    
                return res.status(200).json({ message: 'Đã thêm thành viên vào dự án thành công', data: project });
            })
        } catch (error) {
            console.error('Lỗi khi thêm thành viên:', error);
            return res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }

    // POST /project/add_task
    addTask(req,res,next){
        const { Project_id, task_id } = req.body;
        console.log('project_id: ', Project_id, 'task_id: ', task_id);
        try {
            Project.findById(Project_id)
            .then(async(project) => {
                if (!project) {
                    return res.status(404).json({ message: 'Không tìm thấy dự án!' });
                }
                const alreadyAdded = project.task_id.includes(task_id);
                if (alreadyAdded) {
                    return res.status(400).json({ message: 'Nhiệm vụ đã được thêm vào dự án' });
                }
                project.task_id.push(task_id);
                await project.save();
    
                return res.status(200).json({ message: 'Đã thêm nhiệm vụ vào dự án thành công', data: project });
            })
        } catch (error) {
            console.error('Lỗi khi thêm nhiệm vụ:', error);
            return res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }

    // DELETE /project/delete/:id
    delete(req,res,next){
        const id = req.params.id;
        console.log("_id: ", req.params.id);
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

    // DELETE /project/remove_member/:Project_id/:user_id
    removeUser(req, res, next) {
        const { Project_id, user_id } = req.params;
        console.log('Project_id: ', Project_id, 'user_id: ', user_id);
        try {
            Project.findById(Project_id)
                .then(async (project) => {
                    if (!project) {
                        return res.status(404).json({ message: 'Không tìm thấy dự án!' });
                    }
                    const userIndex = project.member_id.indexOf(user_id);
                    if (userIndex === -1) {
                        return res.status(400).json({ message: 'Người dùng không phải là thành viên của dự án' });
                    }
                    project.member_id.splice(userIndex, 1);
                    await project.save();

                    return res.status(200).json({ message: 'Đã xóa thành viên khỏi dự án thành công', data: project });
                })
                .catch((error) => {
                    console.error('Lỗi khi tìm dự án:', error);
                    return res.status(500).json({ message: 'Lỗi máy chủ' });
                });
        } catch (error) {
            console.error('Lỗi khi xóa thành viên:', error);
            return res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }

}

module.exports = new ProjectController;
