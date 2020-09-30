// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
//creates a port for the process to listen on
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Notes Data from db.json
// =============================================================

require("./develop/db/db.json")(app);


// Need an array to create note ids that will be used to delete them later
// =============================================================
noteId = []


// HTML Routes
// =============================================================

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});


// API Routes
// =============================================================

//Reads db.json file and displays all notes as JSON
// app.get("/api/notes", function(req, res){
//     res.readFile(db.json);
//     return res.json(db.json);
// });


//Should receive a new note to save on request body, add it to db.json file and return the new note to the client.
// app.post("/api/notes", function(req, res){
//     const newNote = req.body;
//     const noteId = newNote[i];

//     console.log(newNote, noteId);

//     db.json.push(newNote);

//     res.json(newNote);
// })








// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  