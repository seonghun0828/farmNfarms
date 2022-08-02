import ModalPortal from "./ModalPortal";
import styled from "styled-components"
import Text from "../../atoms/Text";
import Button from "../../atoms/Button";

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
`;

const ContentHeader = styled.div`
  background-color: tomato;
  width: 100%;
  height: 3rem;
  border-radius: 1rem 1rem 0 0;
`
const HeaderLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RoomDetailModal = () => {
  return (
    <ModalPortal>
      <Content>
        <ContentHeader>
          <HeaderLayout>
            <Text color="white" fontSize="xxxl">방 상세 정보</Text>
            <Button>엑스</Button>
          </HeaderLayout>
        </ContentHeader>
      </Content>
    </ModalPortal>
  );
}

export default RoomDetailModal;