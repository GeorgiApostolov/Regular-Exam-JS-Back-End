import express from "express";
import routes from "./routes.js";

const app = express();

app.use(express.static("src/public"));

app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(3000, () =>
  console.log("Server is listening on http://localhost:3000...")
);
