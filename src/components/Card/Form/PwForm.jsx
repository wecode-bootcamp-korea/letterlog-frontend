import React from 'react';
import styled from 'styled-components';

const PwForm = ({ handleForm, checkPw }) => {
  const enterSubmit = e => {
    if (e.keyCode === 13) {
      checkPw();
    }
  };

  return (
    <>
      <div>비밀번호를 입력하세요(숫자와 영문자 조합 8~15자리.)</div>
      <input
        onKeyUp={enterSubmit}
        type="password"
        name="pwInput"
        onChange={handleForm}
      />
      <Footer>
        <Close onClick={checkPw}>확인</Close>
      </Footer>
    </>
  );
};

export default PwForm;

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
