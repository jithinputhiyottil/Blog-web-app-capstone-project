import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
const app = express();
//const methodOverride = require("method-override");
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));

let blogPosts = [];

app.get("/", (req,res)=>{
    res.render("index.ejs", {blogPosts});
});

app.get("/", (req,res)=>{
    res.render("createBlog.ejs", {blogPosts});
});

app.get("/edit/:index", (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (isNaN(index) || index < 0 || index >= blogPosts.length) {
        console.log(`Invalid index: ${req.params.index}`);
        return res.status(404).send('Paragraph not found');
    }
    const paragraph = blogPosts[index];
    if(paragraph){
        res.render("editBlog.ejs", { paragraph, index});
    }else{
        console.log(`Paragraph at index ${index} not found`);
        res.status(404).send('Paragraph not found');
    }
    
});

app.post("/submit", (req, res)=>{
    res.render("createBlog.ejs");
});

app.post("/", (req, res)=>{
    const title = req.body.title;
    const content = req.body.content;
    blogPosts.push({
        blogTitle: title,
        blogContent: content,
    });
    console.log(blogPosts);
    res.render("index.ejs", {blogPosts});
});

app.post("/submit", (req, res)=>{
    res.render("createBlog.ejs");
});

app.patch("/edit/:index", (req, res) => {
    const index = parseInt(req.params.index, 10);
    const newContent = req.body.paragraph;
    const newTitle = req.body.heading;
    if (blogPosts[index]) {
        blogPosts[index].blogTitle = newTitle;
        blogPosts[index].blogContent = newContent;
    }

    res.redirect('/');
});

app.delete("/delete/:index", (req, res)=>{
    const index = parseInt(req.params.index, 10);
    blogPosts.splice(index, 1);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });