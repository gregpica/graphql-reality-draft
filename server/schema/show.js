const db = require('./psqlAdapter');

const typeDef = `
    extend type Query {
        show(id: ID!): Show
    }

    extend type Mutation {
        addShow(name: String!): Show
        editShowName(id: ID!, name: String!): Show
        deleteShow(id: ID!): Show
    }

    type Show {
        id: ID!
        name: String!
        characters: [Character!]!
        rules: [Rule!]!
    }
`;

const resolvers = {
    Query: {
        show: (parent, args) => {
            const showQuery = `SELECT * FROM "shows" WHERE id=${args.id}`;
            return db.one(showQuery)
                .then(data => {
                    return data;
                })     
        }
    },
    Mutation: {
        addShow: (parent, args) => {
            const addShowQuery = `INSERT INTO shows(name) VALUES ('${args.name}') RETURNING id, name`;
            return db.one(addShowQuery)
                .then(data => {
                    return data
                })           
        },
        editShowName: (parent, args) => {
            const editShowNameQuery = `UPDATE shows SET "name" = '${args.name}' WHERE "id" = ${args.id} RETURNING *`;
            return db.one(editShowNameQuery)
                .then(data => {
                    return data
                })           
        },
        deleteShow: (parent, args) => {
            const deleteShowQuery = `DELETE FROM shows WHERE "id" = ${args.id} RETURNING *`;
            return db.one(deleteShowQuery)
                .then(data => {
                    return data
                })    
        }
    },
    Show: {
        characters: (parent) => {
            const showCharactersQuery = `SELECT * FROM "characters" WHERE "showId"=${parent.id}`;
            return db.manyOrNone(showCharactersQuery)
                .then(data => {
                    return data;
                })
        },
        rules: (parent) => {
            const showRulesQuery = `SELECT * FROM "rules" WHERE "showId"=${parent.id}`;
            return db.manyOrNone(showRulesQuery)
                .then(data => {
                    return data;
                })    
        }
    }
};

module.exports = {
    Show: typeDef,
    showResolvers: resolvers
};