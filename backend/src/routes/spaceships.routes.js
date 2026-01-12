const { Router } = require("express");
const path = require("path");
const fs = require("fs");

const router = Router();

router.get("/spaceships", (_req, res) => {
  const filePath = path.join(__dirname, "..", "data", "spaceships.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const ships = JSON.parse(raw);

  // Requisito: retornar listado de 10 naves
  res.json(ships.slice(0, 10));
});

module.exports = router;
