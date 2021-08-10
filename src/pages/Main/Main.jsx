import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CardBox from './CardBox/CardBox';
import Carousel from './Carousel/Carousel';
import { POSTBOXES_API } from '../../config';

import { useRecoilState } from 'recoil';
import { letterBoxState } from '../../atom';

const Main = () => {
  // const [letterBoxList, setLetterBoxList] = useState([]);
  const [letterBoxList, setLetterBoxList] = useRecoilState(letterBoxState);

  useEffect(() => {
    axios.get(`${POSTBOXES_API}`).then(({ data }) => {
      setLetterBoxList(data.results.postboxes);
    });
  }, []);

  // axios.get(`${POSTBOXES_API}`).then(data => {
  //   setLetterBoxList(data.data.results.postboxes);
  // });

  return (
    <Container>
      <Carousel />
      <CardBox letterBoxList={letterBoxList} />
    </Container>
  );
};

const Container = styled.div`
  ${props => props.theme.setFlex('center', 'center')};
  flex-direction: column;
  margin-top: 111px;
  /* background-color: green; */
  width: 100vw;
  height: 100%;
`;

export default Main;
