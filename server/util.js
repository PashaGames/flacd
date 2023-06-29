const crypto = require('crypto');

function generateToken(username){
    return btoa(crypto.createHash("sha256").update(`${+new Date()}.${username}.${+new Date()+(Math.floor(Math.random()*100000)-50000)}`).digest("hex"))
}

function hashPassword(password){
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}
const CARD_DELAY = 8640000;
const FACTOR = [1,1,3,7,45,90,360,1000];
function calculateDate(card){
    let date = new Date();
    date.setTime(date.getTime()+ FACTOR[card.priority] * CARD_DELAY)
    return date;
}
module.exports = {generateToken,hashPassword,calculateDate}