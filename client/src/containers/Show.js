import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getShowsQuery, addShowMutation } from './queries/Show';
import styled from 'styled-components';
import SelectedShow from './SelectedShow';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const SelectAndAddWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 30px;
`;

const SelectBox = styled.select`
    height: 40px;
    width: 300px;
    font-size: 16px;
    margin-right: 20px;

`;

const AddTextBox = styled.input`
    height: 40px;
    width: 300px;
    font-size: 16px;
    margin-right: 20px;
`;

const AddButton = styled.i`
   font-size: 30px;
   color: blue;
`;

const SaveButton = styled.i`
    font-size: 30px; 
    color: green;
    margin-right: 20px;
`;

const CancelButton = styled.i`
    font-size: 30px;
    color: red;
`;

class Show extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedShow: "",
            addingShow: false,
            newShow: null 
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

    getSelectedShow = () => {
        const { selectedShow } = this.state;
        if (selectedShow) {
            return <SelectedShow showId={selectedShow} />
        }
    }

    handleNewShowChange = ({ target: { value }}) => {
        this.setState({newShow: value});
    }

    handleAddClick = () => {
        this.setState({addingShow: true});
    }

    handleCancelClick = () => {
        this.setState({newShow: null, addingShow: false});
    }

    handleSaveClick = () => {
        this.props.addShowMutation({
            variables: {
                name: this.state.newShow
            }
        })
    }

    getSelectOrAddDisplay = () => {
        const { addingShow } = this.state;
        if (addingShow) {
            return (
                <>
                    <AddTextBox onChange={this.handleNewShowChange} placeholder="Enter a new show name..."></AddTextBox>
                    <SaveButton className="fas fa-check-circle" onClick={this.handleSaveClick}></SaveButton>
                    <CancelButton className="fas fa-times-circle" onClick={this.handleCancelClick}></CancelButton>
                </>
            )
        }
        return (
            <>
                <SelectBox value={this.state.selectedShow} onChange={this.setSelectedShow}>
                    <option value="" disabled>Select or add a new show...</option>
                    {this.getShows()}
                </SelectBox>
                <AddButton className="fas fa-plus-circle" onClick={this.handleAddClick}></AddButton>
            </>
        )
    }
    

    render() {
        return (
            <Wrapper>
                <SelectAndAddWrapper>
                    {this.getSelectOrAddDisplay()}
                </SelectAndAddWrapper>
                {this.getSelectedShow()}
            </Wrapper>
        );
    }
}

export default compose(
    graphql(getShowsQuery, { name: "getShowsQuery"}),
    graphql(addShowMutation, { name: "addShowMutation"})
)(Show);
