const express = require("express");
const cors = require("cors");
const { getRouteDetails } = require("gmaps-route-scraper");
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ✅ Define a dynamic API route
app.get("/get-route", async (req, res) => {
  const { source, destination, mode } = req.body;

  if (!source || !destination || !mode) {
    return res.status(400).json({ error: "Missing required parameters: source, destination, mode" });
  }

  try {
    const route = await getRouteDetails(source, destination, mode);
    res.json(route);
  } catch (error) {
    console.error("Error fetching route:", error);
    res.status(500).json({ error: "Failed to fetch route details" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});