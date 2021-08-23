import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { modalState } from 'atom';

const Modal = ({ header, children }) => {
  const setIsModal = useSetRecoilState(modalState);

  const closeModal = () => {
    setIsModal({ status: false });
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <Wrapper>
        <Section>
          <Header>
            {header}
            <Close onClick={closeModal}>&times;</Close>
          </Header>
          <Main>{children}</Main>
        </Section>
      </Wrapper>
    </>
  );
};

export default Modal;

const Wrapper = styled.div`
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Close = styled.button`
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

const Header = styled.div`
  position: relative;
  padding: 16px 64px 16px 16px;
  background-color: #f1f1f1;
  font-weight: 700;
`;

const Section = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 450px;
  max-height: 95vh;
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
