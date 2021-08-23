import React from 'react';
import styled from 'styled-components';

const CarouselData = ({ carouselData }) => {
  return (
    <Wrapper>
      <Poster>
        <Img src={carouselData.img}></Img>
      </Poster>
      <Text>
        <div>{carouselData.title}</div>
        <div>{carouselData.text}</div>
      </Text>
    </Wrapper>
  );
};

export default CarouselData;

const Wrapper = styled.div`
  ${props => props.theme.setFlex('center', 'center')};
`;

const Poster = styled.div`
  width: 50%;
`;

const Img = styled.img`
  height: 389px;
  object-fit: cover;
`;

const Text = styled.div`
  width: 50%;
`;
