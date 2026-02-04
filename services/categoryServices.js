const mongoose = require('mongoose')
const categoryModel = require('../models/categoryModel')

const findCategory = async (name) => {
    return await categoryModel.findOne({name:name})
}

module.exports = {findCategory};