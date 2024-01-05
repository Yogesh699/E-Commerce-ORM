const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  const dategoryData = await Category.findAll({
      attributes: [
        'id',
        'category_name'
      ],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        }
      ]
    })
  res.json(dategoryData)
});

router.get('/:id', async (req, res) => {
  const categoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'category_name'
      ],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        }
      ]
    })
  res.json(categoryData)
});

router.post('/', (req, res) => {
  const categoryData = Category.create({
    id: req.body.id,
    category_name: req.body.category_name
  })
  res.json(categoryData)
});

router.put('/:id', async (req, res) => {
  const categoryData = await Category.update({
    category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    
  if (!categoryData) {
    res.status(404).json({ message: 'Category Not Found' });
    return;
  }
  res.json(categoryData);

});

router.delete('/:id', async (req, res) => {
  const categoryData = await Category.destroy({
    where: {
      id: req.params.id
    }
  })
    
  if (!categoryData) {
    res.status(404).json({ message: 'Category Not Found' });
    return;
  }
  res.json(categoryData);

});

module.exports = router;
