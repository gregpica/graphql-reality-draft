const db = require('./psqlAdapter');

const typeDef = `
    extend type Mutation {
        addRule(showId: ID!, name: String!, points: Int!): Rule
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
        }
    }
}

module.exports = {
    Rule: typeDef,
    ruleResolvers: resolvers
};