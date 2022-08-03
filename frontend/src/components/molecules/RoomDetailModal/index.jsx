import ModalPortal from "./ModalPortal";
import styled from "styled-components"
import Text from "../../atoms/Text";
import Button from "../../atoms/Button";
import theme from "../../../common/theme"
import CloseIcon from '@mui/icons-material/Close';

// 위로 올라오듯이 css 효과 넣기
// div padding 같은거 통일해서 넣기
const BackGround = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.40);
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

const XPadding = styled.div`
  padding: 0 0.7rem 0 0.7rem;
`

// 왜 알파벳은 개행 안되냐거~~
const RoomDetailSection = styled.div`
  width: 100%;
  height: 82%;
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

const RoomDetailModal = ({title, description, items, closeModal}) => {
  return (
    <ModalPortal>
      <BackGround onClick={closeModal}/>
      <Content>
        <Header>
          <XPadding>
            <Text color="white" size="xxl" weight="bold">방 상세 정보</Text>
          </XPadding>
          <XPadding>
            <CloseIcon onClick={closeModal} style={{cursor: 'pointer', color: 'white'}}/>
          </XPadding>
        </Header>
        <RoomDetailSection>
          <TitleSection>
            <Text color="gray2" size="xl" weight="bold">방 제목</Text>
            <Text size="lg">{title}</Text>
          </TitleSection>
          <DescriptionSection>
            <Text>{description}</Text>
          </DescriptionSection>
          <ItemsSection>
            <Text color="gray2" size="xl" weight="bold">항목</Text>
          </ItemsSection>
        </RoomDetailSection>
        <ButtonSection>
          <Button width="90%">입장하기</Button>
        </ButtonSection>
      </Content>
    </ModalPortal>
  );
}

export default RoomDetailModal;