import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import { getShowQuery } from './queries/Show';

const Wrapper = styled.div`
`;

const Delete = styled.h5`
  color: red;
  cursor: pointer;
`;

class SelectedShow extends Component {
    getShowDetails = () => {
        const { data } = this.props;
        if (data.loading) {
            return "Loading show details...."
        } else { 
         return `id: ${data.show.id}, name: ${data.show.name}`
        }
    }

    render() {
        return (
            <Wrapper>
                {this.getShowDetails()}
                <Delete onClick={() => this.props.handleDeleteShow(this.props.showId)}>Delete Show</Delete>
            </Wrapper>
        );
    }
}

export default graphql(getShowQuery, {
    options: props => {
        return {
            variables: {
                id: props.showId
            }
        }
    }
})(SelectedShow);
