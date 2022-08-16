import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import getLeftTime from './getLeftTime';
import Image from '../../atoms/Image';
import payReady from './payReady';
import ProgressBar from '../../molecules/ProgressBar';

const StyledProgressBox = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.green3};
  border-radius: 1rem;
  padding: 1rem 2rem;
  background-color: white;
  color: ${({ theme }) => theme.colors.gray2};
  width: 100%;
`;

const ProgressBody = styled.div`
`
const Phase1 = styled.div`
  ${({ theme }) => theme.flex.columnCenter}
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0.5rem 0;
`
const Phase2 = styled.div`
  ${({ theme }) => theme.flex.columnCenter}
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0.5rem 0;
`
const Phase3 = styled.div`
  ${({ theme }) => theme.flex.columnCenter}
`
const PayButton = styled.div`
`

const ProgressBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100%;
`

const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 14rem;
  width: 100%;
  gap: 2rem;
`

const ProgressBox = ({progress}) => {
  const [leftTime, setLeftTime] = useState('');
  const {isSalesHistory, deliveryCompleted, paymentCompleted, createAt, auctionResultId} = progress;
  const browseDelivery = () => {
    console.log('배송 업체 알아보는 웹 사이트 뜨게 하기');
  }
  const confirmPurchase = () => {
    if (window.confirm('구매를 확정하시겠습니까?')) {
      console.log('alert 띄우고, 구매 확정 api 보내고, mypage로 리다이렉트');
    }
  }
  const clickPay = async () => {
    const next_redirect_mobile_url = await payReady(auctionResultId);
    window.location.href = next_redirect_mobile_url;
  }
  useEffect(() => {
    const interval = setInterval(() => {
      getLeftTime(createAt, setLeftTime);
    }, 1000);
    return () => clearInterval(interval);
  })
  
  return (
    <ProgressContainer>
      {
        !paymentCompleted && !deliveryCompleted ?
          <ProgressBar phase={1}/> : paymentCompleted && !deliveryCompleted ?
          <ProgressBar phase={2}/> : <ProgressBar phase={3}/>
      }
      <ProgressBoxContainer>
        <Text size="xxl" weight="bold">현재 진행 상황</Text>
        <StyledProgressBox>
          <ProgressBody>
            {
              !paymentCompleted && !deliveryCompleted ?
                <Phase1>
                  {
                    isSalesHistory ?
                      <>
                        <Text color="gray" weight="bold" fontSize="xl">낙찰 완료</Text>
                        <Text color="gray" weight="bold" fontSize="xl">구매자 결제 중</Text>
                      </> :
                      <>
                        <Text color="gray" weight="bold" fontSize="xl">결제가 필요합니다!</Text>
                        <Text color="gray" weight="bold" fontSize="xl">남은 시간 : {leftTime}</Text>
                        <PayButton>
                          <Image src='/assets/kakaopay_icon_md.png' onClick={clickPay} />
                        </PayButton>
                      </>
                  }
                </Phase1> :
              paymentCompleted && !deliveryCompleted ?
                <Phase2>
                  {
                    isSalesHistory ?
                      <>
                        <Text weight="bold" fontSize="xl">결제 완료</Text>
                        <Text weight="bold" fontSize="xl">신속한 배송 부탁드려요!</Text>
                        <Button width="13rem" height="2rem" fontSize='lg' mode="highlight" onClick={browseDelivery}>
                          배송 업체 알아보기
                        </Button>
                      </> :
                      <>
                        <Text weight="bold" fontSize="xl">결제 완료</Text>
                        <Text weight="bold" fontSize="xl">판매자 배송 중</Text>
                        <Button width="13rem" height="2rem" fontSize='lg' mode="highlight" onClick={confirmPurchase}>
                          구매 확정 하기
                        </Button>
                      </>
                  }
                </Phase2> :
                <Phase3>
                  <Text color="gray2" weight="bold" fontSize="xxxl">거래가 완료되었습니다</Text>
                </Phase3>
            }
          </ProgressBody>
        </StyledProgressBox>
      </ProgressBoxContainer>
    </ProgressContainer>
  );
};

ProgressBox.defaultProps = {
};

export default ProgressBox;
