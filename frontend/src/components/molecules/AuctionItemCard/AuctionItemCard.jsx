import React from "react";
import styled from "styled-components";

const CardBackDiv = styled.div`
  background: rgba(0, 0, 0, 0.2);
  width: 350px;
  height: 150px;
  border-radius: 5px;
  margin-left: 5px;
  margin-right: 5px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CardDiv = styled.div`
  margin : 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ImgBox = styled.div`
  width: 110px;
  height: 120px;
  border-radius: 10px;  
  border: 1px solid;
`

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 210px;
  height: 120px;
  border-radius: 10px;  
  border: 1px solid;
  background-color: white;
`

const ContentDiv = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 16px;
`

const ItemTitleDiv = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  margin: 2px 5px 0px 5px;
`

const ItemTag = styled.div`
  background-color: #0F9749;
  width: 80px;
  border-radius: 5px;
  padding-left: 5px;
  padding-top: 1px;
  padding-bottom: 1px;
  text-align: left;
  margin: 2px 0px 2px 5px;
`

const ItemContentsDiv = styled.div`
  margin: 2px 5px 2px 5px;
`

const AuctionItemCard = (props) => {
  return (
    <CardBackDiv>
      <CardDiv>
        <ImgBox>사진</ImgBox>
        <ContentsBox>
          <ItemTitleDiv>
            <span>품명</span>
            <span>등급</span>
            <span>중량kg</span>
          </ItemTitleDiv>
          <div style={{marginBottom: '5px', marginTop: '5px'}}>
            <ContentDiv>
              <ItemTag>시작가</ItemTag>
              <ItemContentsDiv style={{color: 'black'}}>1000원</ItemContentsDiv>
            </ContentDiv>
            <ContentDiv>
              <ItemTag>입찰단위</ItemTag>
              <ItemContentsDiv style={{color: 'black'}}>1000원</ItemContentsDiv>
            </ContentDiv>
            <ContentDiv>
              <ItemTag>최고가</ItemTag>
              <ItemContentsDiv style={{color: 'black'}}>1000원</ItemContentsDiv>
            </ContentDiv>
          </div>
        </ContentsBox>
      </CardDiv>
    </CardBackDiv>
  )
}

export default AuctionItemCard;