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
        const { handleDeleteShow, pathname } = this.props.location;
        const showId = pathname.split('/')[2];
        return (
            <Wrapper>
                {this.getShowDetails()}
                <Delete onClick={() => handleDeleteShow(showId)}>Delete Show</Delete>
            </Wrapper>
        );
    }
}

export default graphql(getShowQuery, {
    options: props => {
        const showId = props.location.pathname.split('/')[2];
        return {
            variables: {
                id: showId
            }
        }
    }
})(SelectedShow);
