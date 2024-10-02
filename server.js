const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
// console.log(DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful');
  });

const tourScehma = new mongoose.Schema({
  name: { type: String, required: true },
  rating: Number,
  price: Number,
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on Port : ${port}...`);
});
