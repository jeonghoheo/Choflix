import React from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";

const Container = styled.div`
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

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: ${props => (props.collection ? "100%" : "40%")};
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 60%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 80%;
`;

const YoutubeContainer = styled.iframe`
  width: 560px;
  height: 315px;
  margin: 10px;
`;

const ProductionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
`;

const Production = styled.ul`
  height: 200px;
  max-width: 300px;
  overflow: auto;
  -ms-overflow-style: none; // IE에서 스크롤바 감춤
  &::-webkit-scrollbar {
    display: none !important; // 윈도우 크롬 등
  }
`;

const ProductionTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
`;

const ProductionItem = styled.li`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const ProductionItemTitle = styled.span`
  font-size: 15px;
`;

const ProductionImg = styled.img``;

const ImbdImg = styled.img`
  margin-left: 20px;
  border-radius: 20px;
  cursor: pointer;
  width: 80px;
`;

const CLink = styled(Link)`
  width: 40%;
  height: 100%;
`;

const ImdbLink = styled.a``;

const IMDB_IMG_LINK =
  "data:image/jpeg;base64,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";

const CoverContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: black;
  &:hover {
    ${Cover} {
      opacity: 0.6;
    }
  }
`;

const SeasonsContainer = styled.div`
  margin-top: 50px;
  overflow: auto;
  width: 90%;
  height: 50%;
  display: flex;
`;

const SeasonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  :not(:last-child) {
    margin-right: 8px;
  }
`;

const SeasonTitle = styled.span`
  margin-top: 10px;
`;

const SeasonCover = styled.div`
  width: 150px;
  background-image: url(${props => props.poster_path});
  background-position: center center;
  background-size: cover;
  height: 250px;
  border-radius: 5px;
`;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />>
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        {result.belongs_to_collection ? (
          <CLink to={`/collections/${result.belongs_to_collection.id}`}>
            <CoverContainer>
              <Cover
                collection={true}
                bgImage={
                  result.poster_path
                    ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                    : require("../../assets/noPosterSmall.png")
                }
              />
            </CoverContainer>
          </CLink>
        ) : (
          <Cover
            collection={false}
            bgImage={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : require("../../assets/noPosterSmall.png")
            }
          />
        )}
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
            {result.imdb_id && (
              <ImdbLink
                href={`https://www.imdb.com/title/${result.imdb_id}/?ref_=inth_ov_i`}
                target="blank"
              >
                <ImbdImg src={IMDB_IMG_LINK} />
              </ImdbLink>
            )}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime
                ? result.runtime
                : result.episode_run_time
                ? result.episode_run_time[0]
                : ""}{" "}
              min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            {result.created_by && (
              <>
                <Divider>• Creator:</Divider>
                <Item>
                  {result.created_by.map((createdBy, index) =>
                    index === result.created_by.length - 1
                      ? createdBy.name
                      : `${createdBy.name}, `
                  )}
                </Item>
              </>
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          {result.videos.results.length > 0 && (
            <YoutubeContainer
              src={`https://www.youtube.com/embed/${result.videos.results[0]
                .key ||
                (result.videos.results[1] &&
                  result.videos.results[1].key)}?rel=0`}
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen={true}
            ></YoutubeContainer>
          )}
          {result.seasons && (
            <SeasonsContainer>
              {result.seasons.map((item, index) => {
                return (
                  <SeasonContainer key={index}>
                    <SeasonCover
                      poster_path={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                          : require("../../assets/noPosterSmall.png")
                      }
                    />
                    <SeasonTitle>{item.name}</SeasonTitle>
                  </SeasonContainer>
                );
              })}
            </SeasonsContainer>
          )}
        </Data>
        <ProductionContainer>
          {result.production_companies.length > 0 && (
            <Production>
              <ProductionTitle>Companies</ProductionTitle>
              {result.production_companies.map((item, index) => (
                <ProductionItem key={index}>
                  {item.logo_path && (
                    <ProductionImg
                      src={`https://image.tmdb.org/t/p/w200${item.logo_path}`}
                      alt={item.name}
                    ></ProductionImg>
                  )}
                  <ProductionItemTitle>{item.name}</ProductionItemTitle>
                </ProductionItem>
              ))}
            </Production>
          )}
          {result.production_countries &&
            result.production_countries.length > 0 && (
              <Production>
                <ProductionTitle>Countries</ProductionTitle>
                {result.production_countries.map((item, index) => (
                  <ProductionItem key={index}>
                    <ProductionItemTitle>{item.name}</ProductionItemTitle>
                  </ProductionItem>
                ))}
              </Production>
            )}
        </ProductionContainer>
        {console.log(result)}
      </Content>
    </Container>
  );
DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;
