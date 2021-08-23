import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { modalState } from 'atom';
import { Modal } from 'components/Modal';
import CollectionData from 'pages/Collection/PostBoxList/CollectionData';

const PostBoxList = ({ data, id, collectionData }) => {
  const [isModal, setIsModal] = useRecoilState(modalState);

  const handleOpenModal = () => {
    setIsModal({ type: 'collectionModal', status: true });
    document.body.style.overflow = 'hidden';
  };

  return (
    <>
      {isModal.type === 'collectionModal' && isModal.status && (
        <Modal header="받은 메시지">
          <CollectionData
          // nickName={props.data.nickname}
          // imageUrl={props.data.image_url}
          // caption={props.data.caption}
          />
        </Modal>
      )}
      <PostBox onClick={handleOpenModal}>
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
