import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();


router.get("/", async (req, res) => {
  let collection = await db.collection("ApprovedEvents");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});


router.get("/:id", async (req, res) => {
  let collection = await db.collection("ApprovedEvents");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      category: req.body.category,
      time: req.body.time,
      location: req.body.location,
      image: req.body.image,
      starCount: 0
    };
    let collection = await db.collection("ApprovedEvents");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding ApprovedEvent");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        category: req.body.category,
        time: req.body.time,
        location: req.body.location,
        image: req.body.image,
        starCount: req.body.starCount
      },
    };

    let collection = await db.collection("ApprovedEvents");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating ApprovedEvent");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("ApprovedEvents");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting ApprovedEvent");
  }
});

export default router;