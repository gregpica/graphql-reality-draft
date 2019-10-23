import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Redirect, withRouter } from 'react-router-dom';
import { getShowsQuery, addShowMutation } from '../queries/Show';
import AddShow from '../components/ShowActionBar/AddShow';
import SelectShow from '../components/ShowActionBar/SelectShow';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const BarWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 30px;
`;

class ShowActionBar extends Component {
  constructor(props){
      super(props);
      this.state = {
        selectedShow: "",
        addingShow: false,
        newShowName: null,
        newShowSaved: null,
        invalidSaveMessage: null,
      }
  }

  componentDidMount() {
    const { pathname } = this.props.location;
    const depth2 = pathname.split('/')[2];
    if (depth2 && depth2 !== 'new') {
      this.setState({ selectedShow: depth2 });
    }
  }

  getShows = () => {
      const { shows } = this.props.getShowsQuery;
      if(shows) {
          return shows.map(show => {
              return(
                  <option key={show.id} value={show.id}>{show.name}</option>
              )
          })
      }
  }

  setSelectedShow = ({ target : { value }}) => { 
      this.setState({ selectedShow: value });
  }

  displaySelectedShow = selectedShow => (
    <Redirect to={{ 
      pathname: `/show/${selectedShow}`,
      clearSelectedShow: () => this.setState({ selectedShow: "" })
      }} 
    />
  )

  handleNewShowNameChange = ({ target: { value } }) => {
      const { invalidSaveMessage } = this.state;
      if (invalidSaveMessage && value) {
        this.setState({ invalidSaveMessage: null });
      }

      this.setState({ newShowName: value });
  }

  handleAddClick = () => {
      this.setState({ addingShow: true, selectedShow: "" });
  }

  handleCancelClick = () => {
      this.setState({ newShowName: null, addingShow: false });
  }

  clearPath = () => (
    <Redirect to={{ pathname: '/' }} />
  )

  redirectToNewShow = newShowSaved => (
    <Redirect to={{ 
        pathname: '/show/new', 
        state: { showId: newShowSaved.id, showName: newShowSaved.name },
        allDone: () => this.setState({ newShowSaved: null }),
      }}  
    /> 
  )

  saveNewShow = () => {
    const { newShowName } = this.state;
    if (newShowName) {
      this.props.addShowMutation({
          variables: {
              name: newShowName
          },
          refetchQueries: [{ query: getShowsQuery }]
      }).then(res => {
          const data = res.data.addShow;
          this.setState({ 
            addingShow: false,
            newShowSaved: { 
              id: data.id,
              name: data.name
            },
            selectedShow: data.id 
          });
      });
    } else {
      this.setState({ invalidSaveMessage: 'Hold up! Please enter a name for your new show before saving!' })
    }
  }

  getSelectAddOrNewShowDisplay = () => {
      const { addingShow, newShowSaved, selectedShow, invalidSaveMessage } = this.state;

      if (addingShow) {
        return (
          <AddShow
            handleNewShowNameChange={this.handleNewShowNameChange}
            onSaveClick={this.saveNewShow}
            onCancelClick={this.handleCancelClick}
            errorMessage={invalidSaveMessage}
          />
        )
      }

      const { pathname } = this.props.location;

      if (newShowSaved || pathname.split('/')[2] === 'new') {
        return;
      }

      return (
        <SelectShow
          selectValue={selectedShow}
          handleSelectValueChange={this.setSelectedShow}
          selectOptions={this.getShows()}
          onAddClick={this.handleAddClick}
        />
      )
  }
  
  render() {
    const { addingShow, newShowSaved, selectedShow } = this.state;
    
    return (
      <Wrapper>
        <BarWrapper>
          {this.getSelectAddOrNewShowDisplay()}
        </BarWrapper>
        {
          selectedShow ? this.displaySelectedShow(selectedShow) : null
        }
        {
          addingShow ? this.clearPath() : null
        }
        { 
          newShowSaved ? this.redirectToNewShow(newShowSaved) : null 
        }
        <div style={{ width: '100%' }}>
          {this.props.children}
        </div>
      </Wrapper>
    );
  }
}

export default compose(
  withRouter,
  graphql(getShowsQuery, { name: "getShowsQuery" }),
  graphql(addShowMutation, { name: "addShowMutation" }),
)(ShowActionBar);
