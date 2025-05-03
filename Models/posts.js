//Add to many ultimate
const mongoose = require("mongoose");
const {Schema} = mongoose;

async function connection(){
    const name = process.env.DB_USER;
    const pass = process.env.DB_PASS;
    const encodedPass = encodeURIComponent(pass);
    await mongoose.connect(`mongodb://${name}:${encodedPass}@127.0.0.1:27017/relationDemo?authSource=admin`);
}

connection()
.then((res) => console.log("MongoDB connected"))
.catch((err) => console.log(err));

//user Schema
const userSchema = new Schema({
    username: String,
    email: String
});

//Post Schema
const postsSchema = new Schema({
    content: String,
    like: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

//user and post model
const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postsSchema);

//adding data each 

// const addData = async() => {
//     let user1 = new User({
//         username: "James Bond 007",
//         email: "admin@gmail.com" 
//     })

//     let user1 = await User.findOne({username: "James Bond 007"});

//     let post1 = new Post({
//         content: "Hi! Welcome to our Rick & Morty Club.",
//         like: 12
//     })

//     let post2 = new Post({
//         content: "Lets visit Bangladesh to see the beauties of shit",
//         like: 100,
//     })

//     post1.user = user1;
//     post2.user = user1;

//     await user1.save();
//     await post2.save();

// };

// addData();

//find and verify
const getData = async() => {
    let result = await Post.find({}).populate("user", "email");
    console.log(result);
} 

getData();
