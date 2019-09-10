import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { collectionApi } from "../../api";
import styled from "styled-components";
import Loader from "../../Components/Loader";

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  position: relative;
  z-index: 1;
  overflow: auto;
  height: 100%;
`;

const Item = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  :not(:last-child) {
    margin-bottom: 10px;
  }
`;

const ItemTitle = styled.span`
  color: white;
  font-size: 20px;
`;

const Cover = styled.div`
  width: 200px;
  background-image: url(${props => props.poster_path});
  background-position: center center;
  background-size: cover;
  height: 300px;
  border-radius: 5px;
`;

const CoverContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  background-color: black;
  cursor: pointer;
  &:hover {
    ${Cover} {
      opacity: 0.6;
    }
  }
`;

const Overview = styled.p`
  margin-top: 10px;
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const Content = styled.div`
  margin-left: 20px;
  width: 60%;
`;

const collectionApiFn = async (id, setData, setLoading) => {
  try {
    const { data } = await collectionApi.getCollection(id);
    setData(data);
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

const Collections = props => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const {
      match: {
        params: { id }
      }
    } = props;

    collectionApiFn(id, setData, setLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(data);
  return loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />>
    </>
  ) : (
    <Container>
      <Helmet>
        <title>{`Loading | ${data.name}`}</title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
      />
      <ItemList>
        {data.parts.length > 0 &&
          data.parts.map((item, index) => (
            <Item key={index}>
              <Link to={`/movie/${item.id}`}>
                <CoverContainer>
                  <Cover
                    poster_path={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                        : require("../../assets/noPosterSmall.png")
                    }
                  ></Cover>
                </CoverContainer>
              </Link>

              <Content>
                <ItemTitle>{item.title}</ItemTitle>
                <Overview>{item.overview}</Overview>
              </Content>
            </Item>
          ))}
      </ItemList>
    </Container>
  );
};

export default Collections;
