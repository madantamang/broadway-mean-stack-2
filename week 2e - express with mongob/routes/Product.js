var express = require('express');
var router = express.Router();
var product=require('../models/Product');
var category=require('../models/Category');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //retrieving data
  product.find(function(err,data){
    if(err){
      res.render("Product/index",{title:'error occured'});
    }
    console.log(data);
    res.render("Product/index",{title:'product landing page',product:data});

  });

});
router.get('/create', function(req, res, next) {
    category.find(function (err,data) {
        res.render("Product/create",{title:'product create page',category:data});
    });
});
router.post('/create', function(req, res, next) {
  //saving data
    console.log('body contain',req.body);
  var product1=new product({
   Title:req.body.title,
    Price:req.body.price,
    Brand:req.body.brand, 
    categoryId:req.body.categoryId,
    Rating:req.body.rating,
    Description:req.body.description
  });
   product1.save(function(err,data){
     if(err){
       console.log(err);
     }
     console.log(data);
     res.redirect("/Product");
   });
});
router.get('/details/:id', function(req, res, next) { //findById
    //product.findOne({'title':},function (err,data){
    product.findById(req.params.id,function (err,data){
        res.render("Product/details",{title:'product details page',product:data});
    });
});
router.get('/edit/:id', function(req, res, next) {
    product.findById(req.params.id,function (err,data){
        if(err){
            res.render("Product/edit",{title:'oops update page error'});
        }
        res.render("Product/edit",{title:'product update page',product:data});
    });
});

router.put('/edit', function(req, res, next) {
    //saving data
    var idToUpdate=req.body.id;
    var updatedProduct={
        Title:req.body.title,
        Price:req.body.price,
        Brand:req.body.brand,
        category:req.body.category,
        Rating:req.body.rating,
        Description:req.body.description
    };
     product.findByIdAndUpdate(idToUpdate,updatedProduct,function (err,response){
         if(err){
          //res.render("Product/edit")
         }
         res.redirect("/Product");
     })
});
router.get('/delete/:id', function(req, res, next) {
    var idToDelete=req.params.id;
    console.log(idToDelete);
    product.findByIdAndRemove(idToDelete,function (err,data) {
        if(err){
        }
        res.redirect("/Product")
    });
});


module.exports = router;
