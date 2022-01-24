const { ProductTag, Product } = require("../../models");

const getAllTags = async (req, res) => {
  try {
    const tagData = await ProductTag.findAll();

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
    const tagData = await ProductTag.findByPk(req.params.id);
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
    const { tag_name } = req.body;
    const tagData = await ProductTag.create({
      tag_name,
    });
    if (!tag_name) {
      return res
        .status(500)
        .json({ success: false, error: "Need to include tag name" });
    }
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
    const tagData = await ProductTag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    return res.json({ success: true, tagData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Cannot update tag by ID" });
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
