const { Product, Category } = require("../../models");

const getAllProducts = async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: {
        model: Category,
      },
    });
    return res.json({
      success: true,
      productData,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, error: "Failed to get product" });
  }
};

const getProductById = async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: {
        model: Category,
      },
    });
    return res.json({ success: true, productData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to find product ID" });
  }
};

const createProduct = async (req, res) => {
  try {
    const { product_id, product_name, price, stock, category_id } = req.body;

    const productData = await Product.create(req.body);

    return res.json({
      success: true,
      productData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to create product" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { product_id, product_name, price, stock, category_id } = req.body;
    const productData = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.json({
      success: true,
      productData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to update product ID" });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json({
      success: true,
      productData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete product ID" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
};
