import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.h3`
  margin-bottom: 30px;
`;

const TextBox = styled.input`
  height: 40px;
  width: 300px;
  font-size: 16px;
  padding-left: 10px;
`;

const AddButton = styled.div`
  width: 150px;
  height: 40px;
  background-color: #82c28f;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

export default function AddCharacters({ header, handleAddCharacter, handleFieldChange }) {
  return (
    <Wrapper>
      <Header>{header}</Header>
      <TextBox onChange={handleFieldChange} placeholder="Name..." />
      <AddButton onClick={handleAddCharacter}>
        <h5>Add</h5>
      </AddButton>
    </Wrapper>
  );
}
