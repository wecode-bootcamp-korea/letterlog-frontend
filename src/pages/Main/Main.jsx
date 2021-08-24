import React, { useState, useEffect, useCallback } from 'react';
// Library
import axios from 'axios';
import styled from 'styled-components/macro';
import { useInView } from 'react-intersection-observer';
//Components
import { Carousel } from 'pages/Main/Carousel';
import { POSTBOXES_API } from 'config';
import { Card } from 'components/Card';

const Main = () => {
  //filter
  const [sortList, setSortList] = useState('');
  //pagination
  const [trigger, setTrigger] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();
  //letterBoxList
  const [letterBoxList, setLetterBoxList] = useState([]);

  const getItems = useCallback(async () => {
    setLoading(true);
    await axios
      .get(`${POSTBOXES_API}?page=${page}&status=${sortList}`)
      .then(res => {
        setLetterBoxList(prevState => [...prevState, ...res.data.results]);
        setLoading(false);
      });
  }, [page, sortList, trigger]);

  // `getItems` 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setPage(prevState => prevState + 1);
    }
  }, [inView, loading]);

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
      <Grid>
        {letterBoxList.map((letterBox, idx) => (
          <React.Fragment key={idx}>
            {letterBoxList.length - 1 === idx ? (
              <div ref={ref}>
                <Card key={idx} letterBox={letterBox} />
              </div>
            ) : (
              <Card key={idx} letterBox={letterBox} />
            )}
          </React.Fragment>
        ))}
      </Grid>
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
  background-color: transparent;
  border: 1px solid #1dbe8e;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  border-radius: 10px;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 12px;
  column-gap: 12px;
  padding: 50px;
  width: 90%;
  background-color: #f1f1f1;
`;
