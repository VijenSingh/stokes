const express = require("express");
const cors = require("cors");
const app = express();
const https = require("https");
const fs = require("fs");
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const users = require("./users");

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/stoke", async (req, res) => {
  users.push(req.body);
  fs.writeFile("users.json", JSON.stringify(users), (err) => {
    if (err) throw err;

    console.log("Done writing"); // Success
  });
  console.log(req.body);
});

app.get("/details", (req, res) => {
  fs.readFile("./users.json", "utf-8", (err, data) => {
    newData = JSON.parse(data);

    console.log(newData);
    res.send(newData);
  });
});

// if(process.env.NODE_ENV== "production"){
// app.use(express.static("front-end/build"));
// const path =require("path");
// app.get("*", (req, res) =>{
// res.sendFile(path.resolve(__dirname, 'front-end', 'build', 'index.html ));
// })
// }

if (process.env.NODE_ENV == "production") {
  app.use(express.static("front-end/build"));
}

app.listen(PORT, () => {
  console.log(`app running at port ${PORT}`);
});
