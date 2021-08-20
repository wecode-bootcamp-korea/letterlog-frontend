import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import { POSTBOXES_API } from '../../config';
import { selectedFilesState } from '../../atom';
import { chkPwd } from '../../Validation/Validation';
import PostBox from '../../pages/Images/postBox.jpg';

import PwModal from '../Modal/components/PwModal';
import MainModal from '../Modal/components/MainModal';
import { modalState } from '../../atom';

const Card = ({ letterBox }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openPw, setOpenPw] = useState(false);
  const setIsModal = useSetRecoilState(modalState);

  const [selectedFiles, setSelectedFiles] = useState(null);
  const [formValues, setFormValues] = useState({
    nameInput: '',
    textInput: '',
    pwInput: '',
    boxId: '',
  });

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

  //메일 전송 완료 시 닫는 함수
  const closeModalState = () => {
    setModalOpen(false);
    setOpenPw(false);
    document.body.style.overflow = 'unset';
  };

  const handleForm = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const fileChangedHandler = e => {
    // setSelectedFiles(e.target.files[0]);
  };

  // 이메일 보내기 // to collection
  const sendMail = () => {
    let token = localStorage.getItem('TOKEN') || '';
    const formData = new FormData();
    // formData.append('image_url', selectedFiles);
    formData.append('nickname', formValues.nameInput);
    formData.append('caption', formValues.textInput);
    const config = {
      headers: {
        Authorization: token,
        'content-type': 'multipart/form-data',
      },
    };
    if (
      formValues.nameInput &&
      formValues.textInput &&
      selectedFiles !== null
    ) {
      axios.post(
        `${POSTBOXES_API}/${formValues.boxId}/sending`,
        formData,
        config
      );
      //  .then(res => res.json())
      // .then(res => {
      //   {
      //     localStorage.setItem('message', res.data.message);
      //   }
      // });
      alert('전송완료');
      setSelectedFiles(null);
      localStorage.removeItem('TOKEN');
      setFormValues({ nameInput: '', textInput: '' });
      closeModalState();
    } else alert('정해진 양식을 채워주세요.');
  };
  // `${POSTBOXES_API}/${formValues.boxId}/signin`
  // `${POSTBOXES_API}/access`;
  const checkPw = () => {
    if (chkPwd(formValues.pwInput)) {
      fetch(`${POSTBOXES_API}/access`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          id: formValues.boxId,
          password: formValues.pwInput,
        }),
      })
        .then(res => res.json())
        .then(res => {
          if (res.accessToken) {
            localStorage.setItem('TOKEN', res.accessToken);
            // this.props.history.push('/');
            setModalOpen(true);
            setOpenPw(false);
            setFormValues({ ...formValues, pwInput: '' });
          } else {
            alert('입력하신 비밀번호를 다시 확인해주세요.');
          }
        });
    } else {
      alert('숫자와 영문자 조합으로 8~15자리를 사용해야 합니다.');
    }
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
            <Modal open={modalOpen} header="비밀번호">
              <PwModal handleForm={handleForm} checkPw={checkPw} />
            </Modal>
          )}
          {modalOpen && (
            <Modal open={modalOpen} header="이메일 보내기">
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
