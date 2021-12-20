const { Category, Product } = require("../../models");

const getAllCategories = async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: {
        model: Product,
        attributes: ["product_name"],
      },
    })
    return res.json({ success: true, categoryData })
  }
  catch(error) {
    return res
    .status(500)
    .json({ success: false, error: "Failed to send response" });
};

// be sure to include its associated Products

const getCategoryById = async (req, res) => {
  const categoryData = await Category.findByPk({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["product_name"],
      },
    ],
  })
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

  const createNewCategory = async (req, res) => {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    })
      .then((categoryData) => res.json(categoryData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  };
  // create a new category

  const updateCategory = async (req, res) => {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((categoryData) => {
        if (!categoryData) {
          res.status(404).json({ message: "No Category found with that ID." });
          return;
        }
        res.json(categoryData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  };

  // update a category by its `id` value

  const deleteCategory = async (req, res) => {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((categoryData) => {
        if (!categoryData) {
          res.status(404).json({ message: "No Category found with that ID." });
          return;
        }
        res.json(categoryData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });

    // delete a category by its `id` value
  };

  module.exports = {
    getAllCategories,
    getCategoryById,
    createNewCategory,
    updateCategory,
    deleteCategory,
  };
};
