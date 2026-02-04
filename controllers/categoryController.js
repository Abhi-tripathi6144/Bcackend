const express = require('express');
const categoryModel = require('../models/categoryModel')
const categoryService = require('../services/categoryServices')

const registerCategory = async (req,res) => {
    try {
        const inputData = req.body;
        if(Object.keys(inputData).length === 0){
            return res.json({
                status_code:404,
                message: "insufficient data"
            })
        }

        const checkData = await categoryService.findCategory(inputData.name);
        if(checkData){
            return res.status(200).json({
                message: "category already exists"
            })
        }

        const storeDB = await categoryModel.create(inputData);

        return res.json({
            message: "category registered",
            data: storeDB
        })
    } catch (error) {
        console.log(error);
        return res.json({
            message: "category registratoin failed"
        })
    }
}

const searchCategory = async (req, res) => {
  try {
    const inputData = req.body;
    if (Object.keys(inputData).length === 0) {
      return res.json({
        status_code: 404,
        message: "inSufficient data for Category",
      });
    }

    const checkData = await categoryService.findCategory(inputData.name);
    if (!checkData) {
      return res.status(404).json({ message: "category Does not exist" ,checkData});
    }

      return res.status(200).json({message: "category found Successfully"})
    
    
  } catch (error) {

    console.log("read ERROR", error);

      return res.json({
        status:404,
        message:"error in reading category",
      }); 
  }
};

const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Provide sufficient data for category updation",
      });
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        message: "category not found",
      });
    }

    return res.status(200).json({
      message: "category info Updated Successfully",
      data: updatedCategory,
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({ 
      message: " category Updation Failed",
    });
  }
};

const deleteCategory = async (req,res) => {
    try{
        const id = req.params.id;
        const removeCategory = await categoryModel.findByIdAndDelete(id);
        if(removeCategory){
            console.log(removeCategory);
            return res.json({
                message: "category removed Successfully"
            })
        }else{
             return res.json({
                message: "category not found"
            })
        }
    }catch(err){
        console.log(err);
        return res.json({
            message: "error in category deletion"
        })
    }
}




module.exports = {registerCategory, searchCategory, updateCategory, deleteCategory};