import React from "react";
import styled from "styled-components";

const CardBackDiv = styled.div`
  background: rgba(0, 0, 0, 0.2);
  width: 350px;
  height: 180px;
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
  height: 160px;
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
  width: 100%;
  height: 100%;
  border-radius: 10px;  
  border: 1px solid;
  background-color: white;
`

const ContentDiv = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 20px;
`

const ItemTitleDiv = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  margin: 5px 5px 0px 5px;
`

const ItemTag = styled.div`
  background-color: #019267;
  width: 100px;
  border-radius: 5px;
  padding: 4px;
  text-align: left;
  margin: 2px 0px 2px 5px;
`

const ItemContentsDiv = styled.div`
  margin: 2px 5px 2px 5px;
`

const AuctionItemCard = ({ productTitle, grade, quantity, startingPrice, bidIncrement, tempHighestPrice }) => {
  return (
    <CardBackDiv>
      <CardDiv>
        <ContentsBox>
          <ItemTitleDiv>
            <span>{productTitle}</span>
            <span>{grade}</span>
            <span>{parseInt(quantity).toLocaleString('ko-KR')}kg</span>
          </ItemTitleDiv>
          <div style={{marginBottom: '5px', marginTop: '5px'}}>
            <ContentDiv>
              <ItemTag>시작가</ItemTag>
              <ItemContentsDiv style={{ color: 'black' }}>￦{parseInt(startingPrice).toLocaleString('ko-KR')}원</ItemContentsDiv>
            </ContentDiv>
            <ContentDiv>
              <ItemTag>입찰단위</ItemTag>
              <ItemContentsDiv style={{ color: 'black' }}>￦{parseInt(bidIncrement).toLocaleString('ko-KR')}원</ItemContentsDiv>
            </ContentDiv>
            <ContentDiv>
              <ItemTag>최고가</ItemTag>
              <ItemContentsDiv style={{ color: 'black' }}>
                {tempHighestPrice === 0 && <span>가격 공개 전</span>}
                {tempHighestPrice !== 0 && <span style={{ color: 'red' }}>￦{tempHighestPrice.toLocaleString('ko-KR')}원</span>}
              </ItemContentsDiv>
            </ContentDiv>
          </div>
        </ContentsBox>
      </CardDiv>
    </CardBackDiv>
  )
}

export default AuctionItemCard;