'use strict';

function getThemeValue(name, props, values) {
  var value = (
    props.theme &&
    props.theme[name]
  );

  var themeValue;

  if (typeof value === 'function') {
    themeValue = value(values);
  } else {
    themeValue = values[value];
  }

  if (typeof themeValue === 'function') {
    return themeValue(props);
  } else {
    return themeValue;
  }
}

function theme(name, values) {
  return function(props) {
    return getThemeValue(name, props, values);
  };
}

theme.variants = function(name, prop, values) {
  return function(props) {
    var variant = props[prop] && values[props[prop]];
    var defaultVariant = props[prop] && values['default'];

    return variant
        ? getThemeValue(name, props, variant)
        : getThemeValue(name, props, defaultVariant)
  };
};

module.exports = theme;
