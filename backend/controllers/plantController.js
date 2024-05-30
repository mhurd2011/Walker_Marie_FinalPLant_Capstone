// backend/controllers/plantController.js
const asyncHandler = require('express-async-handler');
const Plant = require('../models/plantModel');

const getPlants = asyncHandler(async (req, res) => {
  const plants = await Plant.find({});
  res.json(plants);
});

const createPlant = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const plant = new Plant({ name, description });
  const createdPlant = await plant.save();
  res.status(201).json(createdPlant);
});

const updatePlant = asyncHandler(async (req, res) => {
  const plant = await Plant.findById(req.params.id);
  if (plant) {
    plant.name = req.body.name || plant.name;
    plant.description = req.body.description || plant.description;
    const updatedPlant = await plant.save();
    res.json(updatedPlant);
  } else {
    res.status(404);
    throw new Error('Plant not found');
  }
});

const deletePlant = asyncHandler(async (req, res) => {
  const plant = await Plant.findById(req.params.id);
  if (plant) {
    await plant.remove();
    res.json({ message: 'Plant removed' });
  } else {
    res.status(404);
    throw new Error('Plant not found');
  }
});

module.exports = { getPlants, createPlant, updatePlant, deletePlant };