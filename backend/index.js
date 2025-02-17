import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ImageKit from "imagekit";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "10mb",
  })
);

app.get("/api/upload", function (req, res) {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.listen(PORT, () => console.log("Server started on port 5000"));
