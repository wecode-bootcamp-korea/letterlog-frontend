import React from 'react';
import styled from 'styled-components';
import Card from '../../../components/Card/Card';

const CardBox = ({ letterBoxList }) => {
  return (
    <>
      <Wrapper>
        <Sort>전체</Sort>
        <Sort>공개</Sort>
        <Sort>비공개</Sort>
      </Wrapper>
      <Grid>
        {letterBoxList.map((letterBox, idx) => (
          <Card key={idx} letterBox={letterBox} />
        ))}
      </Grid>
    </>
  );
};

const Wrapper = styled.div`
  ${props => props.theme.setFlex('flex-end', 'center')};
  width: 90%;
  margin-top: 30px;
`;

const Sort = styled.button`
  background-color: transparent;
  border: 1px solid #1dbe8e;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  border-radius: 10px;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 12px;
  column-gap: 12px;
  padding: 50px;
  width: 90%;
  background-color: #f1f1f1;
`;

export default CardBox;
