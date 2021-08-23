import React, { useState } from 'react';
import styled from 'styled-components';

import { Modal } from 'components/Modal';
import CollectionData from 'pages/Collection/PostBoxList/CollectionData';

const PostBoxList = ({ data, id, collectionData }) => {
  const [isModal, setIsModal] = useState(false);

  const handleOpenModal = () => {
    setIsModal({ type: 'collectionModal', status: true });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModal(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      {isModal && (
        <Modal header="받은 메시지" closeModal={closeModal}>
          <CollectionData
            nickName={data.nickname}
            imageUrl={data.image_url}
            caption={data.caption}
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
