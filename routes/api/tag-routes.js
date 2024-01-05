const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Get all tags with associated products
router.get('/', async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        }
      ]
    });
    res.json(tagsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific tag by ID with associated products
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'tag_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        }
      ]
    });
    if (!tagData) {
      res.status(404).json({ message: 'Tag Not Found' });
      return;
    }
    res.json(tagData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(201).json({ message: 'Tag has been added' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a tag by ID
router.put('/:id', async (req, res) => {
  try {
    const [numRowsAffected] = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    );
    if (numRowsAffected === 0) {
      res.status(404).json({ message: 'Tag Not Found' });
      return;
    }
    res.json({ message: 'Tag has been updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a tag by ID
router.delete('/:id', async (req, res) => {
  try {
    const numRowsAffected = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (numRowsAffected === 0) {
      res.status(404).json({ message: 'Tag Not Found' });
      return;
    }
    res.json({ message: 'Tag has been deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
