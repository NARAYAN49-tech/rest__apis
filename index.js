const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "images")));

let posts = [
    {
        id: uuidv4(),
        username : "NARAYAN",
        content: "Narayan is a guy ."
    },
    {
        id: uuidv4(),
        username: "Rabindra",
        content: "Rabindra Nath Taigore"
    }
];

app.get("/posts",(req, res) => {
    res.render("index.ejs", {posts});
});

app.post("/posts",(req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({username,id,content});
    res.redirect("/posts");
});
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.get("/posts/:id",(req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("view.ejs",{post});
});

app.patch("/posts/:id",(req, res) => {
    let { id } = req.params;
    let newContent =req.body.content;
    let post  = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post.content);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port,()=> {
    console.log("The app is listening port 8080");
});