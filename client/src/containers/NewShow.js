import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import AddCharacters from '../components/NewShow/AddCharacters';
import { addCharacterMutation } from '../queries/Character';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ShowName = styled.h2``;

class NewShow extends Component {
    constructor(props){
        super(props);
        this.state = {
          characterName: null,
        }
    }

    handleFieldChange = ({ target: { value }}, fieldName) => this.setState({ [fieldName]: value });

    saveCharacter = () => {
      const { characterName } = this.state;
      const { showId } = this.props.location.state;
      this.props.addCharacterMutation({
        variables: {
            showId: showId,
            name: characterName,
        }
      }).then(res => {
         console.log(res.data.addCharacter);
      });
    }

    render() {
      const { showName } = this.props.location.state;
      console.log(this.state)
      return (
        <Wrapper>
          <ShowName>{showName}</ShowName>
          <AddCharacters
            header="Add Characters..."
            handleAddCharacter={this.saveCharacter}
            handleFieldChange={e => this.handleFieldChange(e, 'characterName')}
          />
        </Wrapper>
      );
    }
}

export default compose(
  graphql(addCharacterMutation, { name: 'addCharacterMutation' })
)(NewShow);