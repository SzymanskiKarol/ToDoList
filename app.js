const express = require("express");
const https = require("https");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Wake Up", "Eat Breakfast"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    const day = date.getDate();
    res.render('list', { listTitle: day, newListItems: items });
});

app.post("/", (req, res) => {
    const item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    };
});


app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", function (req, res) {
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/");
});






app.listen(process.env.PORT || 3000, () => {
    console.log("Server is working on port 3000");
});
