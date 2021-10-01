# styled-theming

> Create themes for your app using [styled-components](https://www.styled-components.com/)

Read the [introductory blog post](http://thejameskyle.com/styled-theming.html)

## Installation

```sh
yarn add styled-components styled-theming
```

## Example

### Without fallback
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

### With fallback
When there is no ThemeProvider on top hierarchy of components, you can set the fallback.

```js
import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import theme from 'styled-theming';

const boxBackgroundColor = theme('mode', {
  light: '#fff',
  dark: '#000',
}, 'light');

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

### `theme(name, values, fallback)`

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

The values will be passed through like any other interpolation
in styled-components. You can use the `css` helper to add entire
blocks of styles, including their own interpolations.

```js
import styled, {css} from 'styled-components';
import theme from 'styled-theming';

const white = "#fff";
const black = "#000";

const boxStyles = theme('mode', {
  light: css`
    background: ${white};
    color: ${black};
  `,
  dark: css`
    background: ${black};
    color: ${white};
  `,
});

const Box = styled.div`
  ${boxStyles}
`;
```

`fallback` should match one of the keys in your `<ThemeProvider>` theme.

```js
import styled, { ThemeProvider } from 'styled-components';
import theme from 'styled-theming';

const backgroundColor = theme('mode', { light: 'lightgray', dark: 'darkgray' }, 'light');

const Button = styled.button`
  background-color: ${backgroundColor};
`;

// Example #1 - bg color of this will be lightgray because no ThemeProvider as it's ancestors
<Button /> 

// Example #2 - bg color of this will be darkgray because it has ThemeProvider with a valid theme prop
<ThemeProvider theme={{ mode:'dark' }}>
  <Button />
</ThemeProvider>
```

### `theme.variants(name, prop, themes, fallback)`

It's often useful to create variants of the same component that are selected
via an additional prop.

To make this easier with theming, styled-theming provides a `theme.variants`
function.

```js
import styled, { ThemeProvider } from 'styled-components';
import theme from 'styled-theming';

const backgroundColor = theme.variants('mode', 'variant', {
  default: { light: 'gray', dark: 'darkgray' },
  primary: { light: 'blue', dark: 'darkblue' },
  success: { light: 'green', dark: 'darkgreen' },
  warning: { light: 'orange', dark: 'darkorange' },
}, 'light');

const Button = styled.button`
  background-color: ${backgroundColor};
`;

Button.propTypes = {
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning'])
};

Button.defaultProps = {
  variant: 'default',
};

// Example #1
<Button /> // bg color of this will be gray(default - light theme) because no ThemeProvider as it's ancestors
<Button variant="primary" /> // bg color of this will be blue because no ThemeProvider as it's ancestors
<Button variant="success"/> // bg color of this will be green because no ThemeProvider as it's ancestors
<Button variant="warning"/> // bg color of this will be orange because no ThemeProvider as it's ancestors

// Example #2
<ThemeProvider theme={{ mode:'dark' }}>
  <Button /> // bg color of this will be darkgray because it has ThemeProvider with a valid theme prop
  <Button variant="primary" /> // bg color of this will be darkblue because it has ThemeProvider with a valid theme prop
  <Button variant="success"/> // bg color of this will be darkgreen because it has ThemeProvider with a valid theme prop
  <Button variant="warning"/> // bg color of this will be darkorange because it has ThemeProvider with a valid theme prop
</ThemeProvider>
```