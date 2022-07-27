const calcRem = size => `${size / 16}rem`;

const fontSizes = {
  sm: calcRem(14),
  md: calcRem(16),
  lg: calcRem(18),
  xl: calcRem(20),
  xxl: calcRem(22),
  xxxl: calcRem(24),
  titleSize: calcRem(50),
};

const fontWeights = {
  normal: "400",
  bold: "700",
  heavy: "900",
};

const contentSizes = {
  sm: calcRem(60),
  md: calcRem(75),
  lg: calcRem(90),
  xl: calcRem(105),
  xxl: calcRem(120),
  xxxl: calcRem(135),
}

const paddings = {
  sm: calcRem(8),
  md: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18),
};

const margins = {
  sm: calcRem(8),
  md: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18),
};

const interval = {
  md: calcRem(50),
  lg: calcRem(100),
  xl: calcRem(150),
  xxl: calcRem(200),
};

const verticalInterval = {
  md: `${calcRem(10)} 0 ${calcRem(10)} 0`,
};

const deviceSizes = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "450px",
  tablet: "768px",
  tabletL: "1024px",
};

const colors = {
  yellow : 'FFD557',
  green1: 'D7E029',
  green2: 'CBCC2C',
  green3: '0F9749',
  green4: '74AF50',
  green5: '508E47',
  pink1: 'FCE0E5',
  pink2: 'F5CBD5',
  red: 'EC2029',
  orange1: 'F89520',
  orange2: 'D5792B',
  brown1: '8A603C',
  brown2: '6A4126',
  gray1: 'F3F5F7',
  gray2: 'ADA7A8',
  black : '232724',
  white: 'FFFFFF',
  background: 'linear-gradient(35deg, #CBCC2C 25%, #508E47 90%)'
};

const device = {
  mobileS: `only screen and (max-width: ${deviceSizes.mobileS})`,
  mobileM: `only screen and (max-width: ${deviceSizes.mobileM})`,
  mobileL: `only screen and (max-width: ${deviceSizes.mobileL})`,
  tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
  tabletL: `only screen and (max-width: ${deviceSizes.tabletL})`,
};

const flex = {
  rowCenter: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  columnCenter: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};


const theme = {
  fontSizes,
  fontWeights,
  contentSizes,
  colors,
  deviceSizes,
  device,
  paddings,
  margins,
  interval,
  verticalInterval,
  flex,
};

export default theme;