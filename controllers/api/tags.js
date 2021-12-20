const { ProductTag, Product } = require("../../models");

const getAllTags = async (req, res) => {
  try {
    const tags = await ProductTag.findAll({
      include: [
        {
          model: Product,
          attributes: ["product_name"],
        },
      ],
    });

    return res.json({
      success: true,
      data: tags,
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to get tags - ${error.message}`);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await ProductTag.findByPk({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          attributes: ["product_name"],
        },
      ],
    });

    if (ProductTag) {
      return res.json({
        success: true,
        data: tag,
      });
    }
    return res.status(404).json({
      success: false,
      error: "Tag not found",
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to get tag - ${error.message}`);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const createTag = async (req, res) => {
  try {
    const { tag_id, tag_name } = req.body;

    const newProductTag = await ProductTag.create({
      tag_id,
      tag_name,
    });

    return res.json({
      success: true,
      data: newProductTag,
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to create ProductTag - ${error.message}`);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { tag_id, tag_name } = req.body;

    await ProductTag.update(
      {
        tag_id,
        tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const newProductTag = await ProductTag.findByPk(id);

    return res.json({
      success: true,
      data: newProductTag,
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to update tag - ${error.message}`);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteTagById = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductTag.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to delete tag - ${error.message}`);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTagById,
};
