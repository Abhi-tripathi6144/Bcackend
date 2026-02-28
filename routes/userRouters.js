const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth')

const userController = require('../controllers/userController');

router.get('/', (req,res) => {
    res.send('Hello Bhopal')
})

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/login-with-otp',userController.loginWithOTP)
router.post('/update/:id',protect , userController.updateUser)
router.post('/delete/:id', userController.deleteUser)


module.exports = router;