var crypto = require("crypto");

function md5(str){
    // 指定加密的方式
    var m5 = crypto.createHash("md5");
    return m5.update(str).digest("hex");
}



module.exports = {
    md5:md5,
}
