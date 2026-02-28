const express = require("express");
const sellerModel = require("../models/sellerModel");
const sellerService = require("../services/sellerService");
const bcrypt = require("bcrypt");
const hashing = require("../utility/hashingPassword");


const createSeller = async (req, res) => {
  try {
    const inputData = req.body;
    if (Object.keys(inputData).length === 0) {
      return res.json({
        status_code: 404,
        message: "insufficient data",
      });
    }

    const checkData = await sellerService.findSeller({
      name: inputData.first_name,
      email: inputData.email,
      contact: inputData.mobile_number,
      aadhar: inputData.aadhar_number,
    });
    if (checkData) {
      return res.status(200).json({
        message: "seller already exists",
      });
    }

    const encriptedData = await hashing.doHash(inputData.password);
    const newData = { ...inputData, password: encriptedData };

    // console.log(encriptedData);
    const storeDB = await sellerModel.create(newData);

    return res.json({
      message: "seller registered",
      data: storeDB,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "seller registratoin failed",
    });
  }
};

const searchSeller = async (req, res) => {
  try {
    const inputData = req.body;
    if (Object.keys(inputData).length === 0) {
      return res.json({
        status_code: 404,
        message: "inSufficient data for Search",
      });
    }

    const checkData = await sellerModel.findOne({
      first_name: inputData.first_name,
      email: inputData.email,
      mobile_number: inputData.mobile_number,
      aadhar_number: inputData.aadhar_number,
    });
    console.log(checkData);
    if (!checkData) {
      return res.status(404).json({ message: "Seller Does not exist" });
    }

    return res.status(200).json({ message: "Seller found Successfully" });
  } catch (error) {
    console.log("read ERROR", error);

    return res.json({
      status: 404,
      message: "error in reading Error",
    });
  }
};

const updateSeller = async (req, res) => {
  try {
    const id = req.params.id;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Provide sufficient data for seller updation",
      });
    }

    const updatedSeller = await sellerModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedSeller) {
      return res.status(404).json({
        message: "seller not found",
      });
    }

    return res.status(200).json({
      message: "seller info Updated Successfully",
      data: updatedSeller,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: " seller Updation Failed",
    });
  }
};

const removeSeller = async (req, res) => {
  try {
    const id = req.params.id;
    const removeSeller = await sellerModel.findByIdAndDelete(id);
    if (removeSeller) {
      console.log(removeSeller);
      return res.json({
        message: "seller removed Successfully",
      });
    } else {
      return res.json({
        message: "seller not found",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      message: "error in deletion",
    });
  }
};

const getAllProductsOfASeller = async (req,res) => {
  try {
    const id = req.params.id;
    const getData = await sellerService.getAllProducts(id);
    console.log(getData);
    return res.send(getData);


  } catch (error) {
    console.log(error);
    return res.json({
      status_code: 404,
      message:"error in getAllProductsOfASeller"
    })
  }
}

const getProductWithSellerDetails = async(req,res) => {
  try {
    const id = req.params.id;
    const getData = await sellerService.getAllProductsWithSellerDetails(id);
    if(!getData){
      return res.status(404).json({
        message : "failed"
      })
    }
    return res.status(200).json({
      message:"successful",
      data:getData,
    })
  } catch (error) {
    console.log(error);
    return res.json({
      message:"error"
    })
  }
}

module.exports = { createSeller, searchSeller, updateSeller, removeSeller, getAllProductsOfASeller, getProductWithSellerDetails };
