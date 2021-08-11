import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import { useRecoilState } from 'recoil';
import { modalState } from '../../atom';
import ModalChild from './PostModal/ModalChild';

const Nav = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);

  const handleModalOpen = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <NavSection>
      <ContentContainer>
        <Logo to="/">LETTER LOG</Logo>
        <NavIconConttainer>
          <IconSearch>
            <i className="fas fa-search"></i>
          </IconSearch>
          <InputSearch placeholder="우체통을 검색해주세요." />
          {isModalOpen && (
            <Modal closeModal={closeModal}>
              <ModalChild closeModal={closeModal} />
            </Modal>
          )}
          <CreatePostBtn onClick={handleModalOpen}>우체통 만들기</CreatePostBtn>
        </NavIconConttainer>
      </ContentContainer>
    </NavSection>
  );
};

export default Nav;

const NavSection = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
  z-index: 999;
  background-color: #ffff;
`;

const ContentContainer = styled.div`
  ${({ theme }) => theme.setFlex('space-between')}
  height: 111px;
  padding: 0 120px;
`;

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 18px;
  font-weight: 800;
  color: ${({ theme }) => theme.fontColor};
`;

const NavIconConttainer = styled.div`
  ${({ theme }) => theme.setFlex('stretch')}
`;

const IconSearch = styled.div`
  &:hover {
    cursor: pointer;
  }

  i {
    font-size: 20px;
    color: ${({ theme }) => theme.fontColor};
  }
`;

const InputSearch = styled.input`
  font-size: 16px;
  margin: 0 10px;
  border-style: none;
  border-bottom: 1px solid ${({ theme }) => theme.fontColor};
  outline: none;

  &::placeholder {
    font-weight: 300;
    color: ${({ theme }) => theme.subFontColor};
  }
`;

const CreatePostBtn = styled.p`
  margin: 0 10px;
  color: ${({ theme }) => theme.fontColor};

  &:hover {
    cursor: pointer;
  }
`;
