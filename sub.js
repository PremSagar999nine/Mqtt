const mqtt = require('mqtt');

const mqttBroker = 'mqtt://mqtt.eclipseprojects.io';
const client = mqtt.connect(mqttBroker);

client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe('TEMPERATURE');
});

client.on('message', (topic, message) => {
    console.log(`Received message: ${message.toString()}`);
});

process.on('SIGINT', () => {
    client.end(() => {
        console.log('MQTT client disconnected');
        process.exit();
    });
});