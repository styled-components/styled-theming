// @flow
import styled from 'styled-components';
import {toVariantThemeSet} from '../..';
import colors from './colors';

const buttonBackgroundColor = toVariantThemeSet('kind', {
  default: { light: colors.grayLight, dark: colors.grayDark },
  primary: { light: colors.blueLight, dark: colors.blueDark },
  success: { light: colors.greenLight, dark: colors.greenDark, },
  warning: { light: colors.yellowLight, dark: colors.yellowDark, },
  danger: { light: colors.redLight, dark: colors.redDark, },
});

const buttonColor = toVariantThemeSet('kind', {
  default: { light: colors.grayDarker, dark: colors.grayLighter },
  primary: { light: colors.blueDark, dark: colors.blueLight },
  success: { light: colors.greenDark, dark: colors.greenLight },
  warning: { light: colors.yellowDark, dark: colors.yellowLight },
  danger: { light: colors.redDark, dark: colors.redLight },
});

const Button = styled.button`
  font: inherit;
  padding: 0.5em 1em;
  border: none;
  background-color: ${buttonBackgroundColor};
  color: ${buttonColor};
  border-radius: 0.25em;
  margin-right: 0.5em;
  cursor: pointer;
`;

Button.defaultProps = {
  kind: 'default',
};

export default Button;
