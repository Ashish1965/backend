const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/bookdb");

const bookSchema = new mongoose.Schema({
  name: String,
  mobile: Number,
  email: String,
  salary: Number,
  city: String,
  country: String,
  department: String,
  role: String,
});

const Book = mongoose.model("Book", bookSchema);

app.route("/assistant/:id").get(async (req, res) => {
  try {
    const fetchid = req.params.id;
    const result = await Book.find({ _id: fetchid });
    res.send(result);
  } catch (err) {
    console.log(err);
  }
})
.delete(async (req, res) => {
    try {
        const fetchid = req.params.id;
        const result = await Book.findByIdAndDelete({ _id: fetchid });
        res.send("success");
    } catch (err) {
        console.log(err);
    }
})
.put(async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await Book.findByIdAndUpdate(
            _id , req.body
            
        );
        res.send("success");
    } catch (err) {
        console.log(err);
    }
})
.patch(async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await Book.findByIdAndUpdate(
            _id , req.body
        );
        res.send("success");
    } catch (err) {
        console.log(err);
    }
})

app.post("/assistant", async (req, res) => {
  try {
    let data = new Book(req.body);
    const result = await data.save();
    res.send("success");
  } catch (err) {
    console.log(err);
  }
});
app.listen(2000, function () {
  console.log("Server started on port 2000");
});
