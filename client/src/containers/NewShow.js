import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import AddCharacters from '../components/NewShow/AddCharacters';
import CharacterList from '../components/Shared/CharacterList';
import Character from '../components/Shared/CharacterList/Character';
import { addCharacterMutation } from '../queries/Character';
import { getShowCharactersQuery } from '../queries/Show';


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
          doneAddingCharacters: false,
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

    handleDoneAddingCharacters = () => this.setState({ doneAddingCharacters: true });

    redirectToShowsSelectedPage = showId => (
      <Redirect to={{ pathname: `/show/${showId}` }} />
    )
 
    render() {
      const { showName, showId } = this.props.location.state;
      const { invalidAddMessage, characterName, doneAddingCharacters } = this.state;

      return (
        <Wrapper>
          <ShowName>{showName}</ShowName>
          <AddCharacters
            header="Add Characters..."
            handleAddCharacter={this.saveCharacter}
            handleNameChange={this.handleNameChange}
            nameValue={characterName}
            errorMessage={invalidAddMessage}
            handleDoneClick={this.handleDoneAddingCharacters}
          />
          {this.getShowCharacters()} 
          { doneAddingCharacters ? this.redirectToShowsSelectedPage(showId) : null}
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