import express from "express";
const app = express();
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static("public"));
app.set("view engine", "ejs");
const viewsPath = path.join(__dirname + "/public/views");
app.set("views", viewsPath);

app.get("/", (req, res) => {
  //   res.sendFile(__dirname+"/public/views/homepage.html")
  res.render("homepage", { title: "EJS || Homepage" });
});

app.get("/about", (req, res) => {
  // res.sendFile(__dirname+"/public/views/about.html")
  res.render("about");
});

app.get("/services", (req, res) => {
  res.render("services", {
    title: "EJS || Services",
    serviceList: ["Web-designing", "Digital marketing", "SEO", "App dev"],
  });
});

// middleware if no any route matches
app.use((req, res) => {
  res.render("not_found",{title:"EJS || Page not found"});
});
app.listen(3000, () => {
  console.log("Server started at port 3000");
});
