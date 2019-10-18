import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const TextBoxAndButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AddTextBox = styled.input`
    height: 40px;
    width: 300px;
    font-size: 16px;
    margin-right: 20px;
    padding-left: 10px;
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

const ErrorMessage = styled.h5`
  margin-top: 20px;
  color: red;
`;

export default function AddShow({ handleNewShowNameChange, onSaveClick, onCancelClick, errorMessage }) {
  return (
    <Wrapper>
      <TextBoxAndButtonsWrapper>
        <AddTextBox onChange={handleNewShowNameChange} placeholder="Enter a new show name..."></AddTextBox>
        <SaveButton className="fas fa-check-circle" onClick={onSaveClick}></SaveButton>
        <CancelButton className="fas fa-times-circle" onClick={onCancelClick}></CancelButton>
      </TextBoxAndButtonsWrapper>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </Wrapper>
  );
}
