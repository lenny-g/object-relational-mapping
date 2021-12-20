const { ProductTag, Product } = require("../../models");

const getAllTags = async (req, res) => {
  try {
    const tagData = await ProductTag.findAll({
      include: {
        model: Product,
      },
    });

    return res.json({
      success: true,
      tagData,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, error: "Failed to find Tags" });
  }
};

const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const tagData = await ProductTag.findByPk(req.params.id, {
      include: {
        model: Product,
      },
    });
    return res.json({
      success: true,
      tagData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to find tag ID" });
  }
};

const createTag = async (req, res) => {
  try {
    const tagData = await ProductTag.create({
      tag_id: req.body.tag_id,
      tag_name: req.body.tag_name,
    });

    return res.json({
      success: true,
      tagData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to create tag" });
  }
};

const updateTag = async (req, res) => {
  try {
    const tagData = await ProductTag.update({
      tag_id: req.body.tag_id,
      tag_name: req.body.tag_name,
    });

    return res.json({
      success: true,
      tagData,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Cannot update tag" });
  }
};

const deleteTagById = async (req, res) => {
  try {
    const tagData = await ProductTag.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json({
      success: true,
      tagData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Cannot delete tag data" });
  }
};

module.exports = {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTagById,
};
