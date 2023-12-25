const mongoose = require('mongoose');
//const mongoURI = 'mongodb+srv://mobileKart:Jee1234@cluster0.lh4ajcb.mongodb.net/mobilekartmern?retryWrites=true&w=majority'
const mongoURI = 'mongodb://mobileKart:Jee1234@ac-5wsrnxr-shard-00-00.lh4ajcb.mongodb.net:27017,ac-5wsrnxr-shard-00-01.lh4ajcb.mongodb.net:27017,ac-5wsrnxr-shard-00-02.lh4ajcb.mongodb.net:27017/mobilekartmern?ssl=true&replicaSet=atlas-i7yn9p-shard-0&authSource=admin&retryWrites=true&w=majority'
 

const mongoDB = async () => {
   await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
      if (err) console.log("---", err)
      else {
         console.log("connected");
         const fetched_data = await mongoose.connection.db.collection("food_items");
         fetched_data.find({}).toArray(async function(err,data){


             const foodCategory = await mongoose.connection.db.collection("foodCategory");
               
             foodCategory.find({}).toArray(async function(err,catData){
                   if(err) console.log(err);
                   else{
                      global.food_items = data;
                      global.foodCategory = catData;
                   }
             })




         })
      }



   });



}


module.exports = mongoDB;
