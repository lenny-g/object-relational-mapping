const getAllCategories = (req, res) => {
  res.send("getAllCategories");
  // find all categories
  // be sure to include its associated Products
};

const getCategoryById = (req, res) => {
  res.send("getCategoryById");
  // find one category by its `id` value
  // be sure to include its associated Products
};

const createNewCategory = (req, res) => {
  res.send("create");
  // create a new category
};

const updateCategory = (req, res) => {
  res.send("update");
  // update a category by its `id` value
};

const deleteCategory = (req, res) => {
  res.send("delete");
  // delete a category by its `id` value
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createNewCategory,
  updateCategory,
  deleteCategory,
};
