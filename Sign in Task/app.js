const express = require(`express`);
const app = express();
const path = require(`path`);
const user = require("./model/usermodel")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("signup");
})

app.post("/create", async (req, res) => {
    try {
        const { Name, email, username, password } = req.body;

        const existingUser = await user.findOne({ username });
        if (existingUser) {
            return res.status(400).send("Username already exists");
        }

        const CreateUser = await user.create({
            Name,
            email,
            username,
            password
        });

        console.log(CreateUser);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
});

app.get("/signin", (req, res) => {
    res.render("signin")
})

app.post("/read", async (req, res) => {
    try {
        const { username, password } = req.body;  
        if (!password || !username) {
            return res.status(400).send("password and username are required");
        }

        const foundUser = await user.findOne({ password, username });

        if (!foundUser) {
            return res.status(404).send("User not found");
        }

        res.render("read", { user: foundUser });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});


app.listen(3000, () => {

    console.log(" It Was Successfully Running In the 3000 Port : Running Process Done ")
})