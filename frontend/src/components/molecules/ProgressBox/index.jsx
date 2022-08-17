import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import getLeftTime from './getLeftTime';
import Image from '../../atoms/Image';
import payReady from './payReady';
import ProgressBar from '../../molecules/ProgressBar';
import requestConfirmPurchase from './requestConfirmPurchase';
import Swal from "sweetalert2";
import theme from "../../../common/theme";

const StyledProgressBox = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.green3};
  border-radius: 1rem;
  background-color: white;
  color: ${({ theme }) => theme.colors.gray2};
  height: 10rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Phase1 = styled.div`
  ${({ theme }) => theme.flex.columnCenter}
  justify-content: space-around;
  padding: 0.5rem 0;
  height: 100%;
`
const Phase2 = styled.div`
  ${({ theme }) => theme.flex.columnCenter}
  justify-content: space-around;
  padding: 0.5rem 0;
  height: 100%;
`
const Phase3 = styled.div`
  ${({ theme }) => theme.flex.columnCenter}
  height: 100%;
`
const PayButton = styled.div`
`

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 1rem;
`

const TimeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProgressBox = ({progress}) => {
  const [leftTime, setLeftTime] = useState('');
  const {isSalesHistory, deliveryCompleted, paymentCompleted, createAt, auctionResultId} = progress;
  const browseDelivery = () => {
    window.open('https://korea24call.com:447/new/index.html');
  }
  const confirmPurchase = () => {
    Swal.fire({
      text: "구매를 확정하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: theme.colors.green3,
      cancelButtonColor: theme.colors.gray2,
      cancelButtonText: '취소',
      confirmButtonText: '확인',
      width: 300,
    }).then((result) => {
      if (result.isConfirmed && requestConfirmPurchase(auctionResultId)) {
        Swal.fire({
          title: '성공!',
          text: '구매가 확정되었습니다!',
          width: 300,
          imageUrl: '/assets/Swal_image/corn.png',
          imageHeight: 150,
          confirmButtonColor: theme.colors.green3, 
        }).then(() => {
          window.location.href = '/';
        })
      }
    })
    // if (window.confirm('구매를 확정하시겠습니까?') && requestConfirmPurchase(auctionResultId)) {
    //   window.alert('구매가 확정되었습니다!')
    // }
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
      <Text size="xxxl" weight="bold">현재 진행 상황</Text>
      {
        !paymentCompleted && !deliveryCompleted ?
          <ProgressBar phase={1}/> : paymentCompleted && !deliveryCompleted ?
          <ProgressBar phase={2}/> : <ProgressBar phase={3}/>
      }
      <StyledProgressBox>
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
                    <TimeBox>
                      <Text color="red" weight="bold" fontSize="xl">남은 시간 :&nbsp;</Text>
                      <Text color="gray" weight="bold" fontSize="xl">{leftTime}</Text>
                    </TimeBox>
                    <PayButton>
                      <Image src='/assets/payment_icon_yellow_small.png' onClick={clickPay} />
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
      </StyledProgressBox>
    </ProgressContainer>
  );
};

ProgressBox.defaultProps = {
};

export default ProgressBox;
