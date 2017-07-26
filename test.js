// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {createTheme, getThemeValue, toThemeSet, toVariantThemeSet} from './';
import styled, {ThemeProvider} from 'styled-components';
import ReactTestRenderer from 'react-test-renderer';

function render(jsx) {
  return ReactTestRenderer.create(jsx).toJSON();
}

test('basic', () => {
  const backgroundColor = toThemeSet({
    light: '#fff',
    dark: '#000'
  });

  const Page = styled.div`
    background-color: ${backgroundColor};
  `;

  expect(render(
    <ThemeProvider theme={createTheme('light')}>
      <Page/>
    </ThemeProvider>
  )).toMatchSnapshot();

  expect(render(
    <ThemeProvider theme={createTheme('dark')}>
      <Page/>
    </ThemeProvider>
  )).toMatchSnapshot();
});

test('variants', () => {
  const headingColor = toVariantThemeSet('variant', {
    default: { light: '#000', dark: '#fff' },
    fancy: { light: '#f0f', dark: '#f0f' },
  });

  const Heading = styled.h1`
    color: ${headingColor};
  `;

  Heading.propTypes = { variant: PropTypes.oneOf(['default', 'fancy']) };
  Heading.defaultProps = { variant: 'default' };

  expect(render(
    <ThemeProvider theme={createTheme('light')}>
      <Heading/>
    </ThemeProvider>
  )).toMatchSnapshot();

  expect(render(
    <ThemeProvider theme={createTheme('light')}>
      <Heading variant="fancy"/>
    </ThemeProvider>
  )).toMatchSnapshot();
});

describe('toThemeSet()', () => {
  let themeSet = toThemeSet({ light: '#fff', dark: '#000' });

  it('should create a function with props', () => {
    expect(themeSet).toBeInstanceOf(Function);
    expect(themeSet).toHaveProperty('light', '#fff');
    expect(themeSet).toHaveProperty('dark', '#000');
  });

  it('should create a function that returns a matching prop when passed a string', () => {
    expect(themeSet({ theme: createTheme('light') })).toBe('#fff');
    expect(themeSet({ theme: createTheme('dark') })).toBe('#000');
  });

  it('should create a function that returns calls a passed function', () => {
    expect(themeSet({ theme: createTheme(themes => themes.light) })).toBe('#fff');
    expect(themeSet({ theme: createTheme(themes => themes.dark) })).toBe('#000');
  });
});

describe('toVariantThemeSet()', () => {
  let themeSet = toVariantThemeSet('kind', {
    default: { light: '#fff', dark: '#000' },
    fancy: { light: '#f0f', dark: '#0f0' },
  });

  it('should create a function with props', () => {
    expect(themeSet).toBeInstanceOf(Function);
    expect(themeSet).toHaveProperty('default');
    expect(themeSet.default).toEqual({ light: '#fff', dark: '#000' });
    expect(themeSet).toHaveProperty('fancy');
    expect(themeSet.fancy).toEqual({ light: '#f0f', dark: '#0f0' });
  });

  it('should create a function that returns a matching prop when passed a string', () => {
    expect(themeSet({ kind: 'default', theme: createTheme('light') })).toBe('#fff');
    expect(themeSet({ kind: 'default', theme: createTheme('dark') })).toBe('#000');
    expect(themeSet({ kind: 'fancy', theme: createTheme('light') })).toBe('#f0f');
    expect(themeSet({ kind: 'fancy', theme: createTheme('dark') })).toBe('#0f0');
  });

  it('should create a function that returns calls a passed function', () => {
    expect(themeSet({ kind: 'default', theme: createTheme(themes => themes.light) })).toBe('#fff');
    expect(themeSet({ kind: 'default', theme: createTheme(themes => themes.dark) })).toBe('#000');
    expect(themeSet({ kind: 'fancy', theme: createTheme(themes => themes.light) })).toBe('#f0f');
    expect(themeSet({ kind: 'fancy', theme: createTheme(themes => themes.dark) })).toBe('#0f0');
  });
});
