import React from 'react';
import styled from 'styled-components';

const CarouselData = ({ carouselData }) => {
  // console.log(`CarouselData`, carouselData);
  return (
    <Wrap>
      <Poster>
        <Img src={carouselData.img}></Img>
      </Poster>
      <Article>
        <Title>{carouselData.text}</Title>
      </Article>
    </Wrap>
  );
};

export default CarouselData;

const Poster = styled.div`
  width: 50%;
  height: 389px;
`;

//데이터 들어오면 스타일용
const Article = styled.div``;

const Wrap = styled.div`
  width: 90%;
  height: 389px;
  /* overflow: hidden; */
`;

//데이터 들어오면 스타일용
const Title = styled.div``;

const Img = styled.img`
  object-fit: cover;
`;
