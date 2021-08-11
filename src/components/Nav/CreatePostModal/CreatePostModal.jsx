import React, { useState } from 'react';
import styled from 'styled-components';
import EmailList from './EmailList';

// import { useRecoilState } from 'recoil';
// import { emailListState, emailTextState } from '../../../atom';

const CreatePostModal = props => {
  // const [emailList, setEmailList] = useRecoilState(emailListState);
  // const [emailText, setEmailText] = useRecoilState(emailTextState);

  const handleinputEmail = e => {
    setEmailText(e.target.value);
  };

  const [emailList, setEmailList] = useState([]);
  const [emailText, setEmailText] = useState('');
  const [createFormData, setCreateFormData] = useState({
    name: '',
    password: '',
    is_public: '',
    send_at: '',
    receivers: [],
  });

  const handleFromData = e => {
    const { name, value } = e.target;
    setCreateFormData({ ...createFormData, [name]: value });
  };

  console.log('formData', createFormData);

  const onCreateSubmit = () => {
    console.log('Submit 서버에 보내기');
  };

  const handleAddEmail = () => {
    if (emailText !== '') {
      if (emailText.includes('@') && !emailList.includes(emailText)) {
        emailList.push(emailText);
      } else if (emailList.includes(emailText)) {
        alert('중복된 이메일입니다.');
      } else {
        alert('이메일 양식에 맞춰 작성해주세요.');
      }
    }

    setEmailList(emailList);
    setEmailText('');
  };

  const emailInputKeypress = e => {
    e.key === 'Enter' && handleAddEmail();
  };

  const removeEmail = id => {
    emailList.splice(id, 1);
    setEmailList(emailList.filter(email => email.id !== id));
  };

  return (
    <div>
      <ModalBg onClick={props.closeModal} />
      <ModalSquare>
        <h3>생성 내용</h3>
        <CreateContainer>
          <CreateTitle>우체통 이름</CreateTitle>
          <CreateTextInput
            type="text"
            name="name"
            onChange={handleFromData}
            maxLength="40"
          />
        </CreateContainer>
        <CreateContainer>
          <CreateTitle>받을 날짜</CreateTitle>
          <CreateTextInput
            type="text"
            name="send_at"
            onChange={handleFromData}
          />
          <AlarmText>편지 보내기는 12월 24일 12:00 정각에 마감되며,</AlarmText>
          <AlarmText>편지는 12월 31일 12:00 정각에 발송됩니다.</AlarmText>
        </CreateContainer>
        <CreateContainer>
          <CreateTitle>받을 이메일</CreateTitle>
          <CreateEmailInput
            type="text"
            name="receivers"
            onChange={handleinputEmail}
            value={emailText}
            onKeyPress={emailInputKeypress}
            maxLength="32"
          />
          <EmailAddBtn type="button" onClick={handleAddEmail}>
            추가
          </EmailAddBtn>
        </CreateContainer>
        {emailList &&
          emailList.map((email, id) => {
            return (
              <EmailList email={email} id={id} removeEmail={removeEmail} />
            );
          })}
        <Line />
        <CreateContainer>
          <CreateTitle>공개 여부</CreateTitle>
          <div>
            <span>
              <CreateRadioInput type="radio" name="chk_info" />
              공개
            </span>
            <span>
              <CreateRadioInput type="radio" name="chk_info" />
              비공개
            </span>
          </div>
        </CreateContainer>
        <CreateContainer>
          <CreateTitle>비밀 코드</CreateTitle>
          <CreatePasswordInput
            type="password"
            name="password"
            onChange={handleFromData}
            maxLength="12"
          />
        </CreateContainer>
        <CreateSubmitBtn onClink={onCreateSubmit}>생성하기</CreateSubmitBtn>
      </ModalSquare>
    </div>
  );
};

export default CreatePostModal;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalSquare = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  margin: auto;
  padding: 40px;
  width: 500px;
  border-radius: 28px;
  background-color: #fff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);

  h3 {
    margin: 0 0 40px;
    font-size: 24px;
    font-weight: 600;
  }
`;

const CreateContainer = styled.div`
  margin: 0 0 20px 0;
  text-align: right;

  div {
    display: inline-block;
    width: 70%;
  }

  span {
    display: inline-block;
    width: 40%;
    text-align: center;
  }
`;

const CreateTitle = styled.p`
  display: inline-block;
`;

const CreateTextInput = styled.input`
  width: 60%;
  height: 30px;
  padding: 0 6px;
  margin: 0 20px;
  font-size: 14px;
  outline-style: none;
`;

const CreateEmailInput = styled.input`
  width: 60%;
  height: 30px;
  padding: 0 40px 0 6px;
  margin: 0 20px;
  font-size: 14px;
  outline-style: none;
`;

const EmailAddBtn = styled.button`
  position: absolute;
  top: 248px;
  right: 64px;
  font-weight: 400;
  background-color: #fff;
  border-style: none;
  color: #1dbe8e;

  &:hover {
    cursor: pointer;
  }
`;

const CreateRadioInput = styled.input``;

const AlarmText = styled.p`
  margin: 8px 22px 0 6px;
  font-size: 12px;
  font-weight: 300;
  color: #a2a2a2;
`;

const CreateSubmitBtn = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 16px;
  font-size: 16px;
  line-height: 2;
  border-style: none;
  border-radius: 8px;
  color: #fff;
  background-color: #1dbe8e;

  &:hover {
    cursor: pointer;
  }
`;

const CreatePasswordInput = styled.input`
  width: 60%;
  height: 30px;
  padding: 0 6px;
  margin: 0 20px;
  outline-style: none;
  font-family: 'pass', 'Roboto', Helvetica, Arial, sans-serif;
  font-size: 18px;
`;

const Line = styled.hr`
  width: 400px;
  margin: 30px 0 30px;
  border-style: none;
  border-bottom: 1px solid #e9e9e9;
`;
