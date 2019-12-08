// @flow
import React from 'react';
import styled, {ThemeProvider, injectGlobal} from 'styled-components';
import Box from './Box';
import Button from './Button';

injectGlobal`
  * {
    box-sizing: border-box;
  }

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

const Code = styled.pre`
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  border: 3px solid;
  padding: 1em;
  border-radius: 0.25em;
`;

export default class App extends React.Component {
  state = {
    mode: 'light',
    size: 'normal',
  };

  handleToggleMode = () => {
    this.setState({ mode: this.state.mode === 'light' ? 'dark' : 'light' });
  };

  handleToggleSize = () => {
    this.setState({ size: this.state.size === 'normal' ? 'large' : 'normal' });
  };

  render() {
    return (
      <ThemeProvider theme={{ mode: this.state.mode, size: this.state.size }}>
        <Box>
          <h1>styled-theming</h1>
          <Button onClick={this.handleToggleMode}>Toggle Mode</Button>
          <Button kind="primary" onClick={this.handleToggleSize}>Toggle Size</Button>
          <Button kind="success" onClick={this.handleToggleMode}>Toggle Mode</Button>
          <Button kind="warning" onClick={this.handleToggleSize}>Toggle Size</Button>
          <Button kind="danger" onClick={this.handleToggleMode}>Toggle Mode</Button>
          <Button kind="noKind" onClick={this.handleToggleMode}>Toggle Size</Button>
        </Box>
      </ThemeProvider>
    );
  }
}
