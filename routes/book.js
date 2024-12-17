const router = require('express').Router();
const User = require('../models/user');
const Book = require('../models/book');
const jwt = require('jsonwebtoken');
// const saltRounds = 10;
const {authenticateToken} = require('./userAuth');
//add book --admin
router.post("/add-book", authenticateToken , async (req,res) => {
    try{
        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role !== "admin"){
            return res.status(400).json({message: "Invalid access"});
        }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        });

        await book.save();
       return res.status(200).json({message:"Book added successfully"});
    }catch(err){
        return res.status(500).json({message: "Internal server error"});
    }
})

// update book 
router.put("/update-book", authenticateToken , async (req,res) => {
    try{
        const {bookid} = req.headers;
         await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
         },
         {new:true}
        );
        
       return res.status(200).json({message:"Book Updated successfully"});
    }catch(err){
        return res.status(500).json({message: "Internal server error"});
    }
})

//delete book --admin
router.delete("/delete-book", authenticateToken , async (req,res) =>{
    try{
        const {bookid} = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({message: "Book deleted successfully"});   
    }catch(err){
        res.status(500).json({message:"An error occured"});
    }
})

// get all books
router.get("/get-all-books", async(req,res)=>{
    try{
        const books = await Book.find().sort({createdAt: -1});
        return res.json({
            status: "Success",
            data: books,
        });

    }catch(err){
        return res.json(500).json({message: "An error occureed"});
    }
})

// get recently added books limit 4
router.get("/get-recent-books", async(req,res)=>{
    try{
        const books = await Book.find().sort({createdAt: -1}).limit(4);
        return res.json({
            status: "Success",
            data: books,
        });

    }catch(err){
        return res.json(500).json({message: "An error occureed"});
    }
})

// get book by id 
router.get("/get-book-by-id/:id", async(req,res)=>{
    try{
        const {id}= req.params;
        const book = await Book.findById(id);
        return res.json({
            status: "Success",
            data: book,
        });

    }catch(err){
        return res.json(500).json({message: "An error occureed"});
    }
})

module.exports = router;