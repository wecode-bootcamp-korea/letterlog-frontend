import React, { useState } from 'react';
import styled from 'styled-components';

import Modal from '../../../components/Modal/Modal';
import CollectionModal from './CollectionModal/CollectionModal';

const PostBoxList = props => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  console.log(`props`, props);
  return (
    <>
      {isModalOpen && (
        <Modal header="받은 메시지" closeModal={closeModal}>
          <CollectionModal
            id={props.data.id}
            nickName={props.data.nickname}
            imageUrl={props.data.image_url}
            caption={props.data.caption}
          />
        </Modal>
      )}
      <PostBox onClick={handleOpenModal}>
        <Img alt="" src={props.data.image_url} />
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
