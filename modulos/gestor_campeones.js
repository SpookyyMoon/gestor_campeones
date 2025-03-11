const fs = require('fs');
//Data
const data = JSON.parse(fs.readFileSync('../campeones.json', 'utf8'));
const campeones = data.CAMPEONES;      


//Export functiones
module.exports = {};