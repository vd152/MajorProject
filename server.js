const express = require('express');
const app = express();
var cors = require('cors')
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const PORT = 5500

app.use(
    express.urlencoded({
      extended: false,
    })
);
app.use(express.json());
app.use(cors())


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

app.get('/', (req,res)=>{
    res.send("API Working")
})

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})