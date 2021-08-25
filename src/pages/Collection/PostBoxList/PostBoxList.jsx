import React from 'react';
import styled from 'styled-components';

const PostBoxList = ({ data, handleOpenModal }) => {
  return (
    <>
      <PostBox onClick={() => handleOpenModal(data)}>
        <Img alt="" src={data.image_url} />
      </PostBox>
    </>
  );
};

export default PostBoxList;

const PostBox = styled.div`
  margin-bottom: 24px;
  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  width: 100%;
  border-radius: 20px;
`;
