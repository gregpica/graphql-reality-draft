import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
`;

const Label = styled.h4`
  margin-right: 20px;
`;

const Detail = styled.p`
  font-size: 14px;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export default function ShowDetails({ id, name }) {
  return (
    <Wrapper>
      <DetailWrapper>
        <Label>ID: </Label>
        <Detail>{id}</Detail>
      </DetailWrapper>
      <DetailWrapper>
        <Label>Name: </Label>
        <Detail>{name}</Detail>
      </DetailWrapper>
    </Wrapper>
  );
}
