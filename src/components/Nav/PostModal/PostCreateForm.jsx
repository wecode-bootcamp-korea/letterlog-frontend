import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';

import { modalState } from 'atom';
import { POSTBOXES_API } from 'config';
import { chkPwd, chkEmail, chkDate } from 'Validation/Validation';
import dayjs from 'dayjs';

import EmailList from './EmailList';

const PostCreateForm = () => {
  const setIsModalOpen = useSetRecoilState(modalState);
  const emailTagHeight = useRef();

  const history = useHistory();

  const [inputData, setInputData] = useState({
    name: '',
    password: '',
    send_at: '',
  });

  const [emailText, setEmailText] = useState('');
  const [emailList, setEmailList] = useState([]);
  const [isRadioValue, setIsRadioValue] = useState('');
  const [addBtnDisabled, setAddBtnDisabled] = useState(true);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleInputData = e => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  // email 입력란에 텍스트가 입력되었는지 체크
  useEffect(() => {
    emailText === '' ? setAddBtnDisabled(true) : setAddBtnDisabled(false);
  }, [emailText]);

  const handleEmailText = e => {
    setEmailText(e.target.value);
  };

  // input에 값이 입력 되었는지 체크
  useEffect(() => {
    const isValidation = value => value.length > 0;
    const target = [inputData.name, inputData.send_at, emailList, isRadioValue];

    const chkValidation = target.every(isValidation);

    if (chkValidation && isRadioValue === 'true') {
      setSubmitDisabled(false);
    } else if (
      chkValidation &&
      isRadioValue === 'false' &&
      inputData.password !== ''
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [inputData, isRadioValue, emailList]);

  // 라디오값 체크
  const handlePublic = radioValue => {
    radioValue === 'true' ? setIsRadioValue('true') : setIsRadioValue('false');
  };

  // 이메일 입력값 체크
  const handleAddEmail = () => {
    if (!chkEmail(emailText)) {
      alert('메일 양식에 맞춰 작성해주세요.');
    } else {
      setEmailList(emailList.concat([{ email: emailText }]));
      setEmailText('');
    }
  };

  // 작성 완료 후 제출
  const handleSubmit = async () => {
    await axios.get(`${POSTBOXES_API}`).then(res => {
      for (let item of res.data.results) {
        item.name === inputData.name && alert('우체통 이름이 중복됩니다.');

        const today = dayjs().format('YYYY-MM-DD');

        chkDate(inputData.send_at) &&
          inputData.send_at < today &&
          alert('날짜를 확인해주세요.');
        return;
      }
    });

    axios
      .post(`${POSTBOXES_API}`, {
        name: inputData.name.replace(/ +/g, ' ').trim(),
        password: inputData.password,
        is_public: isRadioValue,
        send_at: inputData.send_at,
        receivers: emailList,
      })
      .then(res => {
        if (res.status === 201) {
          alert('생성 완료');
          setIsModalOpen(false);
          history.push('/');
          window.location.reload();

          return;
        }
      });
  };

  const InputKeyEnter = e => {
    e.key === 'Enter' && handleAddEmail();
  };

  const removeEmail = id => {
    emailList.splice(id, 1);
    setEmailList(emailList.filter(email => email.id !== id));
  };

  return (
    <>
      <Container>
        <Title>우체통 이름</Title>
        <NameInput
          type="text"
          name="name"
          onChange={handleInputData}
          placeholder="여백은 띄어쓰기만 적용됩니다."
          maxLength="40"
          required
        />
      </Container>
      <Container>
        <Title>받을 날짜</Title>
        <SendAtInput
          type="text"
          name="send_at"
          onChange={handleInputData}
          placeholder="yyyy-mm-dd 형식으로 입력해주세요."
          maxLength="10"
          required
        />
        <AlarmText>
          편지는 당일 12:00에 발송되며,
          <br />
          보내기는 하루 전 12:00까지 가능합니다.
        </AlarmText>
      </Container>
      <Container>
        <Title>받을 이메일</Title>
        <EmailInput
          type="text"
          onChange={handleEmailText}
          value={emailText}
          onKeyPress={InputKeyEnter}
          maxLength="32"
        />
        <EmailAddBtn
          type="button"
          onClick={handleAddEmail}
          disabled={addBtnDisabled}
        >
          추가
        </EmailAddBtn>
      </Container>
      <EmailListContainer>
        {emailList &&
          emailList.map((email, id) => {
            return (
              <EmailList
                email={email.email}
                id={id}
                removeEmail={removeEmail}
              />
            );
          })}
      </EmailListContainer>
      <Line />
      <Container>
        <Title>공개 여부</Title>
        <div>
          <label htmlFor="radioPublic">
            <input
              id="radioPublic"
              type="radio"
              name="isPublicRadio"
              value="true"
              checked={isRadioValue === 'true'}
              onChange={() => handlePublic('true')}
            />
            공개
          </label>
          <label htmlFor="radioPrivate">
            <input
              id="radioPrivate"
              type="radio"
              name="isPublicRadio"
              value="false"
              checked={isRadioValue === 'false'}
              onChange={() => handlePublic('false')}
            />
            비공개
          </label>
        </div>
      </Container>
      {isRadioValue === 'false' && (
        <Container>
          <Title>비밀코드</Title>
          <PasswordInput
            type="password"
            name="password"
            onChange={handleInputData}
            maxLength="15"
            required
            placeholder="비밀코드는 8자로 설정해주세요."
          />
        </Container>
      )}
      <SubmitBtn onClick={handleSubmit} disabled={submitDisabled}>
        생성하기
      </SubmitBtn>
    </>
  );
};

export default PostCreateForm;

const Container = styled.div`
  margin: 0 0 12px 0;
  text-align: right;

  div {
    display: inline-block;
    width: 70%;
  }

  label {
    display: inline-block;
    width: 40%;
    text-align: center;
  }
`;

const Title = styled.p`
  display: inline-block;
`;

const NameInput = styled.input`
  width: 60%;
  padding: 0 6px;
  margin: 0 20px;
  font-size: 14px;
  outline-style: none;
`;

const SendAtInput = styled.input`
  width: 60%;
  padding: 0 6px;
  margin: 0 20px;
  font-size: 14px;
  outline-style: none;
`;

const EmailInput = styled.input`
  width: 60%;
  padding: 0 40px 0 6px;
  margin: 0 20px;
  font-size: 14px;
  outline-style: none;
`;

const EmailAddBtn = styled.button`
  position: absolute;
  top: 220px;
  right: 48px;
  font-weight: 400;
  background-color: #fff;
  border-style: none;
  color: #1dbe8e;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    color: #d3d3d3;
    cursor: default;
  }
`;

const AlarmText = styled.p`
  margin: 8px 22px 0 6px;
  font-size: 12px;
  font-weight: 300;
  line-height: 1.4;
  color: #a2a2a2;
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 50px;
  font-size: 16px;
  line-height: 2;
  border-style: none;
  border-radius: 8px;
  color: #fff;
  background-color: #1dbe8e;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    background-color: #d3d3d3;
    cursor: default;
  }
`;

const PasswordInput = styled.input`
  width: 60%;
  padding: 0 6px;
  margin: 0 20px;
  outline-style: none;
`;

const Line = styled.hr`
  width: 400px;
  margin: 15px 0 15px;
  border-style: none;
  border-bottom: 1px solid #e9e9e9;
`;

const EmailListContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 20px;
  padding: 0 10px;
  width: 100%;
  height: 80px;
  text-align: right;
`;
