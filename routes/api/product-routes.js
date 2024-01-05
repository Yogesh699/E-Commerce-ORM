const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  const productData = await Product.findAll({
    attributes: [
      'id',
      'product_name',
      'price',
      'stock',
      'category_id'
    ],
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
  })

  res.json(productData)
 
});

router.get('/:id', async (req, res) => {
  const productData = await Product.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'product_name',
      'price',
      'stock',
      'category_id'
    ],
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
  })
  if(!productData){
    res.json({"Message":"No product Fond!"})
  }
  res.json(productData)
});

router.post('/', async (req, res) => {
  const product = await Product.create({
    "product_name": req.body.product_name,  
    "price": req.body.price,
    "stock":req.body.stock,
    "category_id":req.body.category_id
  });
  if (req.body.tagIds.length) {
    const productTags = req.body.tagIds.map((tag_id) => ({
      product_id: product.id,
      tag_id,
    }));
    await ProductTag.bulkCreate(productTags);
  }else{
    await ProductTag.create({
      product_id: product.id,
      tag_id:req.body.tagIds
    })
  }

  res.status(200).json(product);
});


router.put('/:id', async (req, res) => {
  
  if (req.body.tagIds){
    await ProductTag.destroy({ where: { product_id: req.params.id } });

    if (req.body.tagIds.length) {
      const productTags = req.body.tagIds.map((tag_id) => ({
        product_id: req.params.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTags);
    }else{
      await ProductTag.create({
        product_id: req.params.id,
        tag_id:req.body.tagIds
      })
    }
  }

  await Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  res.json({ "Message": "Product has been updated" });
});


router.delete('/:id', async (req, res) => {
  
  const dbProductData = await Product.destroy({
    where: {
      id: req.params.id,
    },
  });

  if (!dbProductData) {
    res.status(404).json({ message: 'Product Not Found' });
    return;
  }

  res.json({ Message: "Product has been deleted" });

});


module.exports = router;
