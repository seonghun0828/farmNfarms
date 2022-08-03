import React, { useState } from 'react';
import logo from '../../../assets/로고.svg';
import styled from 'styled-components';
import Navbar from '../../molecules/Navbar';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import Textarea from '../../atoms/Textarea';
import CreateItemCard from '../../molecules/CreateItemCard';
import { useNavigate } from 'react-router-dom';
import move from '../../../common/move'

const StyledCreateAuctionRoom = styled.div``;

// ${({theme}) => theme.flex.columnCenter}
const PageBody = styled.div`
    padding: 1.2rem;
    height: 46rem;
`;
const TextInputs = styled.div`
    ${({theme}) => theme.flex.columnCenter}
    justify-content: space-around;
    height: 12rem;
`
const StyledInput = styled.div`
    width: 22rem;
`
const StyledTextarea = styled.div`
    width: 22rem;
    `;
const ItemAddingArea = styled.div`
    width: 22rem;
    height: 25rem;
    border: 2px solid ${({theme}) => theme.colors.gray2};
    border-radius: 5px;
`
const ItemAddingAreaNav = styled.div`
  ${({theme}) => theme.flex.rowCenter}
  height: 2rem;
  background-color: ${({theme}) => theme.colors.green3};
  border-radius: 5px 5px 0 0;
`
const ItemAddingAreaBody = styled.div`
  ${({theme}) => theme.flex.columnCenter}
  justify-content: flex-start;
  height: 22.5rem;
  overflow-y: auto;
  gap: 1rem;
`
const StyledButton = styled.div`
  ${({theme}) => theme.flex.rowCenter}
`
const Footer = styled.div`
  ${({theme}) => theme.flex.rowCenter}
  padding-top: 2rem;
`
const FooterButtons = styled.div`
  ${({theme}) => theme.flex.rowCenter}
  width: 100%;
  justify-content: space-around;
`
const cardInputs=[{text: '품목명', type: 'text'}, {text: '수량', type: 'text'}, {text: '등급', type: 'text'}, {text: '경매시작가', type: 'number'}];

const CreateAuctionRoom = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [items, setItems] = useState([
    cardInputs.map(({text}) => {
      return {
        [text] : ''
      }})
  ]);
  const navigate = useNavigate();
  const addItem = () => {
    setItems(items => [...items, 
      cardInputs.map(({text}) => {
        return {
          [text] : ''
        }})
    ]);
  }
  const onChange = (e, setValue) => {
    setValue(e.target.value);
  }
  const goBack = () => {
    move(navigate, -1);
  }
  const create = () => {
    console.log(title);
    console.log(content);
    console.log(items);
  }
  return (
    <StyledCreateAuctionRoom>
      <Navbar url={logo} isLogin imgSize="xs" fontSize="sm" mode="graytext" />
      <PageBody>
        <Text weight='bold' fontSize='xxxl'>경매방 생성 페이지</Text>
        <TextInputs>
            <StyledInput>
                <Input height='2' placeholder='제목을 입력하세요' onChange={(e) => onChange(e, setTitle)} />
            </StyledInput>
            <StyledTextarea>
                <Textarea height='7' placeholder='내용을 입력하세요' onChange={(e) => onChange(e, setContent)} />
            </StyledTextarea>
        </TextInputs>
        <ItemAddingArea>
          <ItemAddingAreaNav>
            <Text color='white' weight='bold' fontSize='lg' >농산물 항목</Text>
            <StyledButton>
              <Button fontSize='md' color='white' onClick={addItem}>+</Button>
            </StyledButton>
          </ItemAddingAreaNav>
          <ItemAddingAreaBody>
            {
              items.map((item, idx) => <CreateItemCard items={items} setItems={setItems} inputs={cardInputs} idx={idx} key={item + idx} />)
            }
          </ItemAddingAreaBody>
        </ItemAddingArea>
        <Footer>
          <FooterButtons>
            <Button onClick={goBack}>돌아가기</Button>
            <Button onClick={create}>생성하기</Button>
          </FooterButtons>
        </Footer>
      </PageBody>
    </StyledCreateAuctionRoom>
  );
};

export default CreateAuctionRoom;