import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Modal from 'components/Modal/Modal';
import { Card } from 'components/Card';
import { PwForm, SendingForm } from 'components/Card/Form';
import { chkPwd } from 'Validation/Validation';
import { modalState, actions } from 'atom';

import { POSTBOXES_API } from 'config';
import { useRecoilState } from 'recoil';
import { searchInputState } from 'atom';

const Search = () => {
  const [letterBoxList, setLetterBoxList] = useState([]);
  const [searchInput] = useRecoilState(searchInputState);

  const [modalStatus, setModalStatus] = useRecoilState(modalState);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [formValues, setFormValues] = useState({
    nameInput: '',
    textInput: '',
    pwInput: '',
    boxId: '',
  });

  useEffect(() => {
    axios.get(`${POSTBOXES_API}`).then(({ data }) => {
      setLetterBoxList(data.results);
    });
  }, []);

  const filterPostList = letterBoxList.filter(item => {
    return item.name.includes(searchInput.toLowerCase());
  }, []);

  const openModal = a => {
    setModalStatus(a);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalStatus(actions.CLOSED);
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

  return (
    <Container>
      <Grid>
        {filterPostList.map((letterBox, idx) => {
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
                <div>
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
    </Container>
  );
};

export default Search;

const Container = styled.div`
  ${props => props.theme.setFlex()}
  flex-direction: column;
  margin: 160px 0 80px;
`;

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
