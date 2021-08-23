import React from 'react';
import styled from 'styled-components';

const CollectionData = ({ nickName, imageUrl, caption }) => {
  return (
    <div>
      <div>
        <NickNameTitle>
          <h3>닉네임: {nickName}</h3>
        </NickNameTitle>
        <p>받은 내용: {caption} </p>
      </div>
      <div>
        <Img alt="" src={imageUrl} />
      </div>
    </div>
  );
};

export default CollectionData;

const Img = styled.img`
  width: 100%;
`;

const NickNameTitle = styled.h3`
  margin-bottom: 10px;
`;
