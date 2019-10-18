import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { getShowQuery, deleteShowMutation, getShowsQuery } from '../queries/Show';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const Wrapper = styled.div`
`;

const Delete = styled.h5`
  color: red;
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
        return `id: ${show.id}, name: ${show.name}`
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
        <Delete onClick={() => this.handleDeleteShow(showId)}>Delete Show</Delete>
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
