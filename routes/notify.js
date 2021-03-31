

var express= require('express');

var router= express.Router();
router.get('/notify',function(req,res,next){
    res.render('notify');
});
router.post('/post-form',function(req,res,next){
     res.render('notify');
});
module.exports=router;
