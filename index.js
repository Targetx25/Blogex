import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";




const app = express();
let id = 0;
let postDetails = []

app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));

app.use(express.static("public"))
// Constructor Function for creating postDetail object for storing info 
function Details(id, title, createdBy, content){
    this.id = id;
    this.title = title;
    this.createdBy = createdBy;
    this.content = content;
}

//For Creating postDetails object again and again
function createPosts(title, createdBy, content){
    
    postDetails[id]  = new Details(id,title, createdBy, content);
    
}

//Home Route
app.get("/", (req, res)=>{
    const data= {
        postDetails: postDetails,
        id: id,
    }
    res.render("main.ejs",data)
})



//For creating the blog 
app.get("/create", (req,res)=>{
    res.render("create.ejs")
    
})

//For submitting the new blogs
app.post("/submit", (req,res)=>{
    let title = req.body["title"]
    let author = req.body["author"]
    let content = req.body["content"]
    createPosts(title, author, content);
    res.render("post.ejs", {
        titleName: title,
        authorName: author,
        contentName: content,
        id:id, 
    });
    id++;
})

//Route for editing the post 
app.get("/edit/:postId", (req,res)=>{
    const postId = req.params.postId
    console.log(postId)
    const data= {
        titleName: postDetails[postId].title,
        authorName: postDetails[postId].createdBy,
        contentName: postDetails[postId].content,
        id:postId,
    }

    //Render the new edited page
    res.render("edit.ejs", data);
    

})

//Route to delete the post
app.get("/delete/:postId", (req,res)=>{
    const postId = req.params.postId
    delete postDetails[postId];
    res.redirect("/");
})

//For getting to a particular blog  from the home page
app.get("/click/:postId", (req,res)=>{
    const postId = req.params.postId
    const data= {
        titleName: postDetails[postId].title,
        authorName: postDetails[postId].createdBy,
        contentName: postDetails[postId].content,
        id:postId,
    }
    res.render("post.ejs", data);

})

//Route for Updating Edited Post
app.post("/update/:postId", (req,res)=>{
    const postId = req.params.postId
    console.log(postId)
    console.log(req.body["title"])
    postDetails[postId].title = req.body["title"]
    postDetails[postId].createdBy = req.body["author"]
    postDetails[postId].content = req.body["content"]

    const data= {
        titleName: postDetails[postId].title,
        authorName: postDetails[postId].createdBy,
        contentName: postDetails[postId].content,
        id:postId,
    }
    res.render("post.ejs", data);
})

//Route for Features Page
app.get("/features", (req, res)=>{
    res.render("features.ejs")
})

//For starting the server port
app.listen(3000, ()=>{
    console.log("Server Has Started at port 3000")
})

