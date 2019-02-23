const db = require('./psqlAdapter');

const typeDef = `
    extend type Mutation {
        addRule(showId: ID!, name: String!, points: Int!): Rule
        editRule(id: ID!, name: String!, points: Int!): Rule
        deleteRule(id: ID!): Rule 
    }

    type Rule {
        id: ID!
        name: String!
        points: Int!
    }
`;

const resolvers = {
    Mutation: {
        addRule: (parent, args) => {
            const addRuleQuery = `INSERT INTO rules("showId", name, points) VALUES ('${args.showId}', '${args.name}', '${args.points}') RETURNING id, name, points`;
            return db.one(addRuleQuery)
                .then(data => {
                    return data 
                })
        },
        editRule: (parent, args) => {
            const editRuleQuery = `UPDATE rules SET "name"= '${args.name}', "points" = '${args.points}' WHERE "id" = ${args.id} RETURNING *`;
            return db.one(editRuleQuery)
                .then(data => {
                    return data 
                })
        },
        deleteRule: (parent, args) => {
            const deleteRuleQuery = `DELETE FROM rules WHERE "id" = ${args.id} RETURNING *`;
            return db.one(deleteRuleQuery)
                .then(data => {
                    return data
                })
        }
    }
}

module.exports = {
    Rule: typeDef,
    ruleResolvers: resolvers
};