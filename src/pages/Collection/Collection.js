import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import styled from 'styled-components';
import axios from 'axios';

import { POSTBOXES_API } from '../../config';

import PostBoxList from './PostBoxList/PostBoxList';

const Collection = () => {
  const [collectionData, setCollectionData] = useState([]);

  const params = useParams();

  console.log(`params.q`, params.q);

  useEffect(() => {
    axios
      .get(`http://13.124.4.250:8000/postboxes/collection?uuid=${params.q}`)
      .then(res => setCollectionData(res.data));
  }, []);

  // collection?uuid=977c411ad1b54dab9ad5449bf66614e1

  // console.log(`collectionsData`, collectionData);

  // useEffect(() => {
  //   console.log('asdasd');
  //   axios
  //     .get('/data/CollectionData.json')
  //     .then(res => setCollectionData(res.data.result));
  // }, []);

  return (
    <Container>
      {collectionData.map(data => (
        <PostBoxList data={data} />
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
