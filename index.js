const express = require("express");
let books = require("./books");


const app = express();
const PORT = 3000;



app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to the Book Catalog API!");
});

app.get("/getAll",(req,res)=>{
    return res.json(books);
})

app.post("/createBook",(req,res)=>{
    books.push(req.body);
    
    return res.status(201).json(req.body);
})

app.put("/updateBook/:id",(req,res)=>{
    const {id} = req.params;
    const {title,author,year,genre} = req.body;
    
    let book = books.find((b)=>b.id === Number(id));
    if(book){
        book.title = title;
        book.author = author;
        book.year = year;
        book.genre = genre;
        return res.json(book);
    }
    else{
        return res.status(404).json({message:"Book not found"});
    }

})
// Delete a book by id
app.delete("/deleteBook/:id", (req, res) => {
  const { id } = req.params;

  const index = books.findIndex((b) => b.id === Number(id));
  if (index !== -1) {
    const deletedBook = books.splice(index, 1); // remove the book from array
    res.json({ message: "Book deleted successfully!", book: deletedBook[0] });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});