const { createClient } = require("redis");

const client = createClient();
client.on("error" , err => console.log("redisErrors : " , err.message));
client.on("connect" , () => console.log("connecting to redis ....."));
client.on("ready" , () => console.log("connected to redis Successfully"));
client.on("end" , () => console.log("disconnected from redis"));

module.exports = {
    redisClient : client
}