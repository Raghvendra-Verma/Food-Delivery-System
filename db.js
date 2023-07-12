const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');


dotenv.config({ path: ".env" });
mongoose.set('strictQuery',false);

const mongoDB = async () => {
    await mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(async () => {
            console.log('database connected'.bgMagenta);
            //command for reading the data from the collection
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray( async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err , catData){
                    if (err) {
                        console.log(err);
                    }
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                })
            })

        })
        .catch((error) => console.log(`${error} did not connect`));
}

module.exports = mongoDB;

