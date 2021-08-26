import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useRecoilState } from 'recoil';

// import { useQuery } from 'react-query';
import axios from 'axios';

import { Modal } from 'components/Modal';
import PwMForm from 'components/Card/Form/PwForm';
import { chkPwd } from 'Validation/Validation';
import CollectionData from 'pages/Collection/PostBoxList/CollectionData';

import { POSTBOXES_API, POSTBOXES_COLLECTION_API } from 'config';
import { tokenUtils } from 'components/Utils/token';

import { PostBoxList } from 'pages/Collection/PostBoxList';
import { modalState } from 'atom';

const Collection = props => {
  // const { isLoading, data, error } = useQuery();
  const params = useParams();

  const [collectionList, setCollectionList] = useState([]);
  const [collectionData, setCollectionData] = useState();
  const [passwordInput, setPasswordInput] = useState('');
  const [chkPublic, setChkPublic] = useState({ id: '', isPublic: false });

  const [isModal, setIsModal] = useRecoilState(modalState);

  useEffect(() => {
    props.handleNavHidden(false);
  });

  // Nav 컴포넌트 숨기기
  useEffect(() => {
    props.handleNavHidden(false);
  });

  useEffect(() => {
    axios
      .post(`${POSTBOXES_API}/uuid`, {
        uuid: params.q,
      })
      .then(res => {
        // 우체통이 비공개일 때, 비밀번호 모달 실행
        if (res.data.is_public === false) {
          setIsModal({ type: 'collectionPw', status: true });
          setChkPublic({ id: res.data.id, isPublic: res.data.is_public });
          return;
        }

        // 우체통이 공개일 때,바로 데이터 받아오기
        if (res.data.is_public) {
          axios
            .get(`${POSTBOXES_COLLECTION_API}?uuid=${params.q}`)
            .then(res => {
              res.status === 200 && setCollectionList(res.data.results);
            });
        }
      });
  }, []);

  const handleForm = e => {
    setPasswordInput(e.target.value);
  };

  const checkPw = async () => {
    if (chkPwd(passwordInput)) {
      await axios
        .post(`${POSTBOXES_API}/access`, {
          id: chkPublic.id,
          password: passwordInput,
        })
        .then(res => {
          if (res.status === 200) {
            tokenUtils.setToken(res.data.token);
            setIsModal({ type: 'collectionPw', status: false });
          }
        })
        .catch(error => {
          error.response.status === 403 &&
            alert('입력하신 비밀번호를 다시 확인해주세요.');
        });

      axios
        .get(
          `${POSTBOXES_COLLECTION_API}?uuid=${params.q}`,
          tokenUtils.getToken()
        )
        .then(res => {
          if (res.status === 200) {
            setIsModal({ type: 'collectionPw', status: false });
            setCollectionList(res.data.results);
            tokenUtils.removeToken();
          }
        });
    }

    if (passwordInput.length < 8)
      return alert('숫자와 영문자 조합으로 8~15자리를 사용해야 합니다.');
  };

  const handleOpenModal = data => {
    setCollectionData(data);
    setIsModal({ type: 'collectionModal', status: true });
    document.body.style.overflow = 'hidden';
  };

  return (
    <>
      <Title>
        <h1>우체통에 들어있는 편지들</h1>
      </Title>
      <Container>
        {isModal.type === 'collectionModal' && isModal.status && (
          <Modal header="받은 메시지">
            <CollectionData
              nickName={collectionData.nickname}
              imageUrl={collectionData.image_url}
              caption={collectionData.caption}
            />
          </Modal>
        )}
        {collectionList.map(data => (
          <PostBoxList handleOpenModal={handleOpenModal} data={data} />
        ))}
        {isModal.type === 'collectionPw' && isModal.status && (
          <Modal header="비밀번호">
            <PwMForm handleForm={handleForm} checkPw={checkPw} />
          </Modal>
        )}
      </Container>
    </>
  );
};

export default Collection;

const Title = styled.div`
  margin: 64px 100px;
  font-size: 36px;
`;

const Container = styled.div`
  margin: 60px 100px;
  column-width: 260px;
  column-gap: 20px;
`;
