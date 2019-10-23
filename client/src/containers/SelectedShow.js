import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { getShowQuery, deleteShowMutation, getShowsQuery } from '../queries/Show';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ShowDetails from '../components/SelectedShow/ShowDetails';
import CharacterList from '../components/Shared/CharacterList';
import Character from '../components/Shared/CharacterList/Character';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
`;

const DeleteButton = styled.div`
  width: 150px;
  height: 40px;
  background-color: #ed7474;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  cursor: pointer;
`;

class SelectedShow extends Component {
  constructor(props){
      super(props);
      this.state = {
        deletedShow: false,
      }
  }

  clearPath = () => (
    <Redirect to={{ pathname: '/' }} />
  )

  getShowDetails = () => {
      const { show } = this.props.getShowQuery;
      if (show) {
        const { id, name, characters } = show;
        return (
          <ShowDetails id={id} name={name}>
            <CharacterList>
                {
                  characters.map(character => <Character key={character.id} name={character.name}/>)
                }
            </CharacterList>
          </ShowDetails>
        )
      } else {
        return "Loading show details...."
      } 
  }

  handleDeleteShow = showId => {
    confirmAlert({
      title: 'Are you sure you want to delete this draft?',
      message: 'All data will be lost!',
      buttons: [
        {
          label: 'Yes',
          onClick: () => { 
            this.props.deleteShowMutation({
              variables: {
                  id: showId
              },
              refetchQueries: [{ query: getShowsQuery }]
            }).then(() => {
                this.props.location.clearSelectedShow();
                this.setState({ deletedShow: true });
            });
          }
        },
        {
          label: 'Cancel',
          onClick: () => { return; }
        }
      ]
    })
  }

  render() {
    const { deletedShow } = this.state;
    const { showId } = this.props.location.state;

    return (
      <Wrapper>
        {this.getShowDetails()}
        <DeleteButton onClick={() => this.handleDeleteShow(showId)}>
          <h5>Delete Show</h5>
        </DeleteButton>
        {
          deletedShow ? this.clearPath() : null
        }
      </Wrapper>
    );
  }
}

export default compose(
  graphql(getShowQuery, {
      options: props => {
        const { showId } = props.location.state;
          return {
              variables: {
                  id: showId
              }
          }
      },
      name: "getShowQuery"
  }),
  graphql(deleteShowMutation, { name: "deleteShowMutation" }),
)(SelectedShow);
