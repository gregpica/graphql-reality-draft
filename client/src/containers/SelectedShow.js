import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { getShowQuery, deleteShowMutation, getShowsQuery } from '../queries/Show';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ShowDetails from '../components/SelectedShow/ShowDetails';


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
        const { id, name } = show;
        return <ShowDetails id={id} name={name} />
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
    const { pathname } = this.props.location;
    const { deletedShow } = this.state;
    const showId = pathname.split('/')[2];

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
          const showId = props.location.pathname.split('/')[2];
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
