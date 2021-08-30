import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { debounce } from 'lodash';

import axios from 'axios';
import { POSTBOXES_API } from 'config';

import PostBoxList from 'pages/Main/PostBoxList/PostBoxList';
import { searchInputState } from 'atom';

const Search = () => {
  const [filterBoxList, setFilterBoxList] = useState([]);
  const [searchInput] = useRecoilState(searchInputState);

  useEffect(() => {
    if (!searchInput) delaySetInput([]);
    else
      axios
        .get(`${POSTBOXES_API}?search=${searchInput}&search_option=naive`)
        .then(({ data }) => {
          delaySetInput(data.results);
        });
  }, [searchInput]);

  const delaySetInput = useCallback(
    debounce(data => {
      setFilterBoxList(data);
    }, 340),
    [filterBoxList]
  );

  return (
    <Container>
      {/* 입력을 안했거나 검색 결과가 없을 때*/}
      {!filterBoxList.length && (
        <NotResult>
          <p>...</p>
          <NotKeyword>
            {!searchInput
              ? '검색어를 입력해주세요.'
              : '검색어와 일치하는 우체통이 없습니다.'}
          </NotKeyword>
        </NotResult>
      )}

      {/* 검색 결과가 있을 경우 */}
      {filterBoxList.length > 0 && (
        <PostBoxList letterBoxList={filterBoxList} />
      )}
    </Container>
  );
};

export default Search;

const Container = styled.div`
  ${props => props.theme.setFlex()}
  flex-direction: column;
  margin: 160px 0 80px;
`;

const NotKeyword = styled.div`
  margin-top: 40px;
`;

const NotResult = styled.div`
  text-align: center;

  p {
    color: #d2d2d2;
    font-size: 60px;
    letter-spacing: 8px;
  }
`;
