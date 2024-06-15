import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from 'url';

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




const API_URL="https://v2.jokeapi.dev/joke/";

const app = express();
const port = 3000;
app.set("view engine", "ejs");
// app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { content: "Choose Joke Category" });
  });

app.post("/getJoke", async (req, res) => {
    const selectedCategories = req.body.categories;
    console.log(selectedCategories);
    
    if (!selectedCategories || selectedCategories.length === 0) {
        return res.status(400).json({ error: 'No categories selected' });
    }
    try{
        
        let category;
        if (Array.isArray(selectedCategories)) {
            category = selectedCategories.join(',');
        } else {
            category = selectedCategories;
        }
       
    const result = await axios.get(API_URL + category + "?type=single");
    res.render("index.ejs", { content: result.data.joke});
    }catch(error){
        console.error('Error fetching joke:', error);
        res.status(500).json({ error: 'Failed to fetch joke' });
    }

});




app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
  });