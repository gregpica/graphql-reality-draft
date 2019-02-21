const graphql = require('graphql');
const db = require('./psqlAdapter');

const { 
    GraphQLObjectType,
    GraphQLID, 
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInt
} = graphql;

const ShowType = new GraphQLObjectType({
    name: 'Show',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        characters: {
            type: new GraphQLList(CharacterType), 
            resolve(parent, args) {
                const showCharactersQuery = `SELECT * FROM "characters" WHERE "showId"=${parent.id}`;
                return db.manyOrNone(showCharactersQuery)
                    .then(data => {
                        return data;
                    })
            }
        },
        rules: {
            type: new GraphQLList(RuleType),
            resolve(parent, args) {
                const showRulesQuery = `SELECT * FROM "rules" WHERE "showId"=${parent.id}`;
                return db.manyOrNone(showRulesQuery)
                    .then(data => {
                        return data;
                    })
            }
        }

    })
})

const DrafterType = new GraphQLObjectType({
    name: 'Drafter',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        image: {type: GraphQLString},
        characters: {
            type: new GraphQLList(CharacterType),
            //Optionally return drafter's characters for a specific show
            args: {showId: {type: GraphQLID}},
            resolve(parent, args) {
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
    })
})

const CharacterType = new GraphQLObjectType({
    name: 'Character',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        image: {type: GraphQLString},
        show: {
            type: ShowType,
            resolve(parent, args) {
                const characterShowQuery = `SELECT * FROM "shows" WHERE id=${parent.showId}`;
                return db.one(characterShowQuery)
                    .then(data => {
                        return data;
                })            
            }
        },
        drafter: {
            type: DrafterType,
            resolve(parent, args) {
                const drafterShowQuery = `SELECT * FROM "drafters" WHERE id=${parent.drafterId}`;
                return db.one(drafterShowQuery)
                    .then(data => {
                        return data;
                })            
            }
        },
        episodeScores: {
            type: new GraphQLList(EpisodeScoreType),
            resolve(parent, args) {
                const drafterEpisodeScoresQuery = `SELECT * FROM "episode_scores" WHERE "characterId"=${parent.id}`;
                return db.manyOrNone(drafterEpisodeScoresQuery)
                    .then(data => {
                        return data;
                    })
            }
        },
        totalPoints: {
            type: GraphQLInt,
            resolve(parent, args) {
                const drafterEpisodeScoresQuery = `SELECT * FROM "episode_scores" WHERE "characterId"=${parent.id}`;
                return db.manyOrNone(drafterEpisodeScoresQuery)
                    .then(data => {
                      let totalPoints= 0;
                      data.forEach(epi => totalPoints += epi.points);
                      return totalPoints;
                    })

            }
        }
    })
})

const EpisodeScoreType = new GraphQLObjectType({
    name: 'EpisodeScore',
    fields: () => ({
        id: {type: GraphQLID},
        number: {type: GraphQLInt},
        points: {type: GraphQLInt},

    })
})

const RuleType = new GraphQLObjectType({
    name: 'Rule',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        points: {type: GraphQLInt}
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
        },
        drafter: {
            type: DrafterType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                const drafterQuery = `SELECT * FROM "drafters" WHERE id=${args.id}`;
                return db.one(drafterQuery)
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