const express = require('express');

const register = async (req,res)=>{
    try {
        const inputData = req.body;
        console.log(inputData)
        //we use return cause if not then it will go beyond that and will find notthing and will give undefined
        return res.json({status_code:200, message:'Registration Successfully',data:inputData})
    } catch (error) {
        return res.json({status_code:404, message:'Registration Failed'})
    }
}
const login = ()=>{

}

module.exports = {register,login};