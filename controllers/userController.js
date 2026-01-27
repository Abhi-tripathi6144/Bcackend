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

    const checkEmail = await userModel.findOne({email:inputData.email});
    const checkMobile = await userModel.findOne({mobile_number:inputData.mobile_number});
    const checkAadhar = await userModel.findOne({aadhar_number:inputData.aadhar_number});

    if(checkEmail || checkAadhar || checkMobile){
        return res.json({
            status_code:404,
            message:"user alredy exisits"
        })
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
const login = () => {};

module.exports = { register, login };
