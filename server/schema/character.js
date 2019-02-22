const db = require('./psqlAdapter');
const defaultImage = 'https://cdn2.vectorstock.com/i/1000x1000/75/21/silly-face-vector-467521.jpg'; 

const typeDef = `
    extend type Mutation {
        addCharacter(showId: ID!, name: String!, image: String = "${defaultImage}"): Character
    }

    type Character {
        id: ID!
        name: String!
        image: String
        show: Show 
        drafter: Drafter
        episodeScores: [EpisodeScore!]!
        totalPoints: Int
    }
`;

const resolvers = {
    Mutation: {
        addCharacter: (parent, args) => {
            const addCharacterQuery = `INSERT INTO characters("showId", name, image) VALUES ('${args.showId}', '${args.name}', '${args.image}') RETURNING id, name, image`;
            return db.one(addCharacterQuery)
            .then(data => {
                return data 
            })    
        }
    },
    Character: {
        show: (parent) => {
            const characterShowQuery = `SELECT * FROM "shows" WHERE id=${parent.showId}`;
            return db.one(characterShowQuery)
                .then(data => {
                    return data;
            })     
        },
        drafter: (parent) => {
            const drafterShowQuery = `SELECT * FROM "drafters" WHERE id=${parent.drafterId}`;
            return db.one(drafterShowQuery)
                .then(data => {
                    return data;
            })                
        },
        episodeScores: (parent) => {
            const drafterEpisodeScoresQuery = `SELECT * FROM "episode_scores" WHERE "characterId"=${parent.id}`;
            return db.manyOrNone(drafterEpisodeScoresQuery)
                .then(data => {
                    return data;
                })    
        },
        totalPoints: (parent) => {
            const drafterEpisodeScoresQuery = `SELECT * FROM "episode_scores" WHERE "characterId"=${parent.id}`;
            return db.manyOrNone(drafterEpisodeScoresQuery)
                .then(data => {
                  let totalPoints= 0;
                  data.forEach(epi => totalPoints += epi.points);
                  return totalPoints;
                })       
        }
    }
};

module.exports = {
    Character: typeDef,
    characterResolvers: resolvers
};