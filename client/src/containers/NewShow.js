import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import AddCharacters from '../components/NewShow/AddCharacters';
import CharacterList from '../components/Shared/CharacterList';
import Character from '../components/Shared/CharacterList/Character';
import { addCharacterMutation, getShowCharactersQuery } from '../queries/Character';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ShowName = styled.h2``;

class NewShow extends Component {
    constructor(props){
        super(props);
        this.state = {
          characterName: "",
          invalidAddMessage: null,
        }
    }

    handleNameChange = ({ target: { value }}) => {
      this.setState({ characterName: value });

      const { invalidAddMessage } = this.state;
      if ( invalidAddMessage && value && invalidAddMessage.split(' ')[0] !== 'Error!' ) {
        this.setState({ invalidAddMessage: null })
      }
    };

    saveCharacter = () => {
      const { characterName, invalidAddMessage } = this.state;
      const { showId } = this.props.location.state;
      if ( characterName && showId ) {
        this.props.addCharacterMutation({
          variables: {
              showId: showId,
              name: characterName,
          },
          refetchQueries: [{ query: getShowCharactersQuery, variables: { showId } }]
        }).then(res => {
          if (invalidAddMessage) {
            this.setState({ invalidAddMessage: null });
          }
          this.setState({ characterName: "" })
          console.log(res.data.addCharacter);
        });
      } else {
        const invalidAddMessage = characterName ? "Error! There is no new show associated with the character you are trying to add!" :
        "Hold up! Please enter a name for the character you are trying to add!";
        this.setState({ invalidAddMessage });
      }
    }

    getShowCharacters = () => {
      const { show } = this.props.getShowCharactersQuery;
      if (show) {
          return (
            <CharacterList>
              {
                show.characters.map(character => <Character key={character.id} name={character.name}/>)
              }
            </CharacterList>
          )
      }
    }
 
    render() {
      const { showName } = this.props.location.state;
      const { invalidAddMessage, characterName } = this.state;
      console.log(this.props)
      return (
        <Wrapper>
          <ShowName>{showName}</ShowName>
          <AddCharacters
            header="Add Characters..."
            handleAddCharacter={this.saveCharacter}
            handleNameChange={this.handleNameChange}
            nameValue={characterName}
            errorMessage={invalidAddMessage}
          />
          {this.getShowCharacters()}
        </Wrapper>
      );
    }
}

export default compose(
  graphql(getShowCharactersQuery, { 
    options: props => {
      const { showId } = props.location.state;
      return {
        variables: {
            showId
        }
      }
    },
    name: 'getShowCharactersQuery' 
  }),
  graphql(addCharacterMutation, { name: 'addCharacterMutation'}),
)(NewShow);