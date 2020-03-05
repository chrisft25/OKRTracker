const Pusher = require("pusher");
const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
});
app.get("/", (req, res) => {
  pusher.trigger(process.env.PUSHER_APP_CHANNEL, process.env.PUSHER_APP_EVENT, { task: "Resuelta", name: "Persona", img: "Perfil" });
  console.log("Debugging");
  res.send("Hello, World");
});

app.post("/", (req, res) => {
  pusher.trigger(process.env.PUSHER_APP_CHANNEL, process.env.PUSHER_APP_EVENT, req.body);
  console.log(req.body);
  res.json(req.body);
});

app.listen(8000, () => {

});
