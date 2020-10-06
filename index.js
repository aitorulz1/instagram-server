const mongoose = require('mongoose');
const MONGODB_URI = process.env.BBDD || 'mongodb://localhost/instagram';
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./gql/schema');
const resolvers = require('./gql/resolver');

require('dotenv').config({path: '.env'});

mongoose.connect( MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => server())
.catch(error => console.error(`Un error ha ocurrido intentando conectar con ${MONGODB_URI}`, error));

function server() {
    const serverApollo = new ApolloServer({
        typeDefs,
        resolvers,
    });

    serverApollo.listen().then(({url}) => {
        console.log(`Servidor levantado en ${url}`);
    })
}