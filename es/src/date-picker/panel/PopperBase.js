import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Component, PropTypes } from '../../../libs';
import { PopperReactMixin } from '../../../libs/utils';

export var PopperBase = function (_Component) {
  _inherits(PopperBase, _Component);

  function PopperBase(props) {
    _classCallCheck(this, PopperBase);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    PopperReactMixin.call(_this, function () {
      return _this.refs.root;
    }, props.getPopperRefElement, Object.assign({
      boundariesPadding: 0,
      gpuAcceleration: false
    }, props.popperMixinOption));
    return _this;
  }

  _createClass(PopperBase, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        //()=>HtmlElement
        getPopperRefElement: PropTypes.func,
        popperMixinOption: PropTypes.object
      };
    }
  }]);

  return PopperBase;
}(Component);