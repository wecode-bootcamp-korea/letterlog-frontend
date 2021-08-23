import React, { useState, useEffect } from 'react';
// Library
import { useRecoilState } from 'recoil';
import axios from 'axios';
import styled from 'styled-components/macro';
import { useInView } from 'react-intersection-observer';
//Components
import { POSTBOXES_API } from 'config';
import { Card } from 'components/Card';
import Modal from 'components/Modal/Modal';
import { PwForm, SendingForm } from 'components/Card/Form';
import { Carousel } from 'pages/Main/Carousel';
import { modalState, actions } from 'atom';
import { chkPwd } from 'Validation/Validation';

const Main = () => {
  //filter
  const [sortList, setSortList] = useState('');
  //pagination
  const [trigger, setTrigger] = useState();
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState();
  //letterBoxList
  const [letterBoxList, setLetterBoxList] = useState([]);
  //
  //카드 컴포넌트 용
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [formValues, setFormValues] = useState({
    nameInput: '',
    textInput: '',
    pwInput: '',
    boxId: '',
  });
  //모달 전역변수
  const [modalStatus, setModalStatus] = useRecoilState(modalState);

  //새로고침시 최상단으로 보내기
  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  const getItems = () => {
    axios.get(`${POSTBOXES_API}?page=${page}&status=${sortList}`).then(res => {
      setNextPage(res.data.next);
      setLetterBoxList(prevState => [...prevState, ...res.data.results]);
      setLoading(false);
    });
  };
  //트리거 대신 레터박스

  useEffect(() => {
    getItems();
  }, [page, sortList, trigger]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      if (nextPage === null) {
        setLoading(false);
      } else {
        setLoading(true);
        setPage(prevState => prevState + 1);
      }
    }
  }, [inView]);

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
    <Container>
      <Carousel />
      <Wrapper>
        <Sort onClick={sortClicked}>전체</Sort>
        <Sort onClick={sortClicked}>공개</Sort>
        <Sort onClick={sortClicked}>비공개</Sort>
      </Wrapper>

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
                <div ref={ref}>
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
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 10px;
  padding: 5px 10px;
  border: 1px solid #1dbe8e;
  border-radius: 7px;
  background-color: transparent;
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
