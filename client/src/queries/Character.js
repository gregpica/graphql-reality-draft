import { gql } from 'apollo-boost';

const addCharacterMutation = gql`
    mutation($showId: ID!, $name: String!, $image: String) {
        addCharacter(showId: $showId, name: $name, image: $image) {
            id 
            name 
            image 
        }
    }
`;

export { addCharacterMutation };