import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.li`
  margin-bottom: 30px;
  margin-right: 30px;
  width: 200px;
`;

export default function Character({ name }) {
  return (
    <Wrapper>
      { name }
    </Wrapper>
  );
}