// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
//creates a port for the process to listen on
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


// Notes Data from db.json
// =============================================================

const noteTable = "db/db.json";
//const noteTable2 = require("./db/db.json");

// API Routes
// =============================================================

//Reads db.json file and displays all notes as JSON
app.get("/api/notes", function(req, res){
    fs.readFile(noteTable, "utf8", function(err, log){
        console.log(log)
        return res.sendFile(path.join(__dirname, "db/db.json"));
    });
    
});


//Should receive a new note to save on request body, add it to db.json file and return the new note to the client.
app.post("/api/notes", function(req, res){
    //automatically destructures the array into strings and getting it from the body
    try{
        newNote = fs.readFileSync("db/db.json", "utf8");
        newNote = JSON.parse(newNote)
        req.body.id = Math.ceil(Math.random() * 1000)
        newNote.push(req.body);
        newNote = JSON.stringify(newNote);
        fs.writeFile("db/db.json", newNote, "utf8",function(err){
            if(err) throw err;
        });
        res.json(JSON.parse(newNote));
    } catch (error) {
        console.log("Note wasn't added.")
    }
});
 
    





// HTML Routes
// =============================================================

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  