import express from "express";
import routes from "./routes.js";
import handlebars from "express-handlebars";

const app = express();

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
