
var express= require('express');

var router= express.Router();
router.get('/mail',function(req,res,next){
    res.render('mail');
});
router.post('/post-form',function(req,res,next){
     res.render('mail');
});
module.exports=router;







