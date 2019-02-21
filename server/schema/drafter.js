const db = require('./psqlAdapter');

const typeDef = `
    extend type Query {
        drafter(id: ID!): Drafter
    }

    type Drafter {
        id: ID!
        name: String!
        image: String
        characters(showId: ID = null): [Character!]!
    }
`;

const resolvers = {
    Query: {
        drafter: (parent, args) => {
            const drafterQuery = `SELECT * FROM "drafters" WHERE id=${args.id}`;
            return db.one(drafterQuery)
                .then(data => {
                    return data;
                })    
        }

    },
    Drafter: {
        characters: (parent, args) => {
            let drafterCharactersQuery = `SELECT * FROM "characters" WHERE "drafterId"=${parent.id}`;

            if(args.showId) {
                drafterCharactersQuery += ` AND "showId"=${args.showId}`;
            } 
            return db.manyOrNone(drafterCharactersQuery)
                .then(data => {
                    return data;
                })
        }
    }
};


module.exports = {
    Drafter: typeDef,
    drafterResolvers: resolvers
};