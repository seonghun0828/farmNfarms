import {useState} from 'react';
import styled, {css} from 'styled-components';
import Text from '../Text';
import theme from '../../../common/theme';
import { options } from '../../pages/Price/Chart';

const StyledSelect = styled.div`
  width: 100%;
  height: auto;
  cursor: pointer;
`

const Label = styled.button`
  all: unset;
  position: relative; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2.5rem;
  border: 2px solid ${({isOpen}) => isOpen ? `${theme.colors.green3}` : `${theme.colors.gray2}`};
  border-radius: ${({isOpen}) => isOpen ? '1rem 1rem 0 0' : '1rem'};
  background-color: white;
`

const StyledUl = styled.ul`
  all: unset;
  position: absolute;
  top: 2.5rem;
  left: -0.12rem;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.gray1};
  border-radius: 0 0 1rem 1rem;
  border: 2px solid ${theme.colors.green3};
  width: 100%;
  height: auto;
  max-height: 9rem;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`

const BorderRadius = (isLast) => {
  if (isLast) {
    return '0 0 1rem 1rem;';
  }
  else {
    return '0;';
  }
}

const StyledLi = styled.li`
  all: unset;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;

  border-radius: ${({Last}) => BorderRadius(Last)}

  border-bottom: ${({Last}) => Last ? 0 : `1px dashed ${theme.colors.gray2}`};

  :hover {
    background-color: #F8FAF7;
  }
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


const SelectBox = ({options, labelText, setValue}) => {

  const Last = true;
  
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(labelText);

  const onClickHandler = () => {
    setIsOpen((prev) => !prev);
  }

  const Selected = (e) => {
    setSelected(e.target.innerText);
    setValue(e.target.innerText);
  }

  return (
    <StyledSelect>
      <Label onClick={onClickHandler} isOpen={isOpen}>
        <Div pl={1}>
          <Text>{selected}</Text>
        </Div>
        <Div pr={1}>
          {isOpen ? 
            <Text>△</Text> : <Text>▼</Text>
          }
          
        </Div>
        {
        isOpen ?
          <>
            <StyledUl onClick={Selected}>
              {options.map((option, index) => {
                if (index === options.length - 1) {
                  return (
                    <StyledLi Last key={index+option}>
                      {option}
                    </StyledLi>
                  );
                } else {
                  return (
                    <StyledLi key={index+option}>
                      {option}
                    </StyledLi>
                  );
                }
              })}
            </StyledUl>
          </> : null
        }
      </Label>
    </StyledSelect>
  );
}

SelectBox.defaultProps = {
  labelText: '선택',
  options: ['하이', '바이', '이건', '연습용', '디폴트값']
}

export default SelectBox;
