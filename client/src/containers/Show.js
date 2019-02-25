import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getShowsQuery } from './queries/Show';
import styled from 'styled-components';
import SelectedShow from './SelectedShow';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;


const SelectBox = styled.select`
    margin-top: 30px;
    height: 40px;
    width: 300px;
    font-size: 16px;

`;


class Show extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedShow: ""
        }
    }

    getShows = () => {
        const { shows } = this.props.data;
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
    

    render() {
        return (
            <Wrapper>
                <SelectBox value={this.state.selectedShow} onChange={this.setSelectedShow}>
                    <option value="" disabled>Select or add a show...</option>
                    {this.getShows()}
                </SelectBox>
                {this.getSelectedShow()}
            </Wrapper>
        );
    }
}

export default graphql(getShowsQuery)(Show);
