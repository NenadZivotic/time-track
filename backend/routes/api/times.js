const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Time = require("../../models/Time");

router.get("/", (req, res) => {
  Time.find((err, times) => {
    if (err) {
      console.log(err);
    }

    res.json(times);
  });
});

router.get("/:id", (req, res) => {
  Time.findById(req.params.id, (err, time) => {
    if (err) {
      console.log(err);
    }

    res.json(time);
  });
});

router.post("/add", (req, res) => {
  let time = new Time(req.body);
  time
    .save()
    .then((time) => {
      res.status(200).json({ msg: "Time added" });
    })
    .catch((err) => {
      res.status(400).send("Failed to create time");
    });
});

router.post(
  "/update/:id",
  [
    check("from", "Start date is required").not().isEmpty(),
    check("to", "End date is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("title", "Title is required").not().isEmpty(),
    check("author", "Author is required").not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    Time.findById(req.params.id, (err, time) => {
      if (!time) {
        return new Error("Could not find time");
      } else if (err) {
        console.log(err);
      } else {
        time.title = req.body.title;
        time.author = req.body.author;
        time.description = req.body.description;
        time.from = req.body.from;
        time.to = req.body.to;

        time
          .save()
          .then((time) => {
            res.status(200).json({ msg: "Time updated" });
          })
          .catch((err) => {
            res.status(400).send("Failed to update time");
          });
      }
    });
  }
);

router.delete("/:id", (req, res) => {
  Time.findByIdAndRemove({ _id: req.params.id }, (err, time) => {
    if (err) {
      res.json(err);
    }

    res.json({ msg: "Time removed successfully" });
  });
});

module.exports = router;
