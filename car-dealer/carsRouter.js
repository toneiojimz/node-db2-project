const express = require('express');
const knex = require('knex');

const knexConfiguration ={
    client: "sqlite3",

    connection: {
        filename: "./data/car-dealer.db3"
    },
    useNullAsDefault: true, // only for sqlite

};

const db = knex(knexConfiguration);

const router = express.Router();

router.get("/", (req, res) => {
    db("cars")
        .then(cars => {
            res.json(cars);
        })
        .catch(err => {
            res.status(500).json({message: "failed to retrieve cars"})
        });
});


router.get("/:id", (req, res) => {
    const { id } = req.params;
    
    db("cars")
        // .where({ id: id })
        .where("id", "=", id)
        .first()
        .then(car => {
            res.json(car);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to retrieve car" });
        });
});


router.post("/", (req, res) => {
    const carData = req.body;
    db("cars")
        .insert(carData) // with SQLite, by default it returns an array with the last id
        .then(ids => {
            db("cars")
                .where({ id: ids[0] })
                .then(newCar => {
                    res.status(201).json(newCar);
                });
        })
        .catch(err => {
            console.log("POST error", err);
            res.status(500).json({ message: "Failed to store data" });
        });
});

module.exports = router;