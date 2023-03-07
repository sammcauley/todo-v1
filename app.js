const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set("view engine", "ejs")

// Can vary the contents of an array, just cant assign it to a new array. Therefore const can be used
const items = [];
const workItems = [];

app.get("/", function(req,res) {
    const day = date.getDay();

    res.render("list", {listTitle: day, listItems: items});
});

app.post("/", function(req,res) {
    const item = req.body.newItem;
    
    if (req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
    
});

app.get("/work", function(req,res) {
    res.render("list", {listTitle: "Work List", listItems: workItems});
});

app.get("/about", function(req,res) {
    res.render("about")
});

app.listen(3000, function() {
    console.log("Running on port 3000");
});

