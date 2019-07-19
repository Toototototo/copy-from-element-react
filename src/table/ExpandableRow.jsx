import React from 'react';
import PropTypes from 'prop-types';

class ExpandableRow extends React.Component {
  static propTypes = {
    prefixCls: PropTypes.string.isRequired,
    rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    fixed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    record: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    indentSize: PropTypes.number,
    needIndentSpaced: PropTypes.bool.isRequired,
    expandRowByClick: PropTypes.bool,
    expanded: PropTypes.bool.isRequired,
    expandIconAsCell: PropTypes.bool,
    expandIconColumnIndex: PropTypes.number,
    childrenColumnName: PropTypes.string,
    expandedRowRender: PropTypes.func,
    expandIcon: PropTypes.func,
    onExpandedChange: PropTypes.func.isRequired,
    onRowClick: PropTypes.func,
    children: PropTypes.func.isRequired,
  };

  componentWillUnmount() {
    this.handleDestroy();
  }

  handleExpandChange = (record, event) => {
    const { onExpandedChange, expanded, rowKey } = this.props;
    if (this.expandable) {
      onExpandedChange(!expanded, record, event, rowKey);
    }
  };

  handleDestroy() {
    const { onExpandedChange, rowKey, record } = this.props;
    if (this.expandable) {
      onExpandedChange(false, record, null, rowKey, true);
    }
  }

  handleRowClick = (record, index, event) => {
    const { expandRowByClick, onRowClick } = this.props;
    if (expandRowByClick) {
      this.handleExpandChange(record, event);
    }
    if (onRowClick) {
      onRowClick(record, index, event);
    }
  };

  render() {
    const {
      childrenColumnName,
      expandedRowRender,
      indentSize,
      record,
      expanded,
      children,
    } = this.props;

    const childrenData = record[childrenColumnName];
    this.expandable = !!(childrenData || expandedRowRender);

    const expandableRowProps = {
      indentSize,
      expanded, // not used in TableRow, but it's required to re-render TableRow when `expanded` changes
      onRowClick: this.handleRowClick,
    };

    return children(expandableRowProps);
  }
}

export default ExpandableRow
