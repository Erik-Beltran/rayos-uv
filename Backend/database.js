const mongoose = require('mongoose')

const URI = 'mongodb://localhost/rayos-uv'


mongoose.connect(URI)
.then(db=> console.log("DB is conected"))
.catch(err=> console.log(err));

module.exports = mongoose;
