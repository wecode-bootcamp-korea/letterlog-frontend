import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import axios from 'axios';
import { POSTBOXES_API } from 'config';

import PostBoxList from 'pages/Main/PostBoxList/PostBoxList';
import { searchInputState } from 'atom';

const Search = () => {
  const [filterBoxList, setFilterBoxList] = useState([]);
  const [searchInput] = useRecoilState(searchInputState);

  useEffect(() => {
    axios.get(`${POSTBOXES_API}?search=${searchInput}`).then(({ data }) => {
      setFilterBoxList(data.results);
    });
  }, [searchInput]);

  return (
    <Container>
      <PostBoxList letterBoxList={filterBoxList} />
    </Container>
  );
};

export default Search;

const Container = styled.div`
  ${props => props.theme.setFlex()}
  flex-direction: column;
  margin: 160px 0 80px;
`;
