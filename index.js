// import apollo-server
const { ApolloServer, gql } = require('apollo-server');

const SessionAPI = require('./data-source/session');
const SpeakerAPI = require('./data-source/speakers');

/**
 * Three steps for now to create a graphql server, after installing all the dependencies,
 * 1. create a datasource/connect to a datasource and implement the service 
 * 2. use gql to create basic operation schemas
 * 3. use resolver to call the gql operations
 * 
 * After that, init the apolloserver and pass through the gql, resolvers and datasource
 */

// define the graphql query definitions
const typeDefs = gql`
    type Query{
        sessions: [Session]
        sessionById(id: ID): Session
        speakers: [Speaker]
        speakerById(id: ID): Speaker
    }
    type Speaker{
        id: ID!,
        bio: String,
        sessions:[Session],
        name: String
    }
    type Session {
        id: ID!,
        title: String!,
        description: String,
        startsAt: String,
        endsAt: String,
        room: String,
        day: String,
        format: String,
        track: String @deprecated(reason:"Version 1 is deprecated"),
        level: String
    }`


const resolvers = {
    Query: {
        sessions: (parent, args, {dataSources}, info) =>{
            return dataSources.SessionAPI.getSessions()
        },

        sessionById: (parent, {id}, {dataSources}, info) => {
            return dataSources.SessionAPI.getSessionById(id)
        },

        speakers: (parent, args, {dataSources}, info) => {
            return dataSources.SpeakerAPI.getSpeakers();
        }
    }
}

const dataSources = () => ({
    SessionAPI: new SessionAPI(),
    SpeakerAPI: new SpeakerAPI(),
})


// typeDefs -> the graphQL schema
// resolvers -> the controller function
// dataSources -> the service layer that interacts with data
const server = new ApolloServer({typeDefs, resolvers, dataSources,});

server.listen({port: process.env.PORT || 4000})
    .then(
        ({url}) => {
            console.log(`graphQL is running at ${url}`)
        }
    )