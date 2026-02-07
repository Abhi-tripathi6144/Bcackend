const express = require('express');
const upload = require('../config/multer');

const uploadPDF = async (req, res) => {
    try {
        if(!req.file){
            return res.status(404).json({
                message: 'PDF file is required',
            })
        } 

        return res.status(201).json({
            message: "PDF uploaded Successfully",
            fileName: req.file.fileName,
            filePath: req.file.path,
        })
    } catch (error) {
        console.log(error);
        return res.json({
            message: "upload of pdf failed",
        })
    }
} 

module.exports = {uploadPDF};