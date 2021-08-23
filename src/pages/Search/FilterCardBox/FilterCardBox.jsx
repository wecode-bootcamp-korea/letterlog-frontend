import React from 'react';
import styled from 'styled-components';
import Card from 'components/Card/Card';

const FilterCardBox = ({ filterPost }) => {
  return (
    <Grid>
      {filterPost.map((letterBox, idx) => (
        <Card key={idx} letterBox={letterBox} />
      ))}
    </Grid>
  );
};

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

export default FilterCardBox;
