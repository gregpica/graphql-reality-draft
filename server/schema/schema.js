const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const { Show, showResolvers } = require('./show.js');
const { Drafter, drafterResolvers } = require('./drafter.js');
const { Character, characterResolvers } = require('./character.js');
const { EpisodeScore, episodeScoreResolvers } = require('./episodeScore.js');
const { Rule, ruleResolvers } = require('./rule.js')

const Query = `
    type Query {
        _empty: String
    }
`;

const Mutation = `
    type Mutation {
        _empty: String
    }
`;
 
module.exports = makeExecutableSchema({
    typeDefs: [Query, Mutation, Show, Drafter, Character, EpisodeScore, Rule],
    resolvers: [showResolvers, drafterResolvers, characterResolvers, episodeScoreResolvers, ruleResolvers]
});



