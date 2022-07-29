import React from 'react';
import styled, {css} from 'styled-components';
import PersonIcon from '@mui/icons-material/Person';
import Text from '../../atoms/Text';
import theme from '../../../common/theme';

const iconSize = {
  xxxl: 'large',
  xxl: 'small',
  xl: 'small',
  lg: 'small',
  md: 'small',
  sm: 'middle', // 미들이 제일 작다 이상함..
}

const FlexBox = styled.div`
  ${theme.flex.rowCenter};
`;

const ViewerNum = ({children, color, size, weight, ...rest}) => {
  return (
    <FlexBox>
      <PersonIcon style={{color: theme.colors.red}} fontSize={iconSize[size]}/>
      <Text 
        color={color} 
        size={size}
        weight={weight}
        {...rest}
      >
        {children}
      </Text>
    </FlexBox>
  );
}

export default ViewerNum

ViewerNum.defaultProps = {
  size: 'xl',
  color: 'black',
  weight: 'bold',
}