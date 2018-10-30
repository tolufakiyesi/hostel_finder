var model = require('../models/HostelModel');
var _config = require('config.json')('./config/config.json');
// var api_url = _config.app_base;

module.exports = function(router, requireAuth) {
    router.get( '/hostels', function(req, res) {		
        model.findAll({limit: 20}, function(data){
            res.json(data);
        });							
    });
    router.post('/create', requireAuth, function(req, res) {

        var hostel = { authorId: req.user._id}
        if(req.body.location != null) hostel.location   = req.body.location;        
        if(req.body.lowerPriceRange != null) hostel.priceRange = {
                                                        lower: req.body.lowerPriceRange, 
                                                        higher: req.body.upperPriceRange };        
        if(req.body.address != null) hostel.address   = req.body.address;
        if(req.body.types != null) hostel.types   = JSON.stringify(req.body.types);
        if(req.body.numberOfRooms != null) hostel.numberOfRooms   = req.body.numberOfRooms.toString();

        model.save(hostel, function(state){
            if (state.error == true){
                var error = (state.message.errors ? state.message.errors: state.message.errmsg)
                res.json({error: error});
                res.end();
                return
            };
            model.findOne({conditions:{location:hostel.location}}, function(data){
                // res.json( {'url': _config.app_url+':'+_config.api._port+'/view/'+data._id});
                res.json( {'url': _config.app_url+'/view/'+data._id});
            })    
        });            
    });

    router.get( '/view/:id', function(req, res) {		
        model.findOne({conditions:{_id:req.params.id}}, function(data){
            res.json(data);
        });
    });

    router.post( '/testxz', function(req, res) {		
        var test = _config.app_base;
        
        console.log(test);
        // console.log(JSON.parse(test));
        res.end();
    });
    router.post( '/test1', function(req, res) {		
        console.log(req.body);
        res.send(req.body.varr)
    });

    
}
/* function isLoggedIn(req, res, next) {
    
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect(api_url+'/user/login');
} */