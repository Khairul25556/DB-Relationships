//Add to many medium
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

//order schema
const orderSchema = new Schema({
    item: String,
    price: Number
});

//customer schema
const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
});

// customerSchema.pre("findOneAndDelete", async() => {
//     console.log("PRE MIDDLEWARE");
// });

// Make sure the middleware is declared before the model:
customerSchema.post("findOneAndDelete", async(customer) => {
    if(customer.orders.length){
        let res = await Order.deleteMany({_id: {$in: customer.orders}});
        console.log(res);
    }
});


//order and customer model
const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);


// Delete
const delCus = async() => {
    let reslt = await Customer.findByIdAndDelete("68149d2ad56d925e9b77efde");
    console.log(reslt);
}

delCus();


//adding customer and orders
// const addData = async() => {
    // let cus1 = new Customer({
    //     name: "Elon Mask",
    // });

    // let cus2 = new Customer({
    //     name: "James007"
    // });

    // let order2 = new Order({
    //     item: "Pizza",
    //     price: 800
    // });

    // cus2.orders.push(order2);

    // await cus2.save();
    // await order2.save();
    // console.log("Added ne customer");

    //     let restult = await Order.insertMany([
    //         {
    //             item: "Puri",
    //             price: 12
    //         },
    //         {
    //             item: "Chips",
    //             price: 20
    //         },
    //         {
    //             item: "Tea",
    //             price: 10
    //         }
    //     ])
    //     console.log(restult);

    // let order1 = await Order.findOne({item: "Puri"});
    // let order2 = await Order.findOne({item: "Tea"});
    // cus1.orders.push(order1);
    // cus1.orders.push(order2);

    // let result = await cus1.save();
    // console.log(result);

// };

// addData();


//find and verifications
// const findCustomer = async() => {
//     let rslt = await Customer.find({}).populate("orders");
//     console.log(rslt[0]);
// }

// findCustomer();
