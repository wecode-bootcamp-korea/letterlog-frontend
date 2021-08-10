import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import PostBox from '../../pages/Images/postBox.jpg';

import { useRecoilState } from 'recoil';
import { modalOpenState } from '../../atom';

const Card = ({ letterBox }) => {
  const [modalOpen, setModalOpen] = useState(false);
  // const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {letterBox && (
        <Box>
          <div>{letterBox.name}</div>
          <div>마감기한 {letterBox.closedAt}</div>
          <div>발송날짜 {letterBox.sendAt}</div>
          <Button onClick={openModal}>
            <i class="far fa-paper-plane"></i>
          </Button>
          {/* 모달창 */}
          <Modal open={modalOpen} close={closeModal} header="이메일 보내기" />
        </Box>
      )}
    </>
  );
};

export default Card;

const Box = styled.div`
  width: 100%;
  height: 212px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 500;
  background-image: url(${PostBox});
`;

const Button = styled.button`
  outline: none;
  cursor: pointer;
  border: 0;

  i {
    color: green;
  }
`;
