const mongoose = require("mongoose"); //for connecting to mongodb
const express = require("express"); //to run the server
const app = express(); //create instance of the  express
const fs = require("fs"); //file service. for file operations
const path = require("path"); //file path mangager
const conn = mongoose.connection;
app.use("/public", express.static(path.join(__dirname, "public"))); // Serve static files
const cors = require("cors"); //cross origin
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const Music = require("./models/songs.model.js");
const Movies = require("./models/movies.model.js");
const Playlist = require("./models/playlist.model.js");

app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://dbuser:thisisahardpassword@songs.st8lejn.mongodb.net/songs?retryWrites=true&w=majority&appName=songs"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("failed to connect to database");
  });
app.get("/", (req, res) => {
  res.send("ggs");
});

// get song by id(required)
app.get("/api/getsong/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Music.findById(id);
    if (!data) {
      return res.status(404).json({ message: "song not found" });
    }
    const filepath = path.join(__dirname, "/public", data.songpath);
    fs.access(filepath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ message: "File not found" });
      }

      // Set appropriate headers for streaming
      res.writeHead(200, {
        "Content-Type": "audio/mpeg", // Adjust for different file types
        "Accept-Ranges": "bytes", // Enable byte-range requests for partial content
        "Content-Length": fs.statSync(filepath).size, // Set content length
      });

      // Create a read stream for the music file
      const fileStream = fs.createReadStream(filepath);

      // Pipe the read stream to the response object for streaming
      fileStream.pipe(res);

      // Handle errors during streaming (optional)
      fileStream.on("error", (err) => {
        console.error("Error streaming file:", err);
        res.status(500).end(); // Send error response
      });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// get song and update
app.put("/api/music/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const music = await Music.findByIdAndUpdate(id, req.body);
    if (!music) {
      res.status(404).json({ message: "song not found" });
    }
    const rechek = await Music.findById(id);
    res.status(200).json(rechek);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// #getsongbyid

// apiparametrstogetsong
app.get("/api/music/:id", async (req, res) => {
  try {
    const music = await Music.findById(req.params.id);
    res.status(200).json(music);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// send data to databse(required)
app.post("/api/music", async (req, res) => {
  try {
    const fullpath = path.join(__dirname, "public", req.body.imgpath);
    const imageData = fs.readFileSync(fullpath);

    // Convert binary data to base64 string
    const base64String = Buffer.from(imageData).toString("base64");

    req.body.imgpath = base64String;
    const music = await Music.create(req.body);

    res.status(200).json(music);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// get all data(required)
app.get("/api/allget", async (req, res) => {
  const data = await Music.find({});

  res.status(200).json(data);
});

// Initialize GridFS stream
let gfs;

// Create storage engine using multer-gridfs-storage
app.post("api/movies", async (req, res) => {
  filepath = fs.join(__dirname, "public", req.body.moviepath);
  try {
    let idd;
    const readstream = fs.createReadStream(filepath);
    const writestream = gfs.openUploadStream(req.body.moviename);
    readstream.pipe(writestream);
    writestream.on("error", (error) => {
      console.error("Error uploading file:", error);
      res.status(500).send("Error uploading file");
    });

    writestream.on("finish", () => {
      res.status(200).send("File uploaded successfully");
      idd = writestream().id;
    });

    req.body.moviepath = idd;
    const upload = await Movies.create(req.body);
    res.status(200).json(upload);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});
// Initialize multer with GridFS storage engine

app.post("/api/movies", async (req, res) => {
  try {
    const fullpath = path.join(__dirname, "public", req.body.imgpath);
    const imageData = fs.readFileSync(fullpath);

    // Convert binary data to base64 string
    const base64String = Buffer.from(imageData).toString("base64");

    req.body.imgpath = base64String;
    const music = await Movies.create(req.body);

    res.status(200).json(music);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/getmovies", async (req, res) => {
  try {
    const data = await Movies.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/playlists", async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API to get songs details in a playlist by playlist ID
app.get("/api/playlist/:id", async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (playlist) {
      // Here you would fetch details of songs from another collection based on song IDs
      // For simplicity, I'm just returning the list of song IDs
      res.json(playlist.listOfSongs);
    } else {
      res.status(404).json({ message: "Playlist not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API to add a song to a playlist
app.put("/api/playlist/onlysong", async (req, res) => {
  try {
    const playlist = await Playlist.findOne({ playlistName: req.body.name });
    if (playlist) {
      playlist.details.push(req.body.details);
      playlist.numberOfSongs = playlist.details.length;
      await playlist.save();
      res.status(201).json(playlist);
    } else {
      res.status(404).json({ message: "Playlist not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API to create a new playlist

app.listen(8080, () => {
  console.log("server listening on port 8080");
});

app.post("/api/playlist/addsong", async (req, res) => {
  const { name } = req.body;
  const response = {
    playlistName: name,
    numberOfSongs: 0,
    details: [req.body.details], // Storing song IDs
  };
  try {
    const data = await Playlist.create(response);
    res.status(201).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.get("/api/plalylists/getall", async (req, res) => {
  try {
    const data = await Playlist.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.get("/api/playlists/onlylists", async (req, res) => {
  try {
    const names = [];

    const playlists = await Playlist.find({});
    for (let i = 0; i < playlists.length; i++) {
      names.push(playlists[i].playlistName);
    }
    res.status(200).json(names);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.get("/api/getmovie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Movies.findById(id);
    if (!data) {
      return res.status(404).json({ message: "song not found" });
    }
    const filepath = path.join(__dirname, "/public", data.moviepath);
    fs.access(filepath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ message: "File not found" });
      }

      // Set appropriate headers for streaming
      res.writeHead(200, {
        "Content-Type": "video/mp4", // Adjust for different file types
        "Accept-Ranges": "bytes", // Enable byte-range requests for partial content
        "Content-Length": fs.statSync(filepath).size, // Set content length
      });

      // Create a read stream for the music file
      const fileStream = fs.createReadStream(filepath);

      // Pipe the read stream to the response object for streaming
      fileStream.pipe(res);

      // Handle errors during streaming (optional)
      fileStream.on("error", (err) => {
        console.error("Error streaming file:", err);
        res.status(500).end(); // Send error response
      });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

let users = [];
const filepath = "users.json";
const usersFilePath = path.join(__dirname, "/public", filepath);
try {
  users = JSON.parse(fs.readFileSync(usersFilePath));
} catch (err) {
  console.error("Error reading users file:", err);
}

// API endpoint for user login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// API endpoint for adding a new user
app.post("/api/adduser", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  // Check if the username already exists
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ error: "Username already exists" });
  }

  // Add the new user to the array
  users.push({ username, password });
  // Write the updated user array to the JSON file
  fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.error("Error writing users file:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(201).json({ message: "User added successfully" });
  });
});
