
const { Trello } = require("trello-for-wolves");

const Pusher = require("pusher");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const { GoogleSpreadsheet } = require("google-spreadsheet");

const trello = new Trello({
  key: process.env.TRELLO_KEY,
  token: process.env.TRELLO_TOKEN,
});

const app = express();

app.use(bodyParser.json());

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
});
app.get("/", async (req, res) => {
  pusher.trigger(process.env.PUSHER_APP_CHANNEL, process.env.PUSHER_APP_EVENT, { task: "Resuelta", name: "Persona", img: "Perfil" });
  res.send("Hello world");
});

app.post("/", async (req, res) => {
  const cardData = await (await trello.cards(req.body.action.data.card.id).getCards()).json();
  const { idList, idMembers, name } = cardData;
  const listName = (await (await trello.lists(idList).getFieldValue("name")).json())._value;
  if (listName !== "Done") {
    res.send("No");
  } else if (idMembers.length <= 0) {
    res.send("Nel");
  } else {
    const memberData = (await (await trello.members(idMembers[0]).getMember()).json());
    const { fullName, username } = memberData;

    const doc = new GoogleSpreadsheet("16FfRrQbqHqAlx9kUNeudDOzQf5kAGYIznf4GlRX_G8U");
    doc.useApiKey(process.env.GOOGLE_KEY);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    const main_img = rows.map((row) => ({ username: row._rawData[0], img: row._rawData[1] }));
    const usernames = [];
    const images_for_card = [];
    main_img.map((value) => {
      if (usernames.indexOf(value.username) === -1) {
        usernames.push(value.username);
        images_for_card.push({ username: value.username, img: [] });
      }
      images_for_card[usernames.indexOf(value.username)].img.push(value.img);
    });


    const sheet2 = doc.sheetsByIndex[1];
    const rows2 = await sheet2.getRows();
    const main_img2 = rows2.map((row) => ({
      username: row._rawData[0], r: row._rawData[1], g: row._rawData[2], b: row._rawData[3], img: row._rawData[4],
    }));
    const usernames2 = [];
    const images_for_bg = [];
    main_img2.map((value) => {
      if (usernames2.indexOf(value.username) === -1) {
        usernames2.push(value.username);
        images_for_bg.push({ username: value.username, data: [] });
      }
      images_for_bg[usernames2.indexOf(value.username)].data.push({
        r: value.r, g: value.g, b: value.b, img: value.img,
      });
    });


    let img_user = images_for_card.filter((val) => val.username === username)[0];
    img_user = img_user.img[Math.floor(Math.random() * img_user.img.length)];

    let bg_user = images_for_bg.filter((val) => val.username === username)[0];
    bg_user = bg_user.data[Math.floor(Math.random() * bg_user.data.length)];

    req.body.img_user = img_user;
    req.body.bg_user = bg_user;

    const finalData = {
      name: fullName,
      username,
      img_user,
      bg_user,
      task: name,
    };
    pusher.trigger(process.env.PUSHER_APP_CHANNEL, process.env.PUSHER_APP_EVENT, finalData);
    console.log(finalData);
    res.json(finalData);
  }
});

app.listen(8000, () => {
  console.log("Running on 8000");
});
