import ModalPortal from "./ModalPortal";
import styled from "styled-components"
import Text from "../../atoms/Text";
import Button from "../../atoms/Button";
import theme from "../../../common/theme"
import CloseIcon from '@mui/icons-material/Close';
import ReadItemCard from "../ReadItemCard";

// 위로 올라오듯이 css 효과 넣기
// div padding 같은거 통일해서 넣기
// 상태를 메인페이지에서 관리하는게 맞나?? (리덕스 고려하기)
const BackGround = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
`

const Content = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: white;
  width: 100%;
  height: 80vh;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 0 1rem 0.2rem rgba(0, 0, 0, 0.3);
`;

const Header = styled.div`
  background-color: ${theme.colors.green5};
  width: 100%;
  height: 8%;
  border-radius: 1rem 1rem 0 0;
  display: flex;
  justify-content: space-between; 
  align-items: center;
`

// 왜 알파벳은 개행 안되냐거~~
const RoomDetailSection = styled.div`
  width: 100%;
  height: 80%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 1rem 0.5rem 1rem;
`

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding-top: 0.5rem;
  border-bottom: 2px solid ${theme.colors.gray1};
`
 
const DescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  white-space: break-spaces;
  padding-top: 0.5rem;
  width: 100%;
  height: auto;
  border-bottom: 2px solid ${theme.colors.gray1};
`

const ItemsSection = styled.div` 
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`

const ItemCardSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonSection = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  background-color: white;
`
const Div = styled.div`
  margin-top: ${(props) => props.mt + 'rem'};
  margin-bottom: ${(props) => props.mb + 'rem'};
  margin-left: ${(props) => props.ml + 'rem'};
  margin-right: ${(props) => props.mr + 'rem'};

  padding-top: ${(props) => props.pt + 'rem'};
  padding-bottom: ${(props) => props.pb + 'rem'};
  padding-left: ${(props) => props.pl + 'rem'};
  padding-right: ${(props) => props.pr + 'rem'};
`;

const EXAMPLE_ITEMS = [
  {
    imageUrl: "https://www.google.com/search?q=%EB%B0%B0%EC%B6%94&sxsrf=ALiCzsb2vr7F2jO2MUeJdj3We_YYHVW9cQ:1659498426773&tbm=isch&source=iu&ictx=1&vet=1&fir=UseYLZmrPtJskM%252CX1UfksweKm-ntM%252C%252Fm%252F03hf_6m%253BG7y4fCvkOLKxlM%252CJO7SC9TH-MTb5M%252C_%253Bh_opXx5YpSoU1M%252C4OopPjhrSBq4pM%252C_%253BnT4W0ekhJyhE5M%252CCw5rMRmGGXBhyM%252C_%253BrAnBrljPKSgdQM%252CX5TyMXICmqpEDM%252C_&usg=AI4_-kQ4H_Mwmr7U8oMHVaiexT_51jPD7Q&sa=X&ved=2ahUKEwiUtO6x4an5AhXDa94KHT8SBDYQ_B16BAhOEAE#imgrc=UseYLZmrPtJskM",
    product: "배추",
    quantity: "1000kg",
    grade: "최상",
    startingPrice: "100,000원"
  },
  {
    imageUrl: "https://www.google.com/search?q=%EB%B0%B0%EC%B6%94&sxsrf=ALiCzsb2vr7F2jO2MUeJdj3We_YYHVW9cQ:1659498426773&tbm=isch&source=iu&ictx=1&vet=1&fir=UseYLZmrPtJskM%252CX1UfksweKm-ntM%252C%252Fm%252F03hf_6m%253BG7y4fCvkOLKxlM%252CJO7SC9TH-MTb5M%252C_%253Bh_opXx5YpSoU1M%252C4OopPjhrSBq4pM%252C_%253BnT4W0ekhJyhE5M%252CCw5rMRmGGXBhyM%252C_%253BrAnBrljPKSgdQM%252CX5TyMXICmqpEDM%252C_&usg=AI4_-kQ4H_Mwmr7U8oMHVaiexT_51jPD7Q&sa=X&ved=2ahUKEwiUtO6x4an5AhXDa94KHT8SBDYQ_B16BAhOEAE#imgrc=UseYLZmrPtJskM",
    product: "감자",
    quantity: "2000kg",
    grade: "최상",
    startingPrice: "200,000원"
  },
  {
    imageUrl: "https://www.google.com/search?q=%EB%B0%B0%EC%B6%94&sxsrf=ALiCzsb2vr7F2jO2MUeJdj3We_YYHVW9cQ:1659498426773&tbm=isch&source=iu&ictx=1&vet=1&fir=UseYLZmrPtJskM%252CX1UfksweKm-ntM%252C%252Fm%252F03hf_6m%253BG7y4fCvkOLKxlM%252CJO7SC9TH-MTb5M%252C_%253Bh_opXx5YpSoU1M%252C4OopPjhrSBq4pM%252C_%253BnT4W0ekhJyhE5M%252CCw5rMRmGGXBhyM%252C_%253BrAnBrljPKSgdQM%252CX5TyMXICmqpEDM%252C_&usg=AI4_-kQ4H_Mwmr7U8oMHVaiexT_51jPD7Q&sa=X&ved=2ahUKEwiUtO6x4an5AhXDa94KHT8SBDYQ_B16BAhOEAE#imgrc=UseYLZmrPtJskM",
    product: "옥수수",
    quantity: "500kg",
    grade: "중상",
    startingPrice: "80,000원"
  },
]

const RoomDetailModal = ({title, description, items, closeModal}) => {
  return (
    <ModalPortal>
      <BackGround onClick={closeModal}/>
      <Content>
        <Header>
          <Div pl={1}>
            <Text color="white" size="xxl" weight="bold">방 상세 정보</Text>
          </Div>
          <Div pr={1}>
            <CloseIcon onClick={closeModal} style={{cursor: 'pointer', color: 'white'}}/>
          </Div>
        </Header>
        <RoomDetailSection>
          <Div mt={0.5}>
            <TitleSection>
              <Text color="gray2" size="xl" weight="bold">방 제목</Text>
              <Div mt={0.5} mb={0.5}>
                <Text size="lg">{title}</Text>
              </Div>
            </TitleSection>
          </Div>
          <Div mt={0.5}>
            <DescriptionSection>
            <Text color="gray2" size="xl" weight="bold">내용</Text>
            <Div mt={0.5} mb={0.5}>
              <Text>{description}</Text>
            </Div>
            </DescriptionSection>
          </Div>
          <Div mt={0.5}>
          <ItemsSection>
            <Text color="gray2" size="xl" weight="bold">항목</Text>
            <ItemCardSection>
              {items.map((item, index) => <ReadItemCard {...item} key={index}/>)}                         
            </ItemCardSection>
          </ItemsSection>
          </Div>
        </RoomDetailSection>
        <ButtonSection>
          <Button width="90%">입장하기</Button>
        </ButtonSection>
      </Content>
    </ModalPortal>
  );
}

RoomDetailModal.defaultProps = {
  items: EXAMPLE_ITEMS,
}

export default RoomDetailModal;