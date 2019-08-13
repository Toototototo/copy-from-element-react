import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Table extends Markdown {
  document(locale) {
    // eslint-disable-next-line import/no-dynamic-require
    return require(`../../docs/${locale}/table.md`);
  }
}
