const {authenticateToken} = require('./userAuth');
const Book = require('../models/book');
const Order = require('../models/order');
const router = require('express').Router();
const User = require('../models/user');
//place order
router.post("/place-order",authenticateToken, async (req,res)=>{
    try {
        const { id } = req.headers;
        const { order } = req.body;
    
        for (const orderData of order) {
          const newOrder = new Order({ user: id, book: orderData._id });
          const orderDataFromDb = await newOrder.save();
    
          // Saving Order in user model
          await User.findByIdAndUpdate(id, {
            $push: { orders: orderDataFromDb._id },
          });
    
          // Clearing cart
          await User.findByIdAndUpdate(id, {
            $pull: { cart: orderData._id },
          });
        }
    
        return res.json({
          status: "Success",
          message: "Order Placed Successfully",
        });
      } catch (err) {
        console.error("Error placing order:", err);
        res.status(500).json({ message: "Error occurred" });
      }
});

//get order history of particular user;
router.get("/get-order-history", authenticateToken, async(req,res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
          path: 'orders',
          populate: { path: 'book' },
        });
    
        if (!userData) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const ordersData = userData.orders.reverse();
        return res.json({
          status: "Success",
          data: ordersData,
        });
      } catch (err) {
        console.error("Error fetching order history:", err);
        return res.status(500).json({ message: "An error occurred" });
      }
});

//get-all-orders ---admin
router.get("/get-all-orders", authenticateToken, async(req,res)=>{
    try{
        const userData = await Order.find()
        .populate({
            path:"book",
        })
        .populate({
            path:"user",
        })
        .sort({createdAt: -1});
        return res.json({
            status:"Success",
            data:userData,
        });

    }catch(error){
        return res.status(500).json({message:"Error occured"});
    }
});

//upadte order --admin
router.put("/update-status/:id",authenticateToken,async (req,res)=>{
    try{
        const {id} = req.params;
        await Order.findByIdAndUpdate(id, {status: req.body.status});
        return res.json({
            status: "Success",
            message: "Status Updated Successfullly",
        });

    }catch(err){
        return res.status(500).json({message: "Some error occured"})
    }
})


module.exports = router;