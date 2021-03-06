import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Rate extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/rate.md`);
  }
}
