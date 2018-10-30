// grab the user model
var Class = require('class.extend');
var Mongo = require('../libraries/Mongo');
var _activity_scheme = require('./schemas/hostel')

var mongoose = require('mongoose');

var BaseModel = Class.extend('BaseModel', {

    _instance: function(){
        return this;
    },

    init: function(schema,flag){
        this._schema = schema
        this._flag = flag.toLowerCase()
    },

    findAll: function (param, callback) {
        Mongo._get_bulk(this._schema, param, function (data) {
            return callback(data);
        });
    },

    findOne: function (param, callback) {
        Mongo._get(this._schema, param, function (data) {
            return callback(data);
        });
    },

    count: function(param,callback){
        Mongo._count(this._schema, param, function(data) {
            return callback(data)
        });
    },

    findAggregate: function(param,callback){
        Mongo._aggregriate(this._schema, param, function (data) {
            return callback(data);
        });
    },

    save : function(data, callback){
        var _flag = this._flag
        Mongo._save(this._schema(data),function (state) {
            if(_flag){
                data.flag =_flag
                // if(data.match_id != null) data_log.match_id = data.match_id
                // if(data.questions != null) data_log.question = data.question
                // if(data.options != null) data_log.options = data.options
                // if(data.answer != null) data_log.answer = data.answer
                Mongo._save(_activity_scheme(data),function(activitySave){})
            }
            return callback(state);
        });
    },

    save_multiple : function(data, callback){
        var _flag = this._flag
        Mongo._update_bulk(this._schema(data), {condition:{}}, data, function (state) {    
            Mongo._update_bulk(_activity_scheme(data),{condition:{}},data, function(activitySave){})            
            return callback(state);
        });
    },


    update: function (data,condition,callback){
        var _flag = this._flag
        Mongo._update(this._schema,condition,data,function(state){
            if(state){
                if(_flag){
                    var data_log = {flag:_flag,match_id:data.match_id,questions:data.questions}
                    Mongo._save(_activity_scheme(data_log),function(activitySave){})
                }
                return callback(state)
            }else
                return callback(false)
        });
    },


    del: function(identity,callback){
        var condition = {match_id:identity}
        var schema = this._schema
        Mongo._update(this._schema,condition,{del_flag:1},function(state){
            Mongo._delete(schema,condition,function(err){
                return callback(true)
            })
        })
    },

    search: function (param,callback){
        var options = {}
        if(param.from) options.from = param.from
        if(param.size) options.size = param.size
        if(param.sort) options.sort = param.sort
        if(param.aggs) options.aggs = param.aggs
        Mongo._search(this._schema,param.query,options,function(data){
            return callback(data);
        })
    },

    aggreg: function(param,callback){
        Mongo._aggregriate(this._schema,param,function(data){
            return callback(data)
        })
    },

    remove_bulK_id:function(ids,callback){
        Mongo._remove_bulK_id(this._schema,ids,function(data){
            return callback(data)
        })
    }

    // count: function(param,callback){
    //     Mongo._count(this._schema,param,function(data){
    //         return callback(data)
    //     })
    // }

});
module.exports = BaseModel;