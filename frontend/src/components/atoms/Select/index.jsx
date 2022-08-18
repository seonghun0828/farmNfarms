import React from 'react';
import styled from 'styled-components';
import theme from '../../../common/theme'

const StyledSelect = styled.select`
  margin: 0;
  min-width: 0;
  display: inline-block;
  width: 100%;
  padding: 0.5rem 0.5rem;
  font-size: inherit;
  line-height: inherit;
  text-align: center;
  color: inherit;
  border: 2px solid ${theme.colors.gray2}
  border-radius: 1rem;
  &:focus {
    border: 2px solid ${theme.colors.green3};
  }
  height: 3rem;
  border-radius: 5px;
`;

const Select = ({defaultValue, options, setValue, name, selectedvalue}) => {

  const handleChange = (e) => {
    setValue && 
    setValue(inputs => ({
      ...inputs,
      [name]: e.target.value,
    }));
  }

  return (
    <StyledSelect onChange={handleChange}>
      <option value='' defaultValue>-- {defaultValue} --</option>
      {options.map((option) => {
      if (selectedvalue === option.value) {
        return (<option
        key={option.value}
        value={option.value}
        selected
       >
        {option.name}
      </option>);       
      } else {
        return (<option
        key={option.value}
        value={option.value}
        >
          {option.name}
        </option>);          
      }
    })}
    </StyledSelect>
  );
}

const EXAMPLE_OPTIONS = [
  { value: "tomato", name: "토마토" },
  { value: "gamza", name: "감자" },
  { value: "oksusu", name: "옥수수" },
];

Select.defaultProps = {
  options: EXAMPLE_OPTIONS,
  defaultValue: '선택'
};

export default Select;