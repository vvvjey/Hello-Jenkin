const express = require("express");
const productController = require('../controllers/productController');
let router=express.Router()
let initWebRoutes = (app) => {

    router.get('/',function(req,res){
        res.json("helo");
    })
    router.get('/abc',function(req,res){
        res.render("home");
    })


    // Api
    router.get('/api/v1/get-all-products',productController.getAllProductFromWoo);
    return app.use("/",router)
}


module.exports=  initWebRoutes