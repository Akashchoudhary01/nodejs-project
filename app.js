const express = require('express');
const { link } = require('fs');
const app = express();
const path = require('path');

const userModel = require('./models/user');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("index")
})
app.get('/read', async(req, res) => {;
    let allusers = await userModel.find()
    res.render("read", { users: allusers });
})

// Create user

app.post('/create', async(req, res) => {
    let { name, email, image } = req.body;
    let createdUser = await userModel.create({
        name,
        email,
        image
    });
    res.redirect("/read")

})

app.get('/delete/:id', async(req, res) => {
    let deleteUser = await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/read");
})

// edit user
app.get('/edit/:userid', async(req, res) => {
    let User = await userModel.findOne({ _id: req.params.userid });
    res.render("/edit", { User });
});

app.listen(8000, () => {
    console.log("Server Running In Port Number 8000");

})