"use strict";

const http = require("http");
const {parse} = require("querystring");

const server = http.createServer((req, res) => {
    if(req.url==="/"){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Node Server</title></head>');
        res.write('<body><form action="/friend" method="POST"><input type="text" name="name"><input type="text" name="name2"><button type="submit">Search</button></form></body>');
        res.write('</html>');
        res.end();
    }else if(req.method==="POST" && req.url==="/friend"){
        let reqJSON;
        let body = [];
        req.on('data', (segment) => {
            body.push(segment);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            reqJSON = parse(body);
        })
    }   
});

server.listen(2323, 'localhost');

class twitterListener{
    constructor(keyword_, trackingDuration_){
        this.keyword = keyword_;
        this.trackingDuration = trackingDuration_;
    }

    trackTweets(){
        const Twitter = require("node-tweet-stream")
        , t = new Twitter({
            consumer_key: 'DnXz3QBEptjCkSCXoKmj690GQ',
            consumer_secret: '08KQEcV5oSROZR3EvQzMKeH9fxlqn05tK0bl4rpNuVtgDJUqLX',
            token: '1122433281465700352-bPVkrTzBiwMyenSqHfePpi2QNU4t3e',
            token_secret: 'IEqjQrY1FKpfSQ4p0XITpedbZEyHQZRK9UK9ZxtwfVWG9'
        })
    
        t.on('tweet', function(tweet){
            console.log('tweet received', tweet);
        })
    
        t.track(this.keyword); 
        setTimeout(t.untrack(this.keyword), this.trackingDuration);   
    }
}