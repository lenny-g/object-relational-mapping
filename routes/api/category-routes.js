const { Router } = require("express");

const {
  getAllCategories,
  getCategoryById,
  createNewCategory,
  updateCategory,
  deleteCategory,
} = require("../../controllers/api/categories");
// The `/api/categories` endpoint

const router = Router();

router.get("/", getAllCategories);

router.get("/:id", getCategoryById);

router.post("/", createNewCategory);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;
