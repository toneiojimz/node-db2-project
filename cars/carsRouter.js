const express = require('express');
const cars = require('./carsDb.js');


const router = express.Router();

router.get("/", (req, res) => {
    cars.get()
        .then(cars => {
            return res.status(200).json(cars);
        })
        .catch(err => {
            res.status(500).json({message: "failed to retrieve cars"})
        });
});


router.get("/:id", (req, res) => {
    const { id } = req.params;
    
   cars.getById(id)
        .then(car => {
            return res.status(200).json(car);
        })
        .catch(err => {
            res.status(500).json({ message: "failed to retrieve car" });
        });
});



router.post('/', (req, res) => {
    

    cars.insert(req.body)
    .then(response => {
        return res.status(201).json(response);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "car not added" })
    })
})


router.delete('/:id', (req, res) => {
    const id = req.params.id

    cars.remove(id)
    .then(() => {
        return res.status(200).json({ message: "car was deleted" })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "car not deleted" })
    })
})

module.exports = router;