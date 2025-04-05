const Category = require('../models/category');

class CategoryController {

    // GET /category/get_all
    getall(req,res,next){
        try{
            Category.find({})
            .then((category) => {
                if(!category){
                    return res.status(404).json({message: "Không tìm thấy danh mục!"});
                }
                console.log(category);
                res.status(200).json({message: "Đã tìm thấy toàn bộ danh mục", data: category});
            })
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }
}

module.exports = new CategoryController();