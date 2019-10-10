import { gql } from 'apollo-boost';

const getShowsQuery = gql`
{
    shows {
        name 
        id 
    }
}
`;

const getShowQuery = gql`
    query($id: ID!) {
        show(id: $id) {
            id 
            name 
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


export { getShowsQuery, getShowQuery, addShowMutation, deleteShowMutation };