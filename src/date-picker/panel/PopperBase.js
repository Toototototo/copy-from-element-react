import { Component, PropTypes } from '../../../libs';
import { PopperReactMixin } from '../../../libs/utils'

export class PopperBase extends Component {
  constructor(props) {
    super(props)

    PopperReactMixin.call(this, () => this.refs.root, props.getPopperRefElement, Object.assign({
      boundariesPadding: 0,
      gpuAcceleration: false
    }, props.popperMixinOption));
  }

  static get propTypes() {
    return {
      //()=>HtmlElement
      getPopperRefElement: PropTypes.func,
      popperMixinOption: PropTypes.object
    }
  }
}
