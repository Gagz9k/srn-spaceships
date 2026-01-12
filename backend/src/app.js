const express = require("express");
const cors = require("cors");

const spaceshipsRoutes = require("./routes/spaceships.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use(spaceshipsRoutes);

module.exports = app;
