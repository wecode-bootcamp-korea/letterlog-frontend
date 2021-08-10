import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PasswordModal from './PasswordModal';
import { SEND_API } from '../../config';

import { useRecoilState } from 'recoil';
import { selectedFilesState, nameInputState, textInputState } from '../../atom';

const Modal = props => {
  const { open, close, header } = props;

  const [selectedFiles, setSelectedFiles] = useRecoilState(selectedFilesState);
  const [nameInput, setNameInput] = useRecoilState(nameInputState);
  const [textInput, setTextInput] = useRecoilState(textInputState);

  const fileChangedHandler = e => {
    setSelectedFiles(e.target.files[0]);
  };
  const handleNameInput = e => {
    setNameInput(e.target.value);
  };
  const handleTextInput = e => {
    setTextInput(e.target.value);
  };

  console.log(selectedFiles);
  console.log(`nameInput`, nameInput);
  console.log(`textInput`, textInput);

  const sendMail = () => {
    const formData = new FormData();
    formData.append('image_url', selectedFiles);
    formData.append('nickname', nameInput);
    formData.append('caption', textInput);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(`${SEND_API}`, formData, config);
    close();
  };

  return (
    <>
      <PasswordModal
        open={open}
        close={close}
        header="비밀번호를 입력하세요."
      />
      <Wrapper isOpen={open}>
        {open ? (
          <Section>
            <Header>
              {header}
              <CloseX onClick={close}>&times;</CloseX>
            </Header>
            <Main>
              <div>닉네임</div>
              {/* 닉네임 조건 걸어야 함 */}
              <input type="text" onChange={handleNameInput} />
              <div>이미지 업로드</div>
              {/* 이미지 업로드 post */}
              <input type="File" onChange={fileChangedHandler} />
              <div>텍스트(50자 이내)</div>
              {/* 텍스트 조건 걸어야 함 */}
              <input type="text" onChange={handleTextInput} />
            </Main>
            <Footer>
              <Close onClick={sendMail}>보내기</Close>
            </Footer>
          </Section>
        ) : null}
      </Wrapper>
    </>
  );
};

export default Modal;

const Wrapper = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-top: 17%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.6);
`;

const CloseX = styled.button`
  outline: none;
  cursor: pointer;
  border: 0;

  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  font-size: 21px;
  font-weight: 700;
  text-align: center;
  color: #999;
  background-color: transparent;
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

const Footer = styled.div`
  padding: 12px 16px;
  text-align: right;
`;

const Header = styled.div`
  position: relative;
  padding: 16px 64px 16px 16px;
  background-color: #f1f1f1;
  font-weight: 700;
`;

const Section = styled.div`
  width: 90%;
  max-width: 450px;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #fff;
  /* 팝업열릴때 효과 */
  animation: modal-show 0.3s;
  overflow: hidden;
`;

const Main = styled.div`
  padding: 16px;
  border-bottom: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;

  div {
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;
