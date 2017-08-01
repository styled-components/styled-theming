'use strict';

function getThemeValue(name, props, values) {
  var value = (
    props.theme &&
    props.theme[name]
  );

  if (typeof value === 'function') {
    return value(values);
  } else {
    return values[value];
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
    return variant && getThemeValue(name, props, variant);
  };
};

module.exports = theme;
