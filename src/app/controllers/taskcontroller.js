const Task = require('../models/task');
const Task_u = require('../models/task_user');

class TaskController {

    // GET /task/show_task_by_Task
    showbypj(req,res,next){
        const id = req.body.id;
        try{
            Task.find({id_Task: id})
            .then((task) => {
                if(!task){
                    return res.status(404).json({message: "Không tìm thấy nhiệm vụ!"})
                }else{
                    return res.status(200).json({
                        message: "Đã tìm thấy các nhiệm vụ thuộc dự án này",
                        data: task,
                    })
                }
            })
        }catch(error){
            console.error(error);
            return res.status(500).json({message: "Lỗi máy chủ "})
        }
    }
    // GET /task/show_by_pjandmem
    showbypjandmem(req,res,next){
        const {u_id, pj_id} = req.body;
        try{
            let Tasklist;
            Task_u.find({user_id: u_id})
            .then((task_u) => {
                if(!task_u){
                    return res.status(404).json({message: "Không tìm thấy nhiệm vụ!"})
                }
                const listId = task_u.map(x => x.task_id);
                Task.find({ _id: { $in: listId }})
                .then((task) => {
                    Tasklist = task.map(tsk => ({
                        nametask: tsk.nametask,
                        id_task: tsk.id_task,
                        description: tsk.description,
                        pre_task: tsk.pre_task,
                        next_task: tsk.next_task,
                        day_start: tsk.day_start,
                        time: tsk.time,
                        day_end: tsk.day_end,
                        status: tsk.status,
                    }))
                })
            });
            Tasklist.find({id_task: pj_id})
            .then((data) => {
                res.status(200).json({message:"Đã tìm thấy toàn bộ", data: data});
            })
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }

    // GET /task/show_your_task
    yourtask(req,res,next){
        const id = req.body;
        try{
            let Tasklist;
            Task_u.find({user_id: id})
            .then((task_u) => {
                if(!task_u){
                    return res.status(404).json({message: "Không tìm thấy nhiệm vụ!"})
                }
                const listId = task_u.map(x => x.task_id);
                Task.find({ _id: { $in: listId }})
                .then((task) => {
                    Tasklist = task.map(tsk => ({
                        nametask: tsk.nametask,
                        id_task: tsk.id_task,
                        description: tsk.description,
                        pre_task: tsk.pre_task,
                        next_task: tsk.next_task,
                        day_start: tsk.day_start,
                        time: tsk.time,
                        day_end: tsk.day_end,
                        status: tsk.status,
                    }))
                })
            });
            res.status(200).json({message:"Đã tìm thấy toàn bộ", data: Tasklist});
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }

    // POST /task/create
    async create(req,res,next){
        const {nametask, id_task, description, pre_task, next_task, day_start, time, day_end, status} = req.body;
        try{
            if(!nametask || !day_start || !time){
                res.status(400).json({message: "Vui lòng cập nhật đầy đủ thông tin!"});
            }
            let createTask = await Task.create({nametask, id_task, description, pre_task, next_task, day_start, time, day_end, status})
            if(createTask){
                res.status(200).json({
                    message: "Thêm nhiệm vụ thành công",
                    data: createTask
                })
            }else{
                res.status(404).json({message: "Thêm nhiệm vụ thất bại"})
            }
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Lỗi máy chủ' }); 
        }
    }
    
    // DELETE /task/delete/:id
    delete(req,res,next){
        const id = req.params.id;
        try{
            Task.deleteOne({_id: id})
            .then((task) => {
                if(!task){
                    res.status(404).json({message: "Không tìm nhiệm vụ án, xóa thát bại!"});
                }
                else{
                    res.status(200).json({message: "Xóa nhiệm vụ thành công"});
                }
            })
        }catch(error){
            console.error(error);
            res.status(500).json({message: "Lỗi máy chủ!"});
        }
    }

    // PUT /task/update
    update(req,res,next){
        try{
            Task.findOneAndUpdate({_id: req.body.id}, req.body)
            .then((task) => {
                if(!task){
                    return res.status(404).json({message: "Không tìm thấy nhiệm vụ!"});
                }
                else{
                    return res.status(200).json({message: "Cập nhật thành công", task});
                }
            })
        }catch(error){
            console.error(error);
            res.status(500).json({message: "Lỗi máy chủ!"});
        }
    }

}

module.exports = new TaskController;
