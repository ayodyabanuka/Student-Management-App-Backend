const router = require('express').Router();
const { request } = require('express');
const { update } = require('../Models/student');
let Student = require('../Models/student');

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const age = Number(req.body.age);
  const gender = req.body.gender;

  const newStudent = new Student({
    name,
    age,
    gender,
  });
  newStudent
    .save()
    .then(() => {
      res.json('Student Added');
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route('/').get((req, res) => {
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route('/update/:id').put(async (req, res) => {
  let userId = req.params.id;

  //destructure

  const { name, age, gender } = req.body;

  const updateStudent = {
    name,
    age,
    gender,
  };
  const update = await Student.findByIdAndUpdate(userId, updateStudent)
    .then((student) => {
      res.status(200).send({ status: 'User updated', user: student });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: 'error with updating data' });
    });
});

router.route('/delete/:id').delete(async (req, res) => {
  let userId = req.params.id;

  await Student.findByIdAndDelete(userId)
    .then(() => res.status(200).send({ status: 'User Deleted!' }))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: 'Error with deleting student' });
    });
});

router.route('/get/:id').get(async (req, res) => {
  let userId = req.params.id;
  const user = await Student.findById(userId)
    .then((student) => {
      res.status(200).send({ status: 'User', student: student });
    })
    .catch((err) => {
      res.status(500).send({ status: 'User Not Found' });
    });
});

module.exports = router;
