// backend/routes/plantRoutes.js
const express = require('express');
const { getPlants, createPlant, updatePlant, deletePlant } = require('../controllers/plantController');
const router = express.Router();

router.route('/').get(getPlants).post(createPlant);
router.route('/:id').put(updatePlant).delete(deletePlant);

module.exports = router;

// SO ANNOYING: An error code was being thrown here that said "already included file name differs from file name only in casing" which was confusing me because I checked like 15 times to make sure I was calling "plantModel" the correct thing with the correct casing. But I kept getting the same error. I searched on-line and found https://stackoverflow.com/questions/51197940/file-name-differs-from-already-included-file-name-only-in-casing-on-relative-p which told me to just close vscode completely and it should clear. Thankfully that worked!//

// Get all plants
router.get('/', async (req, res) => {
  try {
    const plants = await Plant.find({});
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new plant
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const plant = new Plant({ name, description });
    const createdPlant = await plant.save();
    res.status(201).json(createdPlant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;