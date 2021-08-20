import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import FilterCardBox from './FilterCardBox/FilterCardBox';
import { POSTBOXES_API } from '../../config';
import { useRecoilState } from 'recoil';
import { searchInputSelector } from '../../atom';

const Search = () => {
  const [letterBoxList, setLetterBoxList] = useState([]);
  const [searchInput] = useRecoilState(searchInputSelector);

  useEffect(() => {
    axios.get(`${POSTBOXES_API}`).then(({ data }) => {
      setLetterBoxList(data.results);
    });
  }, []);

  const filterPost = letterBoxList.filter(item => {
    return item.name.includes(searchInput.toLowerCase());
  }, []);

  return (
    <Container>
      <FilterCardBox filterPost={filterPost} />
    </Container>
  );
};

export default Search;

const Container = styled.div`
  ${props => props.theme.setFlex()}
  flex-direction: column;
  margin: 160px 0 80px;
`;
