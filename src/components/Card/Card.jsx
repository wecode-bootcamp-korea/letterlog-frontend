import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import { POSTBOXES_API } from '../../config';
import { selectedFilesState } from '../../atom';
import { chkPwd } from '../../Validation/Validation';
import PostBox from '../../pages/Images/postBox.jpg';

import PwModal from '../Modal/components/PwModal';
import MainModal from '../Modal/components/MainModal';

const Card = ({ letterBox }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openPw, setOpenPw] = useState(false);
  const [selectedFiles, setSelectedFiles] = useRecoilState(selectedFilesState);
  const [formValues, setFormValues] = useState({
    nameInput: '',
    textInput: '',
    pwInput: '',
    boxId: '',
  });

  console.log(`formValues`, formValues);
  console.log(`selectedFiles`, selectedFiles);

  //모달 온오프
  const openModal = () => {
    setFormValues({ boxId: letterBox.id });
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

  // 이메일 보내기 / to collection
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
    axios.post(
      `${POSTBOXES_API}/${formValues.boxId}/sending`,
      formData,
      config
    );
    //여기에 조건문은 어떻게 해야하지
    //토큰 있다면 토큰 삭제
    // closeModal();
  };

  const checkPw = () => {
    if (chkPwd(formValues.pwInput)) {
      fetch(`${POSTBOXES_API}/${formValues.boxId}/signin`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          password: formValues.pwInput,
        }),
      })
        .then(res => res.json())
        .then(res => {
          if (res.TOKEN) {
            localStorage.setItem('TOKEN', res.TOKEN);
            // this.props.history.push('/');
            setModalOpen(true);
            setOpenPw(false);
          } else {
            alert('입력하신 비밀번호를 다시 확인해주세요.');
            // this.setState({ email: '', password: '' });
          }
        });
    } else alert('비밀번호는 숫자만 가능합니다. 다시 확인해주세요.');
    console.log(`formValues.pwInput`, formValues.pwInput);
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
              <PwModal handleForm={handleForm} checkPw={checkPw} />
            </Modal>
          )}
          {modalOpen && (
            <Modal
              open={modalOpen}
              closeModal={closeModal}
              header="이메일 보내기"
            >
              <MainModal
                handleForm={handleForm}
                fileChangedHandler={fileChangedHandler}
                sendMail={sendMail}
              />
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
