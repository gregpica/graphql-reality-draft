const graphql = require('graphql');
const db = require('./psqlAdapter');

const { 
    GraphQLObjectType,
    GraphQLID, 
    GraphQLString,
    GraphQLSchema
} = graphql;

const ShowType = new GraphQLObjectType({
    name: 'Show',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        show: {
            type: ShowType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                const showQuery = `SELECT * FROM "shows" WHERE id=${args.id}`;
                return db.one(showQuery)
                    .then(data => {
                        return data;
                    })
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});