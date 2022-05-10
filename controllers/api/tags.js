const { Tag } = require("../../models");

const getAllTags = async (req, res) => {
  try {
    const tagData = await Tag.findAll();

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
    const tagData = await Tag.findByPk(req.params.id);
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
    const tagData = await Tag.create({
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
    const tagData = await Tag.update(req.body, {
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
    const tagData = await Tag.destroy({
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
