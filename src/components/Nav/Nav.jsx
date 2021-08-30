import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { useRecoilState } from 'recoil';
import { modalState, searchInputState } from 'atom';

import { Modal } from 'components/Modal';
import PostCreateForm from 'components/Nav/PostModal/PostCreateForm';

const Nav = () => {
  const history = useHistory();

  const [isModal, setIsModal] = useRecoilState(modalState);

  const [searchInput, setSearchInput] = useRecoilState(searchInputState);

  const InputKeyEnter = e => {
    searchInput && e.key === 'Enter' && history.push('/search');
  };

  const handleModalOpen = () => {
    setIsModal({ type: 'create', status: true });
    document.body.style.overflow = 'hidden';
  };

  return (
    <Section>
      <Container>
        <Logo to="/">LETTER LOG</Logo>
        <Menu>
          <IconSearch>
            <i className="fas fa-search"></i>
          </IconSearch>
          <InputSearch
            onChange={e => setSearchInput(e.target.value)}
            onKeyPress={InputKeyEnter}
            type="text"
            placeholder="우체통을 검색해주세요."
          />
          {isModal.type === 'create' && isModal.status && (
            <Modal header="우체통 만들기">
              <PostCreateForm isModal={isModal} />
            </Modal>
          )}
          <CreatePostBtn onClick={handleModalOpen}>우체통 만들기</CreatePostBtn>
        </Menu>
      </Container>
    </Section>
  );
};

export default Nav;

const Section = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
  z-index: 999;
  background-color: #ffff;
`;

const Container = styled.div`
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

const Menu = styled.div`
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
