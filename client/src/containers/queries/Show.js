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

export { getShowsQuery, getShowQuery };