const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const dotenv = require("dotenv");
const KiteConnect = require("kiteconnect").KiteConnect;
const cors = require("cors");
dotenv.config();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/access", async (req, res) => {
  const { token } = req.body;
  const kc = new KiteConnect({
    api_key: process.env.API_KEY,
  });
  let user = {};
  kc.getOrders();
  kc.generateSession(token, process.env.API_SECRET)
    .then((res) => {
      console.log(res);
      user = res;
    })
    .catch((err) => console.log(err));
  res.json(user);
});

app.listen(PORT, () => console.log("Server Started"));
