const { Product, Category, ProductTag } = require("../../models");

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
  //  if category_id exists inside the body then we check if the ID actually exists.
  const { category_id } = req.body;
  if (category_id) {
    const categoryData = await Category.findByPk(category_id);
    if (!categoryData) {
      return res
        .status(404)
        .json({ success: false, error: "Failed to find category ID" });
    }
  }
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4],
      category_id: 3
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model

      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

const updateProduct = async (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
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
