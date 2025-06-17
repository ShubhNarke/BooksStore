const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");
const book = require("../models/book");

// Add book — Only admin
router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const { url, title, author, price, desc, language } = req.body;

    if (!url || !title || !author || !price || !desc || !language) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const book = new Book({
      url,
      title,
      author, 
      price,
      desc,
      language,
    });

    await book.save();
    res.status(200).json({ message: "Book added successfully", book });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// update book 

router.put("/update-book",authenticateToken,async(req, res)=>{
  try {
    const {bookid}=req.headers;
    await Book.findByIdAndUpdate(bookid,{
      url:req.body.url,
      title:req.body.title,
      author:req.body.author,
      price:req.body.price,
      desc:req.body.desc,
      language:req.body.language,
    });
    return res.status(200).json({message:"Book update successfully"});
  } catch (error) {
    return res.status(500).json({message:"An error coourred"});
    
  }
});

// delete book admin \

router.delete("/delete-book",authenticateToken,async(req,res)=>{
  try {
    const {bookid}=req.headers;
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({message:"Book delete successfully"});
  } catch (error) {
    return res.status(500).json({message:"An error occurred"});
  }
});

// get all books api 

router.get("/get-all-book",async(req,res)=>{
  try {
    const books = await Book.find().sort({createAt:-1});
    return res.json({
      status:"succes",
      data:"books",
    })
  } catch (error) {
   return res.status(500).json({message:"An error occurred"});
  }
});

//  get recently added books limit 4

router.get("/get-recent-books",async(req,res)=>{
  try {
    const books = await Book.find().sort({createAt:-1}).limit(4);
    return res.json({
      status:"Success",
      data: books,
    })
  } catch (error) {
      return res.status(500).json({message:"An error occurred"});
  }
});

// get book by id 

router.get("/get-book-by-id/:id",async(req,res)=>{
  try {
    const {id} = req.params;
    const book = await Book.findById(id);
    return res.json({
      status:"success",
      data:book,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"An error occurred"});
  }
})

module.exports = router;
