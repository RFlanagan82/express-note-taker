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


// HTML Routes
// =============================================================

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});
// API Routes
// =============================================================

//Reads db.json file and displays all notes as JSON
app.get("/api/notes", function(req, res){
    return res.sendFile(path.join(__dirname, "db/db.json"));
    });


//Should receive a new note to save on request body, add it to db.json file and return the new note to the client.
app.post("/api/notes", function(req, res){
    //automatically destructures the array into strings and getting it from the body
    try{
        //new note needs to be read into the db.json array
        newNote = fs.readFileSync("./db/db.json", "utf8");
        console.log(newNote)
        //need to parse the values for the new Note 
        newNote = JSON.parse(newNote)
        //Create a new id for each note
        req.body.id = Math.ceil(Math.random() * 1000)
        //need to push the new note into the request body
        newNote.push(req.body);
        //need to stringify the newNote to be placed in the db.json array
        newNote = JSON.stringify(newNote);
        //write the new note to the db.json array
        fs.writeFile("./db/db.json", newNote, "utf8",function(err){
            if(err) throw err;
        });
        //provide the result for the user by parsing the new note values back
        res.json(JSON.parse(newNote));
    }   catch (error) {
        //console.log("Note wasn't added.")
        throw err;
    }
});

//grab the id created from the app.post(api/notes)function
app.delete("/api/notes/:id", function(req,res){

    try{
        //new note needs to be read by Filesystem package
        newNote = fs.readFileSync("./db/db.json", "utf8");
        //need to parse the newNote entry
        newNote = JSON.parse(newNote)
        //need to filter the entries by ID not by index order
        newNote = newNote.filter(function(note){
            return note.id != req.params.id
        });
        //need to stringify the note
        newNote = JSON.stringify(newNote)
        //need to update the file to remove the note
        fs.writeFile("./db/db.json", newNote, "utf8", function(err){
            if(err) throw err;
        });
        res.json(JSON.parse(newNote));

    } catch (err) {
        throw err;
    }
});
 

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  