const multer = require("multer");
const path = require('path');
const fs = require('fs');
//current working dir --- process.cwd()
//folder name -- uploads
//saftly join path-- path.join
const uploadDir = path.join(process.cwd(), "uploads");
if(!fs.existsSync(uploadDir)){
    fs.mkdir(uploadDir,{recursive: true})
}
//create parent folder if needed --- recursive: true

//cb(error, file/work/name)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'application/pdf') {
        cb(null, true);
    }else{
        cb(new Error("Only pdf allowed"),false);
    }
} 

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter
}) 

module.exports = upload;