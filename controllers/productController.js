const express = require('express');
const productModel = require('../models/productModel');
const productService = require('../services/productService');
const { default: mongoose } = require('mongoose');


const create = async (req,res) => {
    try {
        const inputData = req.body;
        if(Object.keys(inputData) === 0){
            return res.json({
                status_code: 404,
                messsage: "insufficient (product code) data for creation"
            })
        }
        const checkData = await productService.findProduct({name:inputData.product_code});
        if(checkData){
            console.log(checkData);
            return res.json({
                status_code: 404,
                message: "use a different code (already exists)"
            })
        }

        const storeDB = await productModel.create(inputData);
        return res.json({
            status_code: 200,
            message: "successfully (added) created",
            storeDB
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status_code:200,
            message:"creation failed"
        })
    }
}

const read = async (req, res) => {
  try {
    const inputData = req.body;
    if (Object.keys(inputData).length === 0) {
      return res.json({
        status_code: 404,
        message: "inSufficient data for read",
      });
    }

    const checkData = await productModel.findOne({ name: inputData.product_Code });
    if (!checkData) {
      return res.status(404).json({ message: "product Does not exist" });
    }

    if (checkData.name === inputData.name) {
        const name = checkData.name
      return res.status(200).json({message: "read Successfully",name:name})
    } else {
      return res.status(404).json({
        message: "invalid code cannot read"
      });
    }
  } catch (error) {

    console.log("read ERROR", error);

      return res.json({
        status:404,
        message:"error in reading Error",
      }); 
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Provide sufficient data for updation",
      });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    return res.status(200).json({
      message: "product Updated Successfully",
      data: updatedProduct,
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({ 
      message: " Product Updation Failed",
    });
  }
};

const _delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProduct = await productModel.findByIdAndDelete(id)
    if(deleteProduct){
      return res.json({
        status_code: 200,
        message: "Product Deleted Successfully"
      })
    }
  } catch (error) {
    return res.status(404).json({
        status: 404,
        message: "product Notfound",
      });
  }
};



module.exports = {create, read, update, _delete};