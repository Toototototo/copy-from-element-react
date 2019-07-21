import React from 'react'
import PropTypes from 'prop-types'

export default function ColGroup({ columns = [] }) {
  const cols = columns.map(
    col => <col width={col.realWidth} style={{ width: col.realWidth }} key={col.key || col.dataIndex} />
  );
  return (
    <colgroup>{cols}</colgroup>
  )
}

ColGroup.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.any),
};
