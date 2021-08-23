import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CarouselData from './CarouselData/CarouselData';

import Slider from 'react-slick';

const Carousel = () => {
  const [carouselData, setCarouselDate] = useState([]);

  useEffect(() => {
    axios.get('data/Carousel.json').then(({ data }) => {
      setCarouselDate(data.results.carousel);
    });
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Container>
      <Wrap>
        <Slider {...settings}>
          {carouselData.map((carouselData, idx) => (
            <CarouselData key={idx} carouselData={carouselData} />
          ))}
        </Slider>
      </Wrap>
    </Container>
  );
};

export default Carousel;

const Container = styled.div`
  ${props => props.theme.setFlex('center', 'center')};
  width: 90%;
  height: 389px;
  background-color: ${props => props.theme.cardBackground};
  border: 1px solid ${props => props.theme.cardBackground};
  border-radius: 10px;
`;

const Wrap = styled.div`
  width: 100%;
  .slick-prev:before {
    opaicty: 1; // 기존에 숨어있던 화살표 버튼이 보이게
    color: black; // 버튼 색은 검은색으로
    left: 0;
  }
  .slick-next:before {
    opacity: 1;
    color: black;
  }
`;
