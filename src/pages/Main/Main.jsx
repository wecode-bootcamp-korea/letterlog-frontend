import React, { useState, useEffect } from 'react';
// Library
import axios from 'axios';
import styled from 'styled-components/macro';
import { useInView } from 'react-intersection-observer';
//Components
import { POSTBOXES_API } from 'config';
import { Carousel } from 'pages/Main/Carousel';
import PostBoxList from './PostBoxList/PostBoxList';

const Main = () => {
  //filter
  const [sortList, setSortList] = useState('');
  //pagination
  const [trigger, setTrigger] = useState();
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState();
  //letterBoxList
  const [letterBoxList, setLetterBoxList] = useState([]);

  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  const getItems = () => {
    axios.get(`${POSTBOXES_API}?page=${page}&status=${sortList}`).then(res => {
      setNextPage(res.data.next);
      setLetterBoxList(prevState => [...prevState, ...res.data.results]);
      setLoading(false);
    });
  };

  useEffect(() => {
    getItems();
  }, [page, sortList, trigger]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      if (nextPage === null) {
        setLoading(false);
      } else {
        setLoading(true);
        setPage(prevState => prevState + 1);
      }
    }
  }, [inView]);

  const sortClicked = e => {
    const filterType = e.target.innerText;

    const setFilterType = t => {
      setLetterBoxList([]);
      setTrigger(Math.random());
      setPage(1);
      setSortList(t);
    };

    const filterTypeToEng = {
      전체: '',
      공개: 'public',
      비공개: 'private',
    };
    setFilterType(filterTypeToEng[filterType]);
  };

  return (
    <Container>
      <Carousel />
      <Wrapper>
        <Sort onClick={sortClicked}>전체</Sort>
        <Sort onClick={sortClicked}>공개</Sort>
        <Sort onClick={sortClicked}>비공개</Sort>
      </Wrapper>
      <PostBoxList letterBoxList={letterBoxList} cardRef={ref} />
    </Container>
  );
};

export default Main;

const Container = styled.div`
  ${props => props.theme.setFlex('center', 'center')};
  flex-direction: column;
  margin-top: 111px;
  width: 100vw;
  height: 100%;
`;

const Wrapper = styled.div`
  ${props => props.theme.setFlex('flex-end', 'center')};
  width: 90%;
  margin-top: 30px;
`;

const Sort = styled.button`
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 10px;
  padding: 5px 10px;
  border: 1px solid #1dbe8e;
  border-radius: 7px;
  background-color: transparent;
  cursor: pointer;
`;
