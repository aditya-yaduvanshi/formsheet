require("dotenv").config();
const express = require("express"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  fileUpload = require("express-fileupload"),
  bodyParser = require("body-parser"),
  app = express(),
  path = require("path"),
  PORT = process.env.PORT || 5000,
  HOST = process.env.HOST || "0.0.0.0",
  MONGO_URI = process.env.MONGO_URI,
  { forms, responses } = require("./routes");

app.use(
  cors((req, callback) => {
    let corsOptions,
      allowlist = ["https://formsheet.up.railway.app"];
    if (allowlist.indexOf(req.header("Origin")) !== -1) {
      corsOptions = { origin: true };
    } else {
      corsOptions = { origin: false };
    }
    callback(null, corsOptions);
  })
);
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    createParentPath: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/forms", forms);
app.use("/api/responses", responses);
app.use("/static", express.static("static"));
app.use(express.static("build"));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"))
);

mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((_conn) => {
    console.log("db connected");
    app.listen(PORT, HOST, () => console.log("listening on port", PORT));
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
