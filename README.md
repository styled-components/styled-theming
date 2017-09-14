# styled-theming

> Create themes for your app using [styled-components](https://www.styled-components.com/)

Read the [introductory blog post](http://thejameskyle.com/styled-theming.html)

## Installation

```sh
yarn add styled-components styled-theming
```

## Example

```js
import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import theme from 'styled-theming';

const boxBackgroundColor = theme('mode', {
  light: '#fff',
  dark: '#000',
});

const Box = styled.div`
  background-color: ${boxBackgroundColor};
`;

export default function App() {
  return (
    <ThemeProvider theme={{ mode: 'light' }}>
      <Box>
        Hello World
      </Box>
    </ThemeProvider>
  );
}
```

## API

### `<ThemeProvider>`

See [styled-components docs](https://www.styled-components.com/docs/advanced#theming)

`<ThemeProvider>` is part of styled-components, but is required for styled-theming.

```js
import {ThemeProvider} from 'styled-components';
```

`<ThemeProvider>` accepts a single prop `theme` which you should pass an object
with either strings or getter functions. For example:

```js
<ThemeProvider theme={{ mode: 'dark', size: 'large' }}>
<ThemeProvider theme={{ mode: modes => modes.dark, size: sizes => sizes.large }}>
```

You should generally set up a `<ThemeProvider>` at the root of your app:

```js
function App() {
  return (
    <ThemeProvider theme={...}>
      {/* rest of your app */}
    </ThemeProvider>
  );
}
```

### `theme(name, values)`

Most of your theming will be done with this function.

`name` should match one of the keys in your `<ThemeProvider>` theme.

```js
<ThemeProvider theme={{ whatever: '...' }}/>

theme('whatever', {...});
```

`values` should be an object where one of the keys will be selected by the
value provided to `<ThemeProvider>` theme.

```js
<ThemeProvider theme={{ mode: 'light' }}/>
<ThemeProvider theme={{ mode: 'dark' }}/>

theme('mode', {
  light: '...',
  dark: '...',
});
```

The values of this object can be any CSS value.

```js
theme('mode', {
  light: '#fff',
  dark: '#000',
});

theme('font', {
  sansSerif: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  serif: 'Georgia, Times, "Times New Roman", serif',
  monoSpaced: 'Consolas, monaco, monospace',
});
```

These values can also be functions that return CSS values.

```js
theme('mode', {
  light: props => props.theme.userProfileAccentColor.light,
  dark: props => props.theme.userProfileAccentColor.dark,
});
```

`theme` will create a function that you can use as a value in
styled-component's `styled` function.

```js
import styled from 'styled-components';
import theme from 'styled-theming';

const backgroundColor = theme('mode', {
  light: '#fff',
  dark: '#000',
});

const Box = styled.div`
  background-color: ${backgroundColor}
`;
```

### `theme.variants(name, prop, themes)`

It's often useful to create variants of the same component that are selected
via an additional prop.

To make this easier with theming, styled-theming provides a `theme.variants`
function.

```js
import styled from 'styled-components';
import theme from 'styled-theming';

const backgroundColor = theme.variants('variant', 'mode', {
  default: { light: 'gray', dark: 'darkgray' },
  primary: { light: 'blue', dark: 'darkblue' },
  success: { light: 'green', dark: 'darkgreen' },
  warning: { light: 'orange', dark: 'darkorange' },
});

const Button = styled.button`
  background-color: ${backgroundColor};
`;

Button.propTypes = {
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning'])
};

Button.defaultProps = {
  variant: 'default',
};

<Button/>
<Button variant="primary"/>
<Button variant="success"/>
<Button variant="warning"/>
```
