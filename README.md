# styled-theming

> Create themes for your app using css-in-js

## Installation

```sh
yarn add styled-theming
```

## API

### `createTheme(theme)`

Create a theme for a `<ThemeProvider>`.

`theme` can either be a `string` or a `function` that selects a theme from a set:

```js
import {createTheme} from 'styled-theming';
import {ThemeProvider} from 'styled-components';

<ThemeProvider theme={createTheme('dark')}>
<ThemeProvider theme={createTheme(themes => themes.dark}>
```

### `toThemeSet(themes)`

Create a named set of CSS values where the keys are the names of your themes.

```js
import {toThemeSet} from 'styled-theming';
import styled from 'styled-components';

const backgroundColor = toThemeSet({
  light: '#fff',
  dark: '#000'
});

const Page = styled.div`
  background-color: ${backgroundColor};
`;
```

This will return a function that accepts props with a `theme` key that should
be the theme from `createTheme`. As long as you set up a tool like
styled-components properly it should just work.

```js
backgroundColor({ theme: createTheme('dark') });
```

Additionally, the returned value will have all the key-value pairs from your
theme set as properties.

```js
backgroundColor.light === '#fff';
backgroundColor.dark === '#000';
```

### `toVariantThemeSet(key, variants)`

It is often useful to have different variants of your components. You could
implement this yourself on top of `toThemeSet`, but since it is so common
there's also a provided `toVariantThemeSet`.

Provide a key to use for switching the variant and a named set of themes.

```js
import styled from 'styled-components';
import {toVariantThemeSet} from 'styled-theming';

const headingColor = toVariantThemeSet('variant', {
  default: { light: '#000', dark: '#fff' },
  fancy: { light: '#f0f', dark: '#f0f' },
});

const Heading = styled.h1`
  color: ${headingColor};
`;

Heading.propTypes = {
  variant: PropTypes.oneOf(['default', 'fancy'])
};

Heading.defaultProps = {
  variant: 'default',
};
```

The returned value will have all the key-value pairs from your variant theme
set as properties.

```js
headingColor.default === { light: '#fff', dark: '#000' };
headingColor.fancy === { light: '#f0f', dark: '#f0f' };
```
