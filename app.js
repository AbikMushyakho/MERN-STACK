import express from "express";
import passport from "passport";
import "dotenv/config";
import "./auth.js";
import session from "express-session";

const { SESSION_SECRETE_KEY } = process.env;
const app = express();

app.use(
  session({
    secret: SESSION_SECRETE_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const validateLogin = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

app.get("/", (req, res) => {
  res.send("<a href='auth/google'>Signup with google</a>");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/error",
  })
);

app.get("/dashboard", validateLogin, (req, res) => {
  res.send("<h6>This is dashboard page...</h6><br><a href='/dashboard/logout'>Logout</a>");
});

app.get("/auth/error", (req, res) => {
  res.send("Some error occurred!!!");
});

app.get('/dashboard/logout',(req,res)=>{
    req.logout((err)=>{
        if(err) throw err;
        else{
            
            req.session.destroy();
            res.redirect("/");
        }
    })
})

app.listen(3000, () => {
  console.log("server listning on port 3000");
});
