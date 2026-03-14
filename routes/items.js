const router = require("express").Router();
const Item = require("../models/Item");
const auth = require("../middleware/authMiddleware");

/* ADD ITEM */

router.post("/",auth,async(req,res)=>{

try{

const item = new Item({

name:req.body.name,
price:req.body.price,
userId:req.user.id

});

await item.save();

res.json(item);

}catch(err){

res.status(500).json(err);

}

});

/* GET ITEMS */

router.get("/",auth,async(req,res)=>{

try{

const items = await Item.find({
userId:req.user.id
});

res.json(items);

}catch(err){

res.status(500).json(err);

}

});

module.exports = router;