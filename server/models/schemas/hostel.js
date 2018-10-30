const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var _config = require('config.json')('./config/config.json');
var _collection = _config.mongodb.collections;

const Hostel = new Schema({    
        location: {type: String, required: true},
        priceRange    : {
                lower : {type: String, required: true},
                upper: {type: String}
        },
        address   : {type: String, required: true, unique: true},
        types     : {type: String, required: true},
        numberOfRooms: {type: String, default: '1'},        
        authorId  : {type: String, required: true},
        date_added: {type: Date, default: Date.now}    
});



module.exports = mongoose.model(_collection.hostels, Hostel);
