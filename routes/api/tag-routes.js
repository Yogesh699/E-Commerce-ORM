const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', async (req, res) => {
  const tagsData = await Tag.findAll({
    attributes: [
      'id',
      'tag_name'
    ],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })
  res.json(tagsData)
});

router.get('/:id', async (req, res) => {
  const tagData = await Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'tag_name'
    ],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })
  if(!tagData){
    res.status(404).json({ message: 'Tag Not Found' });
    return
  }
  res.json(tagData)
});

router.post('/', async (req, res) => {
  await Tag.create({
    tag_name: req.body.tag_name
  })
  res.status(200).json({ message: 'Tag has been added' });
});

router.put('/:id', async (req, res) => {
  const tagData = await Tag.update({
    tag_name: req.body.tag_name
  },
    {
      where: {
        id: req.params.id
      }
    }
  )
  if (!tagData) {
    res.status(404).json({ message: 'Tag Not Found' });
    return;
  }
  res.status(200).json({ message: 'Tag has been updated' });
});

router.delete('/:id', async (req, res) => {
   const tagData = await Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  if (!tagData) {
    res.status(404).json({ message: 'Tag Not Found' });
    return;
  }
  res.status(200).json({ message: 'Tag has been deleted' });
});

module.exports = router;
