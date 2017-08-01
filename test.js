// @flow
import React from 'react';
import PropTypes from 'prop-types';
import theme from './';
import styled, {ThemeProvider} from 'styled-components';
import ReactTestRenderer from 'react-test-renderer';

function render(jsx) {
  return ReactTestRenderer.create(jsx).toJSON();
}

test('basic', () => {
  const backgroundColor = theme('mode', {
    light: '#fff',
    dark: '#000'
  });

  const Page = styled.div`
    background-color: ${backgroundColor};
  `;

  expect(render(
    <ThemeProvider theme={{ mode: 'light' }}>
      <Page/>
    </ThemeProvider>
  )).toMatchSnapshot();

  expect(render(
    <ThemeProvider theme={{ mode: 'dark' }}>
      <Page/>
    </ThemeProvider>
  )).toMatchSnapshot();
});

test('variants', () => {
  const headingColor = theme.variants('mode', 'variant', {
    default: { light: '#000', dark: '#fff' },
    fancy: { light: '#f0f', dark: '#f0f' },
  });

  const Heading = styled.h1`
    color: ${headingColor};
  `;

  Heading.propTypes = { variant: PropTypes.oneOf(['default', 'fancy']) };
  Heading.defaultProps = { variant: 'default' };

  expect(render(
    <ThemeProvider theme={{ mode: 'light' }}>
      <Heading/>
    </ThemeProvider>
  )).toMatchSnapshot();

  expect(render(
    <ThemeProvider theme={{ mode: 'light' }}>
      <Heading variant="fancy"/>
    </ThemeProvider>
  )).toMatchSnapshot();
});

describe('theme()', () => {
  const fn = theme('mode', { light: '#fff', dark: '#000' });

  it('should create a function that returns a matching prop when passed a string', () => {
    expect(fn({ theme: { mode: 'light' } })).toBe('#fff');
    expect(fn({ theme: { mode: 'dark' } })).toBe('#000');
  });

  it('should create a function that returns calls a passed function', () => {
    expect(fn({ theme: { mode: themes => themes.light } })).toBe('#fff');
    expect(fn({ theme: { mode: themes => themes.dark } })).toBe('#000');
  });
});

describe('theme.variants()', () => {
  const fn = theme.variants('mode', 'kind', {
    default: { light: '#fff', dark: '#000' },
    fancy: { light: '#f0f', dark: '#0f0' },
  });

  it('should create a function that returns a matching prop when passed a string', () => {
    expect(fn({ kind: 'default', theme: { mode: 'light' } })).toBe('#fff');
    expect(fn({ kind: 'default', theme: { mode: 'dark' } })).toBe('#000');
    expect(fn({ kind: 'fancy', theme: { mode: 'light' } })).toBe('#f0f');
    expect(fn({ kind: 'fancy', theme: { mode: 'dark' } })).toBe('#0f0');
  });

  it('should create a function that returns calls a passed function', () => {
    expect(fn({ kind: 'default', theme: { mode: themes => themes.light } })).toBe('#fff');
    expect(fn({ kind: 'default', theme: { mode: themes => themes.dark } })).toBe('#000');
    expect(fn({ kind: 'fancy', theme: { mode: themes => themes.light } })).toBe('#f0f');
    expect(fn({ kind: 'fancy', theme: { mode: themes => themes.dark } })).toBe('#0f0');
  });
});
