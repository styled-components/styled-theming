// @flow
import React from 'react';
import {ThemeProvider, injectGlobal} from 'styled-components';
import {createTheme} from '../..';

import Box from './Box';
import Button from './Button';

injectGlobal`
  html,
  body,
  #root {
    position: relative;
    width: 100%;
    height: 100%;
  }

  body {
    margin: 0;
    font: normal 1em/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
`;

export default class App extends React.Component {
  state = {
    theme: 'light',
  };

  handleToggleTheme = () => {
    this.setState({ theme: this.state.theme === 'light' ? 'dark' : 'light' });
  };

  render() {
    return (
      <ThemeProvider theme={createTheme(this.state.theme)}>
        <Box>
          <Button onClick={this.handleToggleTheme}>Toggle Theme</Button>
          <Button kind="primary" onClick={this.handleToggleTheme}>Toggle Theme</Button>
          <Button kind="success" onClick={this.handleToggleTheme}>Toggle Theme</Button>
          <Button kind="warning" onClick={this.handleToggleTheme}>Toggle Theme</Button>
          <Button kind="danger" onClick={this.handleToggleTheme}>Toggle Theme</Button>
        </Box>
      </ThemeProvider>
    );
  }
}
