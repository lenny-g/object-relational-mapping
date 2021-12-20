const { Product, Category } = require("../../models");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["category_name"],
        },
      ],
    });

    return res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to get products - ${error.message}`);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Category,
          attributes: ["category_name"],
        },
        ,
      ],
    });

    if (product) {
      return res.json({
        success: true,
        data: product,
      });
    }
    return res.status(404).json({
      success: false,
      error: "Product not found",
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to get Product - ${error.message}`);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { product_id, product_name, price, stock, category_id } = req.body;

    const newProduct = await Product.create(req.body);

    return res.json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to create product - ${error.message}`);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, product_name, price, stock, category_id } = req.body;

    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const newProduct = await Product.findByPk(id);

    return res.json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to update product - ${error.message}`);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to delete product - ${error.message}`);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
};
