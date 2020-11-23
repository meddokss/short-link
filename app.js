import express from "express";
import config from "config";
import mongoose from "mongoose";

import router from "./routes/auth.routes";
import link from "./routes/link.routes";
import redirect from "./routes/redirect.routes";

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/auth", router);
app.use("/api/link", link);
app.use("/t/", redirect);

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
}

start();

app.listen(PORT, () => console.log(`App has been started...!!${PORT}`));
