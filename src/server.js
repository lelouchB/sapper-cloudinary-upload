import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
const bodyParser = require("body-parser");

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

polka() // You can also use Express
  .use(
    bodyParser.json({
      limit: "50mb",
      extended: true,
    }),
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
    }),

    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware()
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
