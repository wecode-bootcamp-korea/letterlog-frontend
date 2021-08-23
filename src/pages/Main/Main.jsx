import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components/macro';
//macro 디버깅이 더 수월해진다
import { Carousel } from 'pages/Main/Carousel';
import { POSTBOXES_API } from 'config';

import { useInView } from 'react-intersection-observer';
import { Card } from 'components/Card';

import { modalState, actions } from 'atom';
import { chkPwd } from 'Validation/Validation';
import { useRecoilState } from 'recoil';
import { Modal } from 'components/Modal';
import { SendingForm, PwForm } from 'components/Card/Form';

const Main = () => {
  const [sortList, setSortList] = useState('');

  const [trigger, setTrigger] = useState();

  // const [items, setItems] = useState([]);
  const [letterBoxList, setLetterBoxList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [ref, inView] = useInView();

  //모달 용 state
  const [isModal, setIsModal] = useRecoilState(modalState);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [formValues, setFormValues] = useState({
    nameInput: '',
    textInput: '',
    pwInput: '',
    boxId: '',
  });

  console.log(`letterBoxList`, letterBoxList);
  //

  const getItems = useCallback(async () => {
    setLoading(true);
    await axios
      .get(`${POSTBOXES_API}?page=${page}&status=${sortList}`)
      .then(res => {
        setLetterBoxList(prevState => [...prevState, ...res.data.results]);
        setLoading(false);
      });
  }, [page, sortList, trigger]);
  // `getItems` 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setPage(prevState => prevState + 1);
    }
  }, [inView, loading]);
  console.log(`loading`, loading);

  const sortClicked = e => {
    const filterType = e.target.innerText;

    const setFilterType = t => {
      setLetterBoxList([]);
      setTrigger(Math.random());
      setPage(1);
      setSortList(t);
    };

    const filterTypeToEng = {
      전체: '',
      공개: 'public',
      비공개: 'private',
    };
    setFilterType(filterTypeToEng[filterType]);
  };

  //Card 모달 함수
  const openModal = () => {
    setFormValues({ boxId: letterBoxList.id });
    if (letterBoxList.is_public === true) {
      setIsModal(actions.OPEN_SEND);
      // setModalOpen(true);
      document.body.style.overflow = 'hidden';
    }
    if (letterBoxList.is_public === false) {
      setIsModal(actions.OPEN_PW);
      // setOpenPw(true);
      document.body.style.overflow = 'hidden';
    }
  };
  //메일 전송 완료 시 닫는 함수
  const closeModalState = () => {
    setIsModal(actions.CLOSE_SEND);
    setIsModal(actions.CLOSE_PW);
    document.body.style.overflow = 'unset';
  };

  //이번트 겟
  const handleForm = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //파일 업로드
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
      axios.post(`${POSTBOXES_API}/${formValues.boxId}/send`, formData, config);
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
  //비밀번호 체크
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
          if (res.token) {
            localStorage.setItem('TOKEN', res.token);
            // this.props.history.push('/');
            // setModalOpen(true);
            // setOpenPw(false);
            setIsModal(actions.OPEN_SEND);
            setIsModal(actions.CLOSE_PW);

            setFormValues({ ...formValues, pwInput: '' });
          } else {
            alert('입력하신 비밀번호를 다시 확인해주세요.');
          }
        });
    } else {
      alert('숫자와 영문자 조합으로 8~15자리를 사용해야 합니다.');
    }
  };
  // '' public private
  return (
    <Container>
      <Carousel />
      {/* <CardBox letterBoxList={letterBoxList} sortClicked={sortClicked} /> */}
      <Wrapper>
        <Sort onClick={sortClicked}>전체</Sort>
        <Sort onClick={sortClicked}>공개</Sort>
        <Sort onClick={sortClicked}>비공개</Sort>
      </Wrapper>
      <Grid>
        {/* <div>{inView ? `true` : `false`}</div> */}
        {letterBoxList.map((letterBox, idx) => (
          <React.Fragment key={idx}>
            {letterBoxList.length - 1 === idx ? (
              <div ref={ref}>
                <Card key={idx} letterBox={letterBox} openModal={openModal}>
                  {/* 모달창 */}
                  {isModal.type === 'checkPw' && (
                    <Modal header="비밀번호">
                      <PwForm handleForm={handleForm} checkPw={checkPw} />
                    </Modal>
                  )}
                  {isModal.type === 'sendMail' && (
                    <Modal header="이메일 보내기">
                      <SendingForm
                        handleForm={handleForm}
                        fileChangedHandler={fileChangedHandler}
                        sendMail={sendMail}
                      />
                    </Modal>
                  )}
                </Card>
              </div>
            ) : (
              <Card key={idx} letterBox={letterBox} openModal={openModal}>
                {/* 모달창 */}
                {isModal.type === 'checkPw' && (
                  <Modal header="비밀번호">
                    <PwForm handleForm={handleForm} checkPw={checkPw} />
                  </Modal>
                )}
                {isModal.type === 'sendMail' && (
                  <Modal header="이메일 보내기">
                    <SendingForm
                      handleForm={handleForm}
                      fileChangedHandler={fileChangedHandler}
                      sendMail={sendMail}
                    />
                  </Modal>
                )}
              </Card>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  ${props => props.theme.setFlex('center', 'center')};
  flex-direction: column;
  margin-top: 111px;
  width: 100vw;
  height: 100%;
`;

const Wrapper = styled.div`
  ${props => props.theme.setFlex('flex-end', 'center')};
  width: 90%;
  margin-top: 30px;
`;

const Sort = styled.button`
  background-color: transparent;
  border: 1px solid #1dbe8e;
  cursor: pointer;
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
