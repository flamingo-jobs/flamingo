const Categories = require('../models/categories');


const create = (req, res) => {
    let newCategory = new Categories(req.body);

    newCategory.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            message: "Category saved successfully"
        });

    });

}

const getAll = (req, res) => {
    Categories.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            existingData: categories
        });
    });
}

const getById = (req, res) => {
    Categories.findById(req.params.id).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            category: category
        });
    });
}

const getFeaturedCategories = (req, res) => {
    Categories.find({ isFeatured: true }, (err, featuredCategories) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            featuredCategories: featuredCategories
        });
    });
}


const update = (req, res) => {

    Categories.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, category) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.status(200).json({
                success: "Updated successfully"
            });
        }
    );
}

const remove = (req, res) => {
    Categories.deleteMany(req.body).exec((err, deletedCategory) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Category deleted successfully",
            deletedCategory: deletedCategory,
        });
    });
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
    getFeaturedCategories

}