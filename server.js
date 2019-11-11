var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/UsersDB", function (err) {
    if (err) {
        console.log("Error: " + err);
    } else {
        console.log("Connected to mongoose");
    }
});
//mongoose schema for new user
var User = mongoose.model("User", {
    email: String,
    username: String,
    password: String,
    playlist: []
});
//mongoose schema for new video
var Video = mongoose.model("Video", {
    title: String,
    category: String,
    description: String,
    link: String
});
//request to register new user
app.post("/register", function (request, response) {
    User.findOne({
        email: request.body.email
    }).exec(function (err, user) {
        if (err) {
            console.log("Error: " + err);

        } else if (user) {
            response.send("Email exists");
        } else {
            var newUser = new User(request.body);
            newUser.save();
            response.status(201);
            response.send(newUser);
            console.log("New User");
        }
    });
});
//request to login user
app.get("/login/:email/:password", function (request, response) {
    User.findOne({
        email: request.params.email,
        password: request.params.password
    }).exec(function (err, user) {
        if (err) {
            console.log("Error: " + err);
        } else if (user) {
            response.send("user");
            console.log(user + "\nlogged in");

        } else {
            response.status(204);
            response.send("No User");
        }
    });
});
//request to add new song
app.post("/addSong", function (request, response) {
    User.findOne({
        email: request.body.email
    }).exec(function (err, user) {
        if (err) {
            console.log("Error: " + err);
        } else if (user) {
            var newVideo = new Video(request.body);
            user.playlist.push(newVideo);
            user.save();
            response.status(201);
            response.send(newVideo);
            console.log(newVideo);
        } else {
            response.status(204);
            response.send("No User");
        }
    });

});
//request to get users playlist
app.get("/playlist/:email", function (request, response) {
    User.findOne({
        email: request.params.email
    }).exec(function (err, user) {
        if (err) {
            console.log("Error: " + err);
        } else if (user) {
            response.status(200);
            var info = {
                username: user.username,
                playlist: user.playlist
            }
            response.send(info);
            console.log("playlist sent");
        } else {
            response.status(204);
            console.log(request.params.email);
        }
    });
});
//request to song details
app.get("/songDetails/:email/:_id", function (request, response) {
    User.findOne({
        email: request.params.email
    }).exec(function (err, user) {
        if (err) {
            console.log("Error: " + err);
        } else if (user) {
            var playlist = user.playlist;
            var songId = request.params._id
            for (var i = 0; i < playlist.length; i++) {
                if (playlist[i]._id == songId) {
                    response.status(200);
                    response.send(playlist[i]);
                    console.log(playlist[i]);
                }
            }
        } else {
            response.status(204);
            console.log(request.params._id);
        }
    });
});

//request to update song
app.put("/updateSong/:email/:_id", function (request, response) {
    User.findOne({
        email: request.params.email
    }).exec(function (err, user) {
        if (err) {
            console.log("Error: " + err);
        } else if (user) {
            for (var i = 0; i < user.playlist.length; i++) {
                if (user.playlist[i]._id == request.params._id) {
                    console.log("In Loop");
                    user.playlist[i].title = request.body.title;
                    user.playlist[i].category = request.body.category;
                    user.playlist[i].description = request.body.description;
                    user.playlist[i].link = request.body.link;
                    user.markModified("playlist");
                    break;
                }
            }
            user.save();
            console.log("Saved");
            response.send(user);
        } else {
            response.status(204);
            console.log(request.params._id);
        }
    });
});
//request to delete song
app.delete("/deleteVideo/:email/:_id", function (request, response) {
    User.findOne({
        email: request.params.email
    }).exec(function (err, user) {
        if (err) {
            console.log("Error: " + err);
        } else if (user) {
            for (var i = 0; i < user.playlist.length; i++) {
                if (user.playlist[i]._id == request.params._id) {
                    user.playlist.splice(i, 1);
                    user.save();
                }
            }
            response.send(user);
        } else {
            response.status(204);
            console.log("not deleted");
        }
    });
});


app.listen(3000, function () {
    console.log("Listening on http://localhost:3000");
});