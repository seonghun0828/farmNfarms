import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  margin: 0;
  min-width: 0;
  display: block;
  width: 100%;
  padding: 8px 8px;
  font-size: inherit;
  line-height: inherit;
  border: 1px solid;
  border-radius: 4px;
  color: inherit;
  background-color: transparent;
  &:focus {
    border-color: red;
  }
`;

const Select = (props) => {
  return (
    <StyledSelect>
      {props.options.map((option) => (
      <option
        key={option.value}
        value={option.value}
      >
        {option.name}
      </option>))}
    </StyledSelect>
  );
}

export default Select;