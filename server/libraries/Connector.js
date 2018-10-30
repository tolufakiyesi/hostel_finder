var _config = require('config.json')('./config/config.json');

var Connector = {
    _redis: null,
    _mongo: null,
    _elastic: null,
    _rabbit: null,
    _aws_s3: null,
    _ssh: null,
    /**
     * @return {null}
     */
    Redis: function () {
        if(Connector._redis == null){
            var redis = require('redis');
            Connector._redis = redis.createClient(_config.redis.port, _config.redis.host);
            if(_config.redis.password != "") {
                Connector._redis.auth(_config.redis.password, function () {
                    ////console.debug('Authenticated...');
                });
            }

            Connector._redis.select(_config.redis.db,function(err,resp){
                    ////console.debug(resp);
                });

            Connector._redis.on('error', function(err) {
                //console.debug('Error Connecting: '+err);
            });
        }
        return Connector._redis;
    },
    

    MongoDB: function(){
        if(Connector._mongo == null) {
            var mongoose = require('mongoose');
            Connector._mongo = mongoose.connection;

            Connector._mongo.on('error', console.error);
            Connector._mongo.once('open', function () {
            });
            // var url = 'mongodb://' + _config.mongodb.host + ':' + _config.mongodb.port + '/' + _config.mongodb.db;
            var url = 'mongodb://' + _config.mongodb.username+':'+ _config.mongodb.password+'@' + _config.mongodb.host + ':' + _config.mongodb.port + '/' + _config.mongodb.db;
            // var url = "mongodb://heroku_4gshc1l0:hl47k1p8vnv20e20gs3m1m2ihc@ds123790.mlab.com:23790/heroku_4gshc1l0";
            
            mongoose.Promise = global.Promise;
            // mongoose.connect('mongodb://localhost/hostel');           
            mongoose.createConnection(url);
        }
        return Connector._mongo;
    },


    Elastic: function(){
        if(Connector._elastic == null){
            var elastic = require('elasticsearch');
            Connector._elastic = new elastic.Client({
                'host':_config.elastic.host+":"+_config.elastic.port,
                'log':_config.elastic.log_info,
                'requestTimeout': 30000000, // Tested
                'keepAlive': true, // Tested
                'apiVersion':_config.elastic.api_version
            });
        }
        return Connector._elastic;
    },

    RabbitMQ: function(){
        if(Connector._rabbit == null){
            var rabbit = require('amqplib');
            Connector._rabbit = rabbit.connect('amqp://'+_config.rabbit.user+':'+_config.rabbit.pass+'@'+_config.rabbit.host+':'+_config.rabbit.port);

            //console.debug()
        }
        return Connector._rabbit;
    },

    AWSConnect: function(){
        if(Connector._aws_s3 == null){
            var AWS = require('aws-sdk');
            Connector._aws_s3 = new AWS.S3({accessKeyId:_config.access_key,
                    secretAccessKey:_config.secret_key
                }
            );
        }
        return Connector._aws_s3
    },

    SSHClient: function (){
        if(Connector._ssh == null){
            var Client = require('ssh2').Client;
                Connector._ssh = new Client();
                Connector._ssh.connect({
                    host: _config.ftp.host,
                    port: _config.ftp.port,
                    username: _config.ftp.username,
                    password: _config.ftp.password
                });
        }
        return Connector._ssh;
    }
}


module.exports = Connector;
