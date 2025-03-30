import express from "express";

const PORT = process.env.PORT || 3002;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
