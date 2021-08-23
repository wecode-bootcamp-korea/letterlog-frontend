import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import axios from 'axios';

import { Modal } from 'components/Modal';
import PwMForm from 'components/Card/Form/PwForm';
import { chkPwd } from 'Validation/Validation';

import {
  COLLECTION_UUID,
  POSTBOXES_API,
  POSTBOXES_COLLECTION_API,
} from 'config';

import { PostBoxList } from 'pages/Collection/PostBoxList';
import { modalState } from 'atom';

const Collection = () => {
  const [collectionData, setCollectionData] = useState([]);
  const [isModal, setIsModal] = useState(modalState);
  const [passwordInput, setPasswordInput] = useState('');
  const [chkPublic, setChkPublic] = useState({ id: '', isPublic: false });

  const params = useParams();

  useEffect(() => {
    axios
      .post(`${COLLECTION_UUID}`, {
        uuid: params.q,
      })
      .then(res => {
        console.log(`res`, res);
        // res.is_public === false &&
        //   setIsModal({ type: 'collectionPw', status: true });
        // setChkPublic({ id: res.id, isPublic: res.is_public });
      });
  }, []);

  console.log(`params.q`, params.q);

  const handleForm = e => {
    setPasswordInput(e.target.value);
  };

  const checkPw = () => {
    if (chkPwd(passwordInput)) {
      axios
        .post(`${POSTBOXES_API}`, {
          id: chkPublic.id,
          password: passwordInput,
        })
        .then(res => setCollectionData(res.data));
    } else {
      alert('입력하신 비밀번호를 다시 확인해주세요.');
    }
  };

  // 목데이터;
  // useEffect(() => {
  //   axios
  //     .get('/data/CollectionData.json')
  //     .then(res => setCollectionData(res.data.result));
  // }, []);

  return (
    <Container>
      {collectionData.map(data => (
        <PostBoxList
          nickName={data.nickname}
          imageUrl={data.image_url}
          caption={data.caption}
        />
      ))}
      {isModal.type === 'collectionPw' && (
        <Modal header="비밀번호">
          <PwMForm handleForm={handleForm} checkPw={checkPw} />
        </Modal>
      )}
    </Container>
  );
};

export default Collection;

const Container = styled.div`
  margin: 140px 100px;
  column-width: 260px;
  column-gap: 20px;
`;
