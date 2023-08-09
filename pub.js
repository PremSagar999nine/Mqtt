const mqtt = require('mqtt');

const mqttBroker = 'mqtt://mqtt.eclipseprojects.io';
const client = mqtt.connect(mqttBroker);

client.on('connect', () => {
    console.log('Connected to MQTT broker');

    setInterval(() => {
        const randNumber = Math.random() * (21.0 - 20.0) + 20.0;
        client.publish('TEMPERATURE', randNumber.toString());
        console.log(`Just published ${randNumber} to Topic TEMPERATURE`);
    }, 1000); // Publish every 1 second
});

client.on('error', (error) => {
    console.error('MQTT error:', error);
});

process.on('SIGINT', () => {
    client.end(() => {
        console.log('MQTT client disconnected');
        process.exit();
    });
});