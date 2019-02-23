const db = require('./psqlAdapter');
const defaultImage = 'https://www.qualiscare.com/wp-content/uploads/2017/08/default-user.png';

const typeDef = `
    extend type Query {
        drafter(id: ID!): Drafter
    }

    extend type Mutation {
        addDrafter(name: String!, image: String = "${defaultImage}", color: String!): Drafter
        editDrafter(id: ID!, name: String!, image: String!, color: String!): Drafter
        deleteDrafter(id: ID!): Drafter
    }

    type Drafter {
        id: ID!
        name: String!
        image: String
        color: String!
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
    Mutation: {
        addDrafter: (parent, args) => {
            const addDrafterQuery = `INSERT INTO drafters(name, image, color) VALUES ('${args.name}', '${args.image}', '${args.color}') RETURNING *`;
            return db.one(addDrafterQuery)
                .then(data => {
                    return data 
                })
        },
        editDrafter: (parent, args) => {
            const editDrafterQuery = `UPDATE drafters SET "name" = '${args.name}', "image" = '${args.image}', "color" = '${args.color}' WHERE "id" = ${args.id} RETURNING *`;
            return db.one(editDrafterQuery)
                .then(data => {
                    return data
                })
        },
        deleteDrafter: (parent, args) => {
            const deleteDrafterQuery = `DELETE FROM drafters WHERE "id" = ${args.id} RETURNING *`;
            return db.one(deleteDrafterQuery)
                .then(data => {
                    return data
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