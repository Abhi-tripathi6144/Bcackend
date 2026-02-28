const bcrypt = require("bcrypt");

const doHash = async (password) => {
    return await bcrypt.hash(password,10);
}
//10 is the salt value

module.exports = {doHash};
