require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:3000" })); // Allow only frontend
app.use(express.json());

const API_KEY = process.env.API_KEY;
const CSE_ID = process.env.CSE_ID;

app.get("/search", async (req, res) => {  // Changed to GET
    try {
        const query = req.query.q; // Fix: Extract query from req.query
        if (!query) {
            return res.status(400).json({ error: "Query parameter is required" });
        }

        const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${API_KEY}&cx=${CSE_ID}`;
        const response = await axios.get(url);

        res.json(response.data.items || []);
    } catch (error) {
        console.error("Error fetching search results:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
