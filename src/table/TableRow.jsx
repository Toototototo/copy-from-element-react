// @flow
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { PureComponent } from '../../libs';
import TableCell from './TableCell';

class TableRow extends PureComponent {
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
    const {
      expanded, row, rowIndex, rowIdentity, columns = [], selected, showGutter,
      hiddenColumns = [], stripe, handleMouseEnter, handleMouseLeave, handleClick,
      handleRowContextMenu, renderExpanded, highlightCurrentRow, isCurrent, isHover,
    } = this.props;
    if (expanded) {
      return [
        <tr
          key={rowIdentity}
          style={this.getRowStyle(row, rowIndex)}
          className={this.className('el-table__row', {
            'el-table__row--striped': stripe && rowIndex % 2 === 1,
            'hover-row': isHover,
            'current-row': highlightCurrentRow && isCurrent,
          }, this.getRowClassName(row, rowIndex))}
          onMouseEnter={() => handleMouseEnter(rowIndex)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(row)}
          onContextMenu={() => handleRowContextMenu(row)}
        >
          {
            columns.map((col, index) => {
              let value;
              if (col.type === 'selection') {
                value = selected;
              } else if (col.type === 'expand') {
                value = true;
              } else {
                value = get(row, col.dataIndex);
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
              );
            })
          }
          {showGutter && (
            <td className="gutter" />
          )}
        </tr>,
        <tr key={`${rowIdentity}-Expanded`}>
          <td
            colSpan={columns.length}
            className="el-table__expanded-cell"
          >
            {typeof renderExpanded === 'function' && renderExpanded(row, rowIndex)}
          </td>
        </tr>,
      ];
    }
    return (
      <tr
        key={rowIdentity}
        style={this.getRowStyle(row, rowIndex)}
        className={this.className('el-table__row', {
          'el-table__row--striped': stripe && rowIndex % 2 === 1,
          'hover-row': isHover,
          'current-row': highlightCurrentRow && isCurrent,
        }, this.getRowClassName(row, rowIndex))}
        onMouseEnter={() => handleMouseEnter(rowIndex)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(row)}
        onContextMenu={() => handleRowContextMenu(row)}
      >
        {
          columns.map((col, index) => {
              let value;
              if (col.type === 'selection') {
                value = selected;
              } else if (col.type === 'expand') {
                value = false;
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
        {showGutter && (
          <td className="gutter" />
        )}
      </tr>
    );
  }
}

TableRow.propTypes = {
  selected: PropTypes.bool,
  expanded: PropTypes.bool,
  rowStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  rowClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  columns: PropTypes.arrayOf(PropTypes.any),
  row: PropTypes.object,
  rowIdentity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rowIndex: PropTypes.number,
  hiddenColumns: PropTypes.arrayOf(PropTypes.bool),
  stripe: PropTypes.bool,
  handleMouseEnter: PropTypes.func,
  handleMouseLeave: PropTypes.func,
  handleClick: PropTypes.func,
  handleRowContextMenu: PropTypes.func,
  showGutter: PropTypes.bool,
  renderExpanded: PropTypes.func,
  highlightCurrentRow: PropTypes.bool,
  isCurrent: PropTypes.bool,
  isHover: PropTypes.bool,
};

export default TableRow;
