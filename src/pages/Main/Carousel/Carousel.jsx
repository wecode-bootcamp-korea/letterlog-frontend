import React from 'react';
import styled from 'styled-components';
import AwesomeSlider from 'react-awesome-slider';

const Carousel = () => {
  return (
    <Container>
      <AwesomeSlider>
        <div data-src="/path/to/image-0.png" />
        <div data-src="/path/to/image-1.png" />
        <div data-src="/path/to/image-2.jpg" />
      </AwesomeSlider>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 389px;
  background-color: ${props => props.theme.mainColor};
`;

export default Carousel;
