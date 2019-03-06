import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import ImageUploader from './ImageUploader';
import { valueToObjectRepresentation } from 'apollo-utilities';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const ImageAndTextWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const NameTextBox = styled.input`
    height: 40px;
    width: 300px;
    font-size: 16px;
    margin-left: 40px;
    margin-right: 40px;
`;


class NewShowCharacters extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: null,
            image: null,
            file: null
        }
    }

    handleNameChange = ({ target: { value }}) => {
        this.setState({name: value});
    }

    setImageFile = ({ target })=>  {
        const { image } = this.state;
        if (image) {
            URL.revokeObjectURL(image)
        }
        const file = target.files[0];
        this.setState({image: URL.createObjectURL(file), file: file})
    }

    
    saveCharacter = () => {

    }



    render() {
        return (
            <Wrapper>
                <h1>{this.props.showName}</h1>
                <h1>Characters</h1>
                <ImageAndTextWrapper>
                    <ImageUploader 
                        image={this.state.image}
                        setImageFile={this.setImageFile}
                    />
                    <NameTextBox onChange={this.handleNameChange} placeholder="Name..."></NameTextBox>
                    <button onClick={this.saveCharacter}>Add</button>
                </ImageAndTextWrapper>
            </Wrapper>
        );
    }
}

export default NewShowCharacters