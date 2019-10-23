import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 20px;
  flex-direction: column;
`;

const Margin = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Header = styled.h4`
  width: 100%;
  margin-left: 20%;
  margin-bottom: 40px;
  text-decoration: underline;
`;


export default function CharacterList({ children }) {
  return (
    <Wrapper>
      <Header>Characters</Header>
      <Margin>
        { children }
      </Margin>
    </Wrapper>
  );
}