var express= require('express');

var router= express.Router();
router.get('/contactus',function(req,res,next){
    res.render('contactus');
});
router.post('/post-form',function(req,res,next){
     res.render('contactus');
});
module.exports=router;