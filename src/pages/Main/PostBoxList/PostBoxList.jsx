import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components/macro';
import axios from 'axios';
//Components
import { POSTBOXES_API } from 'config';
import { Card } from 'components/Card';
import Modal from 'components/Modal/Modal';
import { PwForm, SendingForm } from 'components/Card/Form';
import { modalState, actions } from 'atom';
import { chkPwd } from 'Validation';

const PostBoxList = ({ letterBoxList, cardRef }) => {
  const [modalStatus, setModalStatus] = useRecoilState(modalState);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [formValues, setFormValues] = useState({
    nameInput: '',
    textInput: '',
    pwInput: '',
    boxId: '',
  });

  //메일 전송 완료 시 닫는 함수
  const closeModal = () => {
    setModalStatus(actions.CLOSED);
    document.body.style.overflow = 'unset';
  };
  //input value 가져오기
  const handleForm = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  //파일 업로드 가져오기
  const fileChangedHandler = e => {
    setSelectedFiles(e.target.files[0]);
  };
  // 이메일 보내기 // to collection
  const sendMail = () => {
    let token = localStorage.getItem('TOKEN') || '';
    const formData = new FormData();
    formData.append('image', selectedFiles);
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
      axios
        .post(`${POSTBOXES_API}/${formValues.boxId}/send`, formData, config)
        .then(res => {
          if (res.statusText === 'Created') {
            alert('전송완료');
            setSelectedFiles(null);
            localStorage.removeItem('TOKEN');
            setFormValues({ nameInput: '', textInput: '' });
            closeModal();
          } else {
            alert('이미지 파일의 형태만 보낼 수 있습니다.');
          }
        });
    } else alert('정해진 양식을 채워주세요.');
  };

  const checkPw = () => {
    if (chkPwd(formValues.pwInput)) {
      axios
        .post(`${POSTBOXES_API}/access`, {
          id: formValues.boxId,
          password: formValues.pwInput,
        })
        .then(res => {
          if (res.data.token) {
            localStorage.setItem('TOKEN', res.data.token);
            setModalStatus(actions.OPEN_SEND);
            setFormValues({ ...formValues, pwInput: '' });
          } else {
            alert('입력하신 비밀번호를 다시 확인해주세요.');
          }
        });
    } else {
      alert('숫자와 영문자 조합으로 8~15자리를 사용해야 합니다.');
    }
  };

  //여기에 매개변수로 type이 들어감
  const openModal = a => {
    setModalStatus(a);
    document.body.style.overflow = 'hidden';
  };
  return (
    <>
      <Grid>
        {letterBoxList.map((letterBox, idx) => {
          const isLastItem = idx < letterBoxList.length - 1;
          const handleModal = () => {
            openModal(
              letterBox.is_public ? actions.OPEN_SEND : actions.OPEN_PW
            );
            setFormValues({ boxId: letterBox.id });
          };
          return (
            <React.Fragment key={idx}>
              {isLastItem ? (
                <div ref={cardRef}>
                  <Card
                    key={idx}
                    openModal={handleModal}
                    letterBox={letterBox}
                  />
                </div>
              ) : (
                <Card key={idx} openModal={handleModal} letterBox={letterBox} />
              )}
            </React.Fragment>
          );
        })}
      </Grid>

      {(modalStatus.type === 'sendMail' || modalStatus.type === 'checkPw') && (
        <Modal
          header={modalStatus.type === 'checkPw' ? '비밀번호' : '이메일 보내기'}
        >
          {modalStatus.type === 'sendMail' && (
            <SendingForm
              handleForm={handleForm}
              fileChangedHandler={fileChangedHandler}
              sendMail={sendMail}
            />
          )}
          {modalStatus.type === 'checkPw' && (
            <PwForm handleForm={handleForm} checkPw={checkPw} />
          )}
        </Modal>
      )}
    </>
  );
};

export default PostBoxList;

const Grid = styled.div`
  display: grid;
  border-radius: 10px;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 12px;
  column-gap: 12px;
  padding: 50px;
  width: 90%;
  background-color: #f1f1f1;
`;
