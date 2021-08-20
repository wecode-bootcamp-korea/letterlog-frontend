import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import axios from 'axios';

import { POSTBOXES_COLLECTION_API } from '../../config';

import PostBoxList from './PostBoxList/PostBoxList';

const Collection = () => {
  const [collectionData, setCollectionData] = useState([]);

  const params = useParams();

  // useEffect(() => {
  //   axios
  //     .get(`${POSTBOXES_COLLECTION_API}?uuid=${params.q}`)
  //     .then(res => setCollectionData(res.data));
  // }, []);

  // 목데이터;
  useEffect(() => {
    axios
      .get('/data/CollectionData.json')
      .then(res => setCollectionData(res.data.result));
  }, []);

  return (
    <Container>
      {collectionData.map(data => (
        <PostBoxList
          nickName={data.nickname}
          imageUrl={data.image_url}
          caption={data.caption}
        />
      ))}
    </Container>
  );
};

export default Collection;

const Container = styled.div`
  margin: 140px 100px;
  column-width: 260px;
  column-gap: 20px;
`;
