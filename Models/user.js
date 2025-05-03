//Add to few
const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
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

//Schema
const newSchema = new Schema({
    username: String,
    address: [{
        _id: false,
        location: String,
        city: String
    }]
});

//model
const User = mongoose.model("User", newSchema);

//Adding user
const addUser = async() => {
    let user1 = new User({
        username: "Khairul",
        address: [
        {
            location: "345 Street Uttara",
            city: "Dhaka"
        },
        {   
            location: "456 Street Dhanmondi",
            city: "Mohakhali"
        }
    ]
    })

    user1.address.push({location: "67 Street Jigatola", city: "Nuakhali"});
    let result = await user1.save();
    console.log(result);
};

addUser();

