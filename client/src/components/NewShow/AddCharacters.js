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
  cursor: pointer;
`;

const ErrorMessage = styled.h5`
  margin-top: 20px;
  color: red;
`;

const Done = styled.h5`
  text-decoration: underline;
  color: #59337d;
  margin-top: 0px;
  cursor: pointer;
`;


export default function AddCharacters({ 
  header,
  handleAddCharacter,
  handleNameChange,
  nameValue,
  errorMessage,
  handleDoneClick,
}) {
  return (
    <Wrapper>
      <Header>{header}</Header>
      <TextBox value={nameValue} onChange={handleNameChange} placeholder="Name..." />
      <AddButton onClick={handleAddCharacter}>
        <h5>Add</h5>
      </AddButton>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <Done onClick={handleDoneClick}>Done</Done>
    </Wrapper>
  );
}
