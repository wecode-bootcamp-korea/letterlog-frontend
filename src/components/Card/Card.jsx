import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import { SEND_API, SEND_PW } from '../../config';
import { selectedFilesState, boxIdState } from '../../atom';
import { chkPwd } from '../../Validation/Validation';
import PostBox from '../../pages/Images/postBox.jpg';

const Card = ({ letterBox }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openPw, setOpenPw] = useState(false);
  const [formValues, setFormValues] = useState({
    // selectedFiles: null, // 왜 파일 업로드가 안될까요?
    nameInput: '',
    textInput: '',
    pwInput: '',
  });
  const [selectedFiles, setSelectedFiles] = useRecoilState(selectedFilesState);

  const openModal = () => {
    if (letterBox.is_public === true) {
      setModalOpen(true);
      document.body.style.overflow = 'hidden';
    }
    if (letterBox.is_public === false) {
      setOpenPw(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setOpenPw(false);
    document.body.style.overflow = 'unset';
  };

  const handleForm = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const fileChangedHandler = e => {
    setSelectedFiles(e.target.files[0]);
  };

  const sendMail = () => {
    const formData = new FormData();
    formData.append('image_url', selectedFiles);
    formData.append('nickname', formValues.nameInput);
    formData.append('caption', formValues.textInput);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(`${SEND_API}`, formData, config);
    closeModal();
  };

  return (
    <>
      {letterBox && (
        <Box>
          <div>{letterBox.name}</div>
          <div>마감기한 {letterBox.closed_at}</div>
          <div>D - {letterBox.days_to_close}</div>
          <div>공개여부 {letterBox.is_public.toString()}</div>
          {/* 공개 비공개 보여주는 함수 추가 */}
          <Button onClick={openModal}>
            <i className="far fa-paper-plane"></i>
          </Button>
          {/* 모달창 */}
          {openPw && (
            <Modal open={modalOpen} closeModal={closeModal} header="비밀번호">
              <div>비민번호를 입력하세요</div>
              <input type="password" name="pwInput" onChange={handleForm} />
              <Footer>
                <Close onClick={sendMail}>확인</Close>
              </Footer>
            </Modal>
          )}
          {modalOpen && (
            <Modal
              open={modalOpen}
              closeModal={closeModal}
              header="이메일 보내기"
            >
              {/* props.children 들어가는 자리 */}
              <div>닉네임</div>
              {/* 닉네임 조건 걸어야 함 */}
              <input type="text" name="nameInput" onChange={handleForm} />
              <div>이미지 업로드</div>
              {/* 이미지 업로드 post */}
              <input
                type="File"
                name="selectedFiles"
                onChange={fileChangedHandler}
              />
              <div>텍스트(50자 이내)</div>
              {/* 텍스트 조건 걸어야 함 */}
              <input type="text" name="textInput" onChange={handleForm} />
              <Footer>
                <Close onClick={sendMail}>보내기</Close>
              </Footer>
            </Modal>
          )}
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

const Footer = styled.div`
  padding: 12px 16px;
  text-align: right;
`;

const Close = styled.button`
  outline: none;
  cursor: pointer;
  border: 0;

  padding: 6px 12px;
  color: #fff;
  background-color: ${props => props.theme.mainColor};
  border-radius: 5px;
  font-size: 13px;
`;
