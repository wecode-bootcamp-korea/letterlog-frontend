import React from 'react';
import styled from 'styled-components';

const MainModal = ({ handleForm, fileChangedHandler, sendMail }) => {
  return (
    <div>
      <div>닉네임</div>
      <input type="text" name="nameInput" onChange={handleForm} />
      <div>이미지 업로드</div>
      <input type="file" name="selectedFiles" onChange={fileChangedHandler} />
      <div>텍스트(50자 이내)</div>
      <input type="text" name="textInput" onChange={handleForm} />
      <Footer>
        <Close onClick={sendMail}>보내기</Close>
      </Footer>
    </div>
  );
};

export default MainModal;

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
