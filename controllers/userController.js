const express = require("express");
const userModel = require("../models/userModel");
const {configDotenv} = require('dotenv')
const hashing = require("../utility/hashingPassword");
const bcrypt = require("bcrypt");

const userService = require("../services/userService");
const {generateOTP} = require("../utility/generateOTP");
const generateToken = require("../utility/createToken");

configDotenv()

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

    const checkData = await userService.findUser({email: inputData.email,mobile: inputData.mobile, aadhar: inputData.aadhar});

    if (checkData) {
      return res.json({
        status_code: 404,
        message: "user alredy exisits",
      });
    }

    const encriptedData = await hashing.doHash(inputData.password);
    const newData = {...inputData, password:encriptedData}


    // console.log(encriptedData);
    const storeDB = await userModel.create(newData);
    //we use return cause if not then it will go beyond that and will find notthing and will give undefined
    return res.json({
      status_code: 200,
      message: "Registration Successfully",
      data: storeDB,
    });
  } catch (error) {
    console.log("register error : ",error);
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
    const flag = await bcrypt.compare(inputData.password, checkData.password)
    if (flag == true) {
      const token = generateToken.generateToken(checkData.email, checkData._id)
      // console.log('token',token);

      return res.status(200).json({message: "loggedin Successfully", token: token})
    } else {
      return res.status(404).json({
        message: "Invalid Credentials"
      });
    }
  } catch (error) {

    console.log("LOGIN ERROR", error);

      return res.json({
        status:404,
        message:"Internal Server Error",
      }); 
  }
};

const loginWithOTP = async (req,res) => {
  try {
    const inputData = req.body;
    if(Object.keys(inputData) === 0){
      return res.status(404).json({message: "Provide number to login"});
    }

    const checkData = await userModel.findOne({mobile_number: inputData.mobile_number})

    if(!checkData){
      return res.status(404).json({message: "Account Does Not Exists"});
    }

    const otp = generateOTP();
    // console.log(otp);
    return res.status(200).json({message: "OTP Sent successfully", data: otp})

  } catch (error) {
      return res.json({
        status_code: 404,
        message: "Internal Server Error",
      })
  }
}

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


module.exports = { register, login, deleteUser, updateUser, loginWithOTP};
