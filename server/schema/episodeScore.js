const db = require('./psqlAdapter');

const typeDef = `
    extend type Mutation {
        addEpisodeScore(showId: ID!, characterId: ID!, number: Int!, points: Int!): EpisodeScore
        editEpisodeScore(id: ID!, points: Int!): EpisodeScore
    }

    type EpisodeScore {
        id: ID!
        number: Int!
        points: Int!
    }
`;

const resolvers = {
    Mutation: {
        addEpisodeScore: (parent, args) => {
            const addEpisodeScoreQuery = `INSERT INTO episode_scores("showId", "characterId", number, points) VALUES ('${args.showId}', '${args.characterId}', '${args.number}', '${args.points}') RETURNING id, number, points`;
            return db.one(addEpisodeScoreQuery)
                .then(data => {
                    return data 
                })
        },
        editEpisodeScore: (parent, args) => {
            const editEpisodeScoreQuery = `UPDATE episode_scores SET "points" = '${args.points}' WHERE "id" = ${args.id} RETURNING *`;
            return db.one(editEpisodeScoreQuery)
                .then(data => {
                    return data 
                })   
        }
    }
};

module.exports = {
    EpisodeScore: typeDef,
    episodeScoreResolvers: resolvers
};
