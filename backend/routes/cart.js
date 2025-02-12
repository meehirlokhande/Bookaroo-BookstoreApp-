const router = require('express').Router();
const User = require('../models/user');
// const saltRounds = 10;
const {authenticateToken} = require('./userAuth');

// add to cart
router.put("/add-book-to-cart",authenticateToken, async(req,res) =>{
    try{
        const {bookid,id} = req.headers;
        const userData = await User.findById(id);
        const isBookCart = userData.favourites.includes(bookid);
        if(isBookCart){
            return res.status(200).json({message:"Book is already in cart"});
        }
        await User.findByIdAndUpdate(id, {$push: {cart:bookid}});
        return res.json({
            status: "success",
            message:"Book added to cart"});
    }catch(err){
        return res.json(500).json({message: "An error occureed"});
    }
})
// remove from cart
router.put("/remove-book-from-cart/:bookid",authenticateToken, async(req,res) =>{
    try {
        const { id } = req.headers;
        const { bookid } = req.params;
    
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        if (user.cart.includes(bookid)) {
          user.cart = user.cart.filter(item => item.toString() !== bookid);
          await user.save();
        }
    
        res.status(200).json({ message: 'Book removed from cart' });
      } catch (err) {
        console.error("Error removing book from cart:", err);
        res.status(500).json({ message: 'Server error' });
      }
})

// get cart for a particular user
router.get("/get-user-cart", authenticateToken , async (req,res)=>{
    try{
        const {id} = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();
        return res.json({
            status: "Success",
            data: cart,
        })
    }catch(err){
        res.status(500).json({message:"An error occured"});
    }
});
module.exports =router;