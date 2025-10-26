import express from "express";
import routes from "./routes.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";

const app = express();

try {
  await mongoose.connect("mongodb://localhost:27017", {
    dbName: "Myth-and-Legends",
  });
  console.log("Database connected successfully!");
} catch (err) {
  console.error("Cannot connect to database: ", err.message());
}

app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "src/views");

app.use(express.static("src/public"));

app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(3000, () =>
  console.log("Server is listening on http://localhost:3000...")
);
