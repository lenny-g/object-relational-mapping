const { Category, Product } = require("../../models");

const getAllCategories = async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: {
        model: Product,
      },
    });
    return res.json({ success: true, categoryData });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, error: "Failed to find categories" });
  }
};

// be sure to include its associated Products

const getCategoryById = async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: { model: Product },
    });
    return res.json({ success: true, categoryData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to find category ID" });
  }
};

const createNewCategory = async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    return res.json({ success: true, categoryData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to create category" });
  }
};
// create a new category

const updateCategory = async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    return res.json({ success: true, categoryData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Cannot update category by ID" });
  }
};

// update a category by its `id` value

const deleteCategory = async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: "Failed to delete category ID" });
      return;
    }
    res.json(categoryData);
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }

  // delete a category by its `id` value
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createNewCategory,
  updateCategory,
  deleteCategory,
};
