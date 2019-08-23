import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

var PureComponent = function (_React$PureComponent) {
  _inherits(PureComponent, _React$PureComponent);

  function PureComponent() {
    _classCallCheck(this, PureComponent);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  PureComponent.prototype.classNames = function classNames() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return classnames(args);
  };

  PureComponent.prototype.className = function className() {
    var className = this.props.className;

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return this.classNames.apply(this, args.concat([className]));
  };

  PureComponent.prototype.style = function style(args) {
    var style = this.props.style;

    return Object.assign({}, args, style);
  };

  return PureComponent;
}(React.PureComponent);

export default PureComponent;


PureComponent.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
};