var express= require('express');

var router= express.Router();
router.get('/quizes',function(req,res,next){
    res.render('quizes');
});

router.post('/post-form',function(req,res,next){
     res.render('quizes');
});
module.exports=router;