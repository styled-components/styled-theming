// @flow
import styled from 'styled-components';
import {toThemeSet} from '../..';
import colors from './colors';

const boxBackgroundColor = toThemeSet({
  light: colors.white,
  dark: colors.grayDarker,
});

const boxColor = toThemeSet({
  light: colors.grayDarker,
  dark: colors.grayLighter,
});

const Box = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 4em;
  background-color: ${boxBackgroundColor};
  color: ${boxColor};
`;

export default Box;
