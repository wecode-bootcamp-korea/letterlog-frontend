import React, { useState, useEffect, Children } from 'react';
// import { useRecoilState } from 'recoil';
// import axios from 'axios';
import styled from 'styled-components';
// import { Modal } from 'components/Modal';
// import { POSTBOXES_API } from 'config';
// import { chkPwd } from 'Validation/Validation';
import PostBox from 'pages/Images/postBox.jpg';

// import { SendingForm, PwForm } from 'components/Card/Form';
// import { modalState, actions } from 'atom';

const Card = ({ letterBox, openModal, children }) => {
  // const [modalOpen, setModalOpen] = useState(false);
  // const [openPw, setOpenPw] = useState(false);

  // const [isModal, setIsModal] = useRecoilState(modalState);
  // const [selectedFiles, setSelectedFiles] = useState(null);
  // const [formValues, setFormValues] = useState({
  //   nameInput: '',
  //   textInput: '',
  //   pwInput: '',
  //   boxId: '',
  // });

  // const openModal = () => {
  //   setFormValues({ boxId: letterBox.id });
  //   if (letterBox.is_public === true) {
  //     setIsModal(actions.OPEN_SEND);
  //     // setModalOpen(true);
  //     document.body.style.overflow = 'hidden';
  //   }
  //   if (letterBox.is_public === false) {
  //     setIsModal(actions.OPEN_PW);
  //     // setOpenPw(true);
  //     document.body.style.overflow = 'hidden';
  //   }
  // };

  // //메일 전송 완료 시 닫는 함수
  // const closeModalState = () => {
  //   setIsModal(actions.CLOSE_SEND);
  //   setIsModal(actions.CLOSE_PW);
  //   document.body.style.overflow = 'unset';
  // };

  // //이번트 겟
  // const handleForm = e => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  // };

  // //파일 업로드
  // const fileChangedHandler = e => {
  //   setSelectedFiles(e.target.files[0]);
  // };

  // // 이메일 보내기 // to collection
  // const sendMail = () => {
  //   let token = localStorage.getItem('TOKEN') || '';
  //   const formData = new FormData();
  //   formData.append('image', selectedFiles);
  //   formData.append('nickname', formValues.nameInput);
  //   formData.append('caption', formValues.textInput);
  //   const config = {
  //     headers: {
  //       Authorization: token,
  //       'content-type': 'multipart/form-data',
  //     },
  //   };
  //   if (
  //     formValues.nameInput &&
  //     formValues.textInput &&
  //     selectedFiles !== null
  //   ) {
  //     axios.post(`${POSTBOXES_API}/${formValues.boxId}/send`, formData, config);
  //     //  .then(res => res.json())
  //     // .then(res => {
  //     //   {
  //     //     localStorage.setItem('message', res.data.message);
  //     //   }
  //     // });
  //     alert('전송완료');
  //     setSelectedFiles(null);
  //     localStorage.removeItem('TOKEN');
  //     setFormValues({ nameInput: '', textInput: '' });
  //     closeModalState();
  //   } else alert('정해진 양식을 채워주세요.');
  // };
  // //비밀번호 체크
  //   const checkPw = () => {
  //     if (chkPwd(formValues.pwInput)) {
  //       fetch(`${POSTBOXES_API}/access`, {
  //         method: 'POST',
  //         headers: {
  //           'content-type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           id: formValues.boxId,
  //           password: formValues.pwInput,
  //         }),
  //       })
  //         .then(res => res.json())
  //         .then(res => {
  //           if (res.token) {
  //             localStorage.setItem('TOKEN', res.token);
  //             // this.props.history.push('/');
  //             // setModalOpen(true);
  //             // setOpenPw(false);
  //             setIsModal(actions.OPEN_SEND);
  //             setIsModal(actions.CLOSE_PW);

  //             setFormValues({ ...formValues, pwInput: '' });
  //           } else {
  //             alert('입력하신 비밀번호를 다시 확인해주세요.');
  //           }
  //         });
  //     } else {
  //       alert('숫자와 영문자 조합으로 8~15자리를 사용해야 합니다.');
  //     }
  //   };

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
          {children}
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
