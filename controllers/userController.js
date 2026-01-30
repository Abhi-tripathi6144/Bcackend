const express = require("express");
const userModel = require("../models/userModel");

const register = async (req, res) => {
  try {
    const inputData = req.body;
    //Object.keys(inputdata)----> gives a set of keys we input in postman
    if (Object.keys(inputData).length === 0) {
      return res.json({
        status_code: 404,
        message: "pls provide proper data for registration",
      });
    }

    const checkData = await userModel.findOne({
      //code of mongo db $or ---> it will check once for all 3 data
      $or: [
        { email: inputData.email },
        { mobile_number: inputData.mobile_number },
        { aadhar_number: inputData.aadhar_number },
      ],
    });

    if (checkData) {
      return res.json({
        status_code: 404,
        message: "user alredy exisits",
      });
    }

    console.log(inputData);
    const storeDB = await userModel.create(inputData);
    //we use return cause if not then it will go beyond that and will find notthing and will give undefined
    return res.json({
      status_code: 200,
      message: "Registration Successfully",
      data: storeDB,
    });
  } catch (error) {
    console.log(error);
    return res.json({ status_code: 404, message: "Registration Failed" });
  }
};

const login = async (req, res) => {
  try {
    const inputData = req.body;
    if (Object.keys(inputData).length === 0) {
      return res.json({
        status_code: 404,
        message: "provide proper data for Login",
      });
    }

    const checkData = await userModel.findOne({ email: inputData.email });
    if (!checkData) {
      return res.status(404).json({ message: "Account Does not exist" });
    }

    if (checkData.password === inputData.password) {
      return res.status(200).json({ message: "loginned successfully!!!" });
    } else {
      return res.status(404).json({
        message: "Invalid Credentials"
      });
    }
  } catch (error) {

      return res.json({
        status:404,
        message:"Login Failed"
      }); 
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await userModel.findByIdAndDelete(id)
    if(deleteUser){
      return res.json({
        status_code: 200,
        message: "Deleted Successfully"
      })
    }
  } catch (error) {
    return res.status(404).json({
        status: 404,
        message: "User Notfound",
      });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Provide sufficient data",
      });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Data Updated Successfully",
      data: updatedUser,
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({ 
      message: "Updation Failed",
    });
  }
};


module.exports = { register, login, deleteUser, updateUser };
