import express from "express";
import routes from "./routes.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import { authMiddleware } from "./middlewares/authMiddleware.js";

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
    helpers: {
      setTitle(title) {
        this.pageTitle = title;
      },
      getTitle() {
        return this.pageTitle || "Myth and Legends";
      },
      formatDate(date) {
        if (!date) return "";
        const d = new Date(date);
        return d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "src/views");

app.use(express.static("src/public"));

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.use(authMiddleware);

app.use(routes);

app.listen(3000, () =>
  console.log("Server is listening on http://localhost:3000...")
);
