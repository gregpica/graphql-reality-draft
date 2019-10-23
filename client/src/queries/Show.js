import { gql } from 'apollo-boost';

const getShowsQuery = gql`
{
    shows {
        name 
        id 
    }
}
`;

// Most encompassing query for Show in terms of data returned
const getShowQuery = gql`
    query($id: ID!) {
        show(id: $id) {
            id 
            name
            characters {
              id
              name
            }
        }
    }
`;

const getShowCharactersQuery = gql`
    query($showId: ID!) {
      show(id: $showId) {
        characters {
          id
          name
        }
      }
    }
`;

const addShowMutation = gql`
    mutation($name: String!) {
        addShow(name: $name) {
            id 
            name 
        }
    }
`;

const deleteShowMutation = gql`
    mutation($id: ID!) {
        deleteShow(id: $id) {
            id 
            name 
        }
    }
`;


export { getShowsQuery, getShowQuery, addShowMutation, deleteShowMutation, getShowCharactersQuery };