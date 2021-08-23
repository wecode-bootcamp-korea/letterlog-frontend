import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useRecoilState } from 'recoil';

import { useQuery } from 'react-query';
import axios from 'axios';

import { Modal } from 'components/Modal';
import PwMForm from 'components/Card/Form/PwForm';
import { chkPwd } from 'Validation/Validation';

import { POSTBOXES_API, POSTBOXES_COLLECTION_API } from 'config';
import { tokenUtils } from 'components/Utils/token';

import { PostBoxList } from 'pages/Collection/PostBoxList';
import { modalState } from 'atom';

const Collection = props => {
  const [collectionData, setCollectionData] = useState([]);
  const [passwordInput, setPasswordInput] = useState('');
  const [chkPublic, setChkPublic] = useState({ id: '', isPublic: false });

  const [isModal, setIsModal] = useRecoilState(modalState);

  const params = useParams();

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
        if (res.data.is_public === false) {
          setIsModal({ type: 'collectionPw', status: true });
          setChkPublic({ id: res.data.id, isPublic: res.data.is_public });
        }
        return;
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
            return;
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
            setCollectionData(res.data.results);
          }
        });
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
      {collectionData.map((data, id) => (
        <PostBoxList collectionData={collectionData} data={data} id={id} />
      ))}
      {isModal.type === 'collectionPw' && isModal.status && (
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
