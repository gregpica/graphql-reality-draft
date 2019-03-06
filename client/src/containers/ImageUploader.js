import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

`;

const Image = styled.img`
    width: 100px;
    height 100px; 
    border-radius: 50%;
    border: 2px solid black;
`;

function ImageUploader(props) {
    return (
        <Wrapper>
            <Image className="image" src={props.image} />
            <label className="custom-file-upload">
                <input type="file" onChange={props.setImageFile}/>
                +
            </label>
        </Wrapper>

    )
  }

export default ImageUploader 