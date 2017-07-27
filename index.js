'use strict';

var INTERNAL_KEY = '__styled_theming_' + (+new Date()) + '__';

exports.createTheme = function(theme) {
  let obj = {};
  obj[INTERNAL_KEY] = theme;
  return obj;
};

var getThemeValue = exports.getThemeValue = function(props, themes) {
  var value = props.theme && props.theme[INTERNAL_KEY];

  if (typeof value === 'function') {
    return value(themes);
  } else {
    return themes[value];
  }
};

exports.toThemeSet = function(themes) {
  function themeSet(props) {
    return getThemeValue(props, themes);
  }
  Object.assign(themeSet, themes);
  return themeSet;
};

exports.toVariantThemeSet = function(key, variants) {
  function variantThemeSet(props) {
    var variant = props[key] && variants[props[key]];
    return variant ? getThemeValue(props, variant) : '';
  }
  Object.assign(variantThemeSet, variants);
  return variantThemeSet;
};
