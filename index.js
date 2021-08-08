// import apollo-server
const { ApolloServer, gql } = require('apollo-server');

const SessionAPI = require('./data-source/session')

// define the graphql query definitions
const typeDefs = gql`
    type Query{
        sessions:[Session]
        sessionById(id: ID): Session
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
        }
    }
}

const dataSources = () => ({
    SessionAPI: new SessionAPI()
})

// typeDefs -> the graphQL schema
// resolvers -> the controller function
// dataSources -> the service layer that interacts with data
const server = new ApolloServer({typeDefs, resolvers, dataSources});

server.listen({port: process.env.PORT || 4000})
    .then(
        ({url}) => {
            console.log(`graphQL is running at ${url}`)
        }
    )