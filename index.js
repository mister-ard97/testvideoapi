var express = require("express"),
  http = require("http");
var app = express();
var server = http.createServer(app);
var io = require("socket.io").listen(server);
const port = 2021;
const bodyParser = require("body-parser");
const cors = require("cors");
const bearerToken = require("express-bearer-token");
const fs = require("fs");
const multipart = require("connect-multiparty");

app.use(
  multipart({
    maxFieldsSize: "900MB",
  })
);

app.use(bodyParser.json());
app.use(cors());

app.io = io;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(bearerToken());

const { workshopOnlineCoursesRouter } = require("./routers");

app.use("/workshopOnline", workshopOnlineCoursesRouter);

app.get("/", (req, res) => {
  res.status(200).send(`<p>Welcome To Test Video API</p> | Development Only`);
});

server.listen(port, () => console.log("listen on port " + port));
