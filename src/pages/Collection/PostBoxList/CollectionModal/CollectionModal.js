import React from 'react';
import styled from 'styled-components';

const CollectionModal = props => {
  return (
    <div>
      <div>
        <NickNameTitle>
          <h3>닉네임: {props.nickName}</h3>
        </NickNameTitle>
        <p>받은 내용: {props.caption} </p>
      </div>
      <div>
        <Img alt="" src={props.imageUrl} />
      </div>
    </div>
  );
};

export default CollectionModal;

const Img = styled.img`
  width: 100%;
`;

const NickNameTitle = styled.h3`
  margin-bottom: 10px;
`;
