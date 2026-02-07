const bcrypt = require("bcrypt");

const doHash = async (password) => {
    return await bcrypt.hash(password,10);
}

module.exports = {doHash};
