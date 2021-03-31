
var express= require('express');

var router= express.Router();
router.get('/files',function(req,res,next){
    res.render('files');
});
router.post('/post-form',function(req,res,next){
     res.render('files');
});
module.exports=router;

