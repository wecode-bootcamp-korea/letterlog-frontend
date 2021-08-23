import React from 'react';
import styled from 'styled-components/macro';
// Components
import PostBox from 'pages/Images/postBox.jpg';

const Card = ({ letterBox, openModal }) => {
  return (
    <>
      {letterBox && (
        <Box>
          <ContentWrapper>
            <Content>
              <div>우체통 : {letterBox.name}</div>
              <div>마감기한 : {letterBox.closed_at}</div>
              <div>
                상태 :
                {letterBox.is_public.toString() === 'true'
                  ? ' 공개'
                  : ' 비공개'}
              </div>
            </Content>
            <Date>D - {letterBox.days_to_close}</Date>
          </ContentWrapper>
          <Button onClick={openModal}>
            편지 보내기 <i className="far fa-paper-plane"></i>
          </Button>
        </Box>
      )}
    </>
  );
};

export default Card;

const Box = styled.div`
  width: 100%;
  height: 212px;
  padding-top: 20px;
  padding-left: 20px;
  border-radius: 5px;
  background-image: url(${PostBox});
`;

const ContentWrapper = styled.div`
  ${props => props.theme.setFlex('space-between', 'center')};
`;

const Content = styled.div`
  div {
    padding-bottom: 5px;
    font-size: 15px;
    font-weight: 700;
  }
`;

const Date = styled.div`
  padding-right: 20px;
  font-size: 20px;
`;

const Button = styled.button`
  padding: 3px 6px;
  margin-top: 85px;
  outline: none;
  cursor: pointer;
  border: 0;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 500;

  i {
    color: ${props => props.theme.mainColor};
  }
`;
