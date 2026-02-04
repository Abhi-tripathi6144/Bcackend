const express = require('express');
const sellerModel = require('../models/sellerModel');
const sellerService = require('../services/sellerService')

const registerSeller = async (req,res) => {
    try {
        const inputData = req.body;
        if(Object.keys(inputData).length === 0){
            return res.json({
                status_code:404,
                message: "insufficient data"
            })
        }

        const checkData = await sellerService.findSeller({id:inputData.seller_id, name:inputData.shop_name, contact:inputData.contact_no});
        if(checkData){
            return res.status(200).json({
                message: "seller already exists"
            })
        }

        const storeDB = await sellerModel.create(inputData);

        return res.json({
            message: "seller registered",
            data: storeDB
        })
    } catch (error) {
        console.log(error);
        return res.json({
            message: "seller registratoin failed"
        })
    }
}

const searchSeller = async (req, res) => {
  try {
    const inputData = req.body;
    if (Object.keys(inputData).length === 0) {
      return res.json({
        status_code: 404,
        message: "inSufficient data for Search",
      });
    }

    const checkData = await sellerModel.findOne({seller_id:inputData.seller_id, shop_name:inputData.shop_name, contact_no:inputData.contact_no});
    if (!checkData) {
      return res.status(404).json({ message: "Seller Does not exist" });
    }

      return res.status(200).json({message: "Seller found Successfully"})
    
    
  } catch (error) {

    console.log("read ERROR", error);

      return res.json({
        status:404,
        message:"error in reading Error",
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

    const updatedSeller = await sellerModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

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

const removeSeller = async (req,res) => {
    try{
        const id = req.params.id;
        const removeSeller = await sellerModel.findByIdAndDelete(id);
        if(removeSeller){
            console.log(removeSeller);
            return res.json({
                message: "seller removed Successfully"
            })
        }else{
             return res.json({
                message: "seller not found"
            })
        }
    }catch(err){
        console.log(err);
        return res.json({
            message: "error in deletion"
        })
    }
}


module.exports = {registerSeller, searchSeller, updateSeller, removeSeller}