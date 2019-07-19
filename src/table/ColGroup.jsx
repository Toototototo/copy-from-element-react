import React from 'react';
import PropTypes from 'prop-types';

export default function ColGroup({ columns }) {
  const cols = columns.map(({ key, dataIndex, width, ...additionalProps }) => {
    const mergedKey = key !== undefined ? key : dataIndex;
    return <col key={mergedKey} style={{ width, minWidth: width }} {...additionalProps} />;
  });
  return (<colgroup>{cols}</colgroup>)
}

ColGroup.propTypes = {
  columns: PropTypes.arrayOf,
};
