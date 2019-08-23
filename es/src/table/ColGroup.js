import React from 'react';
import PropTypes from 'prop-types';

export default function ColGroup(_ref) {
  var _ref$columns = _ref.columns,
      columns = _ref$columns === undefined ? [] : _ref$columns;

  var cols = columns.map(function (col) {
    return React.createElement('col', { width: col.realWidth, style: { width: col.realWidth }, key: col.key || col.dataIndex || col.type });
  });
  return React.createElement(
    'colgroup',
    null,
    cols
  );
}

ColGroup.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.any)
};