// @flow
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { PureComponent } from '../../libs';
import TableCell from './TableCell';

class TableRow extends PureComponent {
  static contextTypes = {
    tableStore: PropTypes.any,
  };

  getRowStyle(row: Object, index: number): Object {
    const { rowStyle } = this.props;
    if (typeof rowStyle === 'function') {
      return rowStyle.call(null, row, index);
    }

    return rowStyle;
  }

  getRowClassName(row: Object, index: number): string {
    const { rowClassName } = this.props;
    if (typeof rowClassName === 'function') {
      return rowClassName.call(null, row, index);
    }
    return rowClassName;
  }

  render(): React.ReactNode {
    const { expanded, row, rowIndex, tableStoreState, rowIdentity, columns = [], hiddenColumns = [], layout, ...props } = this.props;
    const { tableStore } = this.context;
    if (expanded) {
      return [
        <tr
          key={rowIdentity}
          style={this.getRowStyle(row, rowIndex)}
          className={this.className('el-table__row', {
            'el-table__row--striped': props.stripe && rowIndex % 2 === 1,
            'hover-row': tableStoreState.hoverRow === rowIndex,
            'current-row': props.highlightCurrentRow && (props.currentRowKey === rowIdentity || tableStoreState.currentRow === row),
          }, this.getRowClassName(row, rowIndex))}
          onMouseEnter={() => props.handleMouseEnter(rowIndex)}
          onMouseLeave={props.handleMouseLeave}
          onClick={() => props.handleClick(row)}
          onContextMenu={() => props.handleRowContextMenu(row)}
        >
          {
            columns.map((col, index) => (
              <TableCell
                rowIndex={rowIndex}
                hidden={hiddenColumns[index]}
                key={`${rowIdentity}-${col.key || col.dataIndex}`}
                row={row}
                column={col}
              />
            ))
          }
          {!props.fixed && layout.scrollY && !!layout.gutterWidth && (
            <td className="gutter" />
          )}
        </tr>,
        <tr key={`${rowIdentity}-Expanded`}>
          <td
            colSpan={tableStoreState.columns.length}
            className="el-table__expanded-cell"
          >
            {typeof props.renderExpanded === 'function' && props.renderExpanded(row, rowIndex)}
          </td>
        </tr>,
      ];
    }
    return (
      <tr
        key={rowIdentity}
        style={this.getRowStyle(row, rowIndex)}
        className={this.className('el-table__row', {
          'el-table__row--striped': props.stripe && rowIndex % 2 === 1,
          'hover-row': tableStoreState.hoverRow === rowIndex,
          'current-row': props.highlightCurrentRow && (props.currentRowKey === rowIdentity || tableStoreState.currentRow === row),
        }, this.getRowClassName(row, rowIndex))}
        onMouseEnter={() => props.handleMouseEnter(rowIndex)}
        onMouseLeave={props.handleMouseLeave}
        onClick={() => props.handleClick(row)}
        onContextMenu={() => props.handleRowContextMenu(row)}
      >
        {
          columns.map((col, index) => {
              let value;
              if (col.type === 'selection') {
                value = tableStore.isRowSelected(row, rowIdentity)
              } else if (col.type === 'expand') {
                value = tableStore.isRowExpanding(row, rowIdentity)
              } else {
                value = get(row, col.dataIndex)
              }
              return (
                <TableCell
                  value={value}
                  rowIndex={rowIndex}
                  hidden={hiddenColumns[index]}
                  key={`${rowIdentity}-${col.key || col.dataIndex}`}
                  row={row}
                  column={col}
                />
              )
            }
          )
        }
        {!props.fixed && layout.scrollY && !!layout.gutterWidth && (
          <td className="gutter" />
        )}
      </tr>
    );
  }
}

TableRow.propTypes = {
  expanded: PropTypes.bool,
  tableStoreState: PropTypes.any,
  rowStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  rowClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  columns: PropTypes.arrayOf(PropTypes.any),
  row: PropTypes.object,
  rowKey: PropTypes.string,
  rowIndex: PropTypes.number,
  layout: PropTypes.object,
};

export default TableRow;
