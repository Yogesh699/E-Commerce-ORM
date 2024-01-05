const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Get all products with associated category and tags
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      include: [
        {
          model: Category,
          attributes: ['id', 'category_name'],
        },
        {
          model: Tag,
          attributes: ['id', 'tag_name'],
        }
      ]
    });
    res.json(productData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific product by ID with associated category and tags
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      include: [
        {
          model: Category,
          attributes: ['id', 'category_name'],
        },
        {
          model: Tag,
          attributes: ['id', 'tag_name'],
        }
      ]
    });
    if (!productData) {
      res.status(404).json({ message: 'Product Not Found' });
      return;
    }
    res.json(productData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create({
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id
    });

    if (req.body.tagIds.length) {
      const productTags = req.body.tagIds.map((tag_id) => ({
        product_id: product.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTags);
    } else {
      await ProductTag.create({
        product_id: product.id,
        tag_id: req.body.tagIds
      });
    }

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    if (req.body.tagIds) {
      await ProductTag.destroy({ where: { product_id: req.params.id } });

      if (req.body.tagIds.length) {
        const productTags = req.body.tagIds.map((tag_id) => ({
          product_id: req.params.id,
          tag_id,
        }));
        await ProductTag.bulkCreate(productTags);
      } else {
        await ProductTag.create({
          product_id: req.params.id,
          tag_id: req.body.tagIds
        });
      }
    }

    await Product.update(req.body, {
      where: { id: req.params.id },
    });

    res.json({ message: 'Product has been updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const numRowsAffected = await Product.destroy({
      where: { id: req.params.id },
    });

    if (numRowsAffected === 0) {
      res.status(404).json({ message: 'Product Not Found' });
      return;
    }

    res.json({ message: 'Product has been deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
