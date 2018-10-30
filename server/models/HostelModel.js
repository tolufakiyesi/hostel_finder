var Base = require('./BaseModel')
var schemaInit = require('./schemas/hostel')

var modelInit = Base.extend('Hostel_Model', {
    init: function(){
        this._super(schemaInit,"HOSTEL");
    }
})
module.exports = new modelInit()