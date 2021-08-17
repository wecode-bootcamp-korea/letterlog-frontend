import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CardBox from '../Main/CardBox/CardBox';
import { POSTBOXES_API } from '../../config';
import { useRecoilState } from 'recoil';
import { letterBoxState } from '../../atom';

const Search = () => {
  const [letterBoxList, setLetterBoxList] = useRecoilState(letterBoxState);

  useEffect(() => {
    axios.get(`${POSTBOXES_API}`).then(({ data }) => {
      setLetterBoxList(data);
    });
  }, []);

  return (
    <Container>
      <div>
        <input type="text" />
      </div>
      <CardBox letterBoxList={letterBoxList} />
    </Container>
  );
};

export default Search;

const Container = styled.div`
  ${props => props.theme.setFlex()}
  flex-direction: column;
  margin: 140px 0 80px;
`;
