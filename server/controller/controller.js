const { query } = require("express");
var Userdb = require("../model/model");

//create and save new user

exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).sand({ message: "Content can not be emtpy!" });
    return;
  }

  //new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
    remark: req.body.remark,
  });

  // save user in the database
  user
    .save(user)
    .then((data) => {
      //res.send(data);
        res.redirect('/add-user')
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

//retrieve and return all users / retrive and return a single user

exports.find = (req, res) => {
  if ((req.query.id)) {

    const id = req.query.id

    Userdb.findById(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:"Not found user with id " + id})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error retrieving use with id " + id})
    })
  } else {

    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message:
              err.message || "Error Occurred while retriving user informetion",
          });
      });

  }
};

//Update
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot Update user with ${id}. Maybe user not found!`,
          });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
};

//Delete
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          messgae: "User was delete successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id = " + id,
      });
    });
};
