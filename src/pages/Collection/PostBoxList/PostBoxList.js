import React, { useState } from 'react';
import styled from 'styled-components';

import Modal from '../../../components/Modal/Modal';
import CollectionData from './CollectionData/CollectionData';

import { useRecoilState } from 'recoil';
import { modalState } from '../../../atom';

const PostBoxList = ({ nickName, imageUrl, caption }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  return (
    <>
      {isModalOpen && (
        <Modal header="받은 메시지">
          <CollectionData
            nickName={nickName}
            imageUrl={imageUrl}
            caption={caption}
          />
        </Modal>
      )}
      <PostBox onClick={handleOpenModal}>
        <Img alt="" src={imageUrl} />
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
