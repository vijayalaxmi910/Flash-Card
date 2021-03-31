var express= require('express');

var router= express.Router();
router.get('/feedback',function(req,res,next){
    res.render('feedback');
});
router.post('/post-form',function(req,res,next){
     res.render('feedback');
});
module.exports=router;