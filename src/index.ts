import express, { json, urlencoded } from "express";
import productRouter from "./routes/products";
import authRouter from "./routes/auth";

const PORT = process.env.PORT || 3002;
const app = express();

app.use(urlencoded({ extended: false }));
app.use(json())

app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.use("/products", productRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
