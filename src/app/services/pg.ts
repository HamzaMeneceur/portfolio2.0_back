import pg from 'pg';

const { Client } = pg;

const client = new Client();
console.log('5')
client.connect();

export default client;

