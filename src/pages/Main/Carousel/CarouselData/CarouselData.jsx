import React from 'react';
import styled from 'styled-components';

const CarouselData = ({ carouselData }) => {
  return (
    <Wrapper>
      <Poster>
        <Img src={carouselData.img} />
      </Poster>
      <Text>
        <Title>{carouselData.title}</Title>
        <Article>{carouselData.text}</Article>
      </Text>
    </Wrapper>
  );
};

export default CarouselData;

const Wrapper = styled.div`
  ${props => props.theme.setFlex('center', 'center')};
`;

const Poster = styled.div`
  width: 65%;
  height: 100%;
  overflow: hidden;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const Img = styled.img`
  height: 389px;
  width: 100%;
  object-fit: cover;
`;

const Text = styled.div`
  margin-top: 150px;
  margin-left: 30px;
  width: 35%;
`;

const Title = styled.div`
  font-size: 60px;
  font-weight: 600;
`;

const Article = styled.div`
  margin-top: 15px;
  margin-left: 10px;
  font-size: 30px;
`;
