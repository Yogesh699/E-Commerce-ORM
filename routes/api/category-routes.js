const router = require('express').Router();
const { Category, Product } = require('../../models');

// Get all categories with associated products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }]
    });
    res.json(categoryData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific category by ID with associated products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'category_name'],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }]
    });
    if (!categoryData) {
      res.status(404).json({ message: 'Category Not Found' });
      return;
    }
    res.json(categoryData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name
    });
    res.status(201).json({ message: `${categoryData.category_name} has been added` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a category by ID
router.put('/:id', async (req, res) => {
  try {
    const [numRowsAffected] = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    );
    if (numRowsAffected === 0) {
      res.status(404).json({ message: 'Category Not Found' });
      return;
    }
    res.json({ message: `${req.body.category_name} has been updated` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a category by ID
router.delete('/:id', async (req, res) => {
  try {
    const numRowsAffected = await Category.destroy({ where: { id: req.params.id } });
    if (numRowsAffected === 0) {
      res.status(404).json({ message: 'Category Not Found' });
      return;
    }
    res.json({ message: 'Category has been deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
