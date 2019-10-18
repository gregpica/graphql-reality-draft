import React from 'react';
import styled from 'styled-components';

const SelectBox = styled.select`
    height: 40px;
    width: 300px;
    font-size: 16px;
    margin-right: 20px;
`;

const AddButton = styled.i`
   font-size: 30px;
   color: blue;
`;

export default function SelectShow({ selectValue, handleSelectValueChange, selectOptions, onAddClick }) {
  return (
    <>
      <SelectBox value={selectValue} onChange={handleSelectValueChange}>
        <option value="" disabled>Select or add a new show...</option>
        {selectOptions}
      </SelectBox>
      <AddButton className="fas fa-plus-circle" onClick={onAddClick}></AddButton>
    </>
  );
}
