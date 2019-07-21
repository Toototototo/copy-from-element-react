// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { PureComponent } from '../../libs';
import type { _Column } from './Types';
import Checkbox from '../checkbox';

class TableCell extends PureComponent {
  static contextTypes = {
    tableStore: PropTypes.any,
  };

  handleCellMouseEnter(row: Object, column: _Column, event: SyntheticEvent<HTMLTableCellElement>) {
    this.dispatchEvent('onCellMouseEnter', row, column, event.currentTarget, event);
  }

  handleCellMouseLeave(row: Object, column: _Column, event: SyntheticEvent<HTMLTableCellElement>) {
    this.dispatchEvent('onCellMouseLeave', row, column, event.currentTarget, event);
  }

  handleCellClick(row: Object, column: _Column, event: SyntheticEvent<HTMLTableCellElement>) {
    this.dispatchEvent('onCellClick', row, column, event.currentTarget, event);
    this.dispatchEvent('onRowClick', row, event, column);
  }

  handleCellDbClick(row: Object, column: _Column, event: SyntheticEvent<HTMLTableCellElement>) {
    this.dispatchEvent('onCellDbClick', row, column, event.currentTarget, event);
    this.dispatchEvent('onRowDbClick', row, column);
  }

  dispatchEvent(name: string, ...args: Array<any>) {
    const { [name]: fn } = this.props;
    fn && fn(...args);
  }

  renderCell = (row: Object, column: _Column, index: number, key: string | number): React.DOM => {
    const { type, selectable } = column;
    const { tableStore } = this.context;
    if (type === 'expand') {
      return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          className={this.classNames('el-table__expand-icon ', {
            'el-table__expand-icon--expanded': tableStore.isRowExpanding(row, key)
          })}
          onClick={this.handleExpandClick.bind(this, row, key)}
        >
          <i className="el-icon el-icon-arrow-right" />
        </div>
      )
    }

    if (type === 'index') {
      return <div>{index + 1}</div>;
    }

    if (type === 'selection') {
      const isSelected = tableStore.isRowSelected(row, key);
      return (
        <Checkbox
          checked={isSelected}
          disabled={selectable && !selectable(row, index)}
          onChange={() => {
            tableStore.toggleRowSelection(row, !isSelected);
          }}
        />
      )
    }

    const { dataIndex } = column;
    return column.render(row ? row[dataIndex] : undefined, row, index);
  }

  render(): React.ReactNode {
    const { row = {}, column = {}, hidden, rowIdentity, rowIndex } = this.props;
    return (
      <td
        onKeyDown={() => {
        }}
        className={this.classNames(column.className, column.align, column.columnKey, {
          'is-hidden': hidden,
        })}
        onMouseEnter={this.handleCellMouseEnter.bind(this, row, column)}
        onMouseLeave={this.handleCellMouseLeave.bind(this, row, column)}
        onClick={this.handleCellClick.bind(this, row, column)}
        onDoubleClick={this.handleCellDbClick.bind(this, row, column)}
      >
        <div className="cell">{this.renderCell(row, column, rowIndex, rowIdentity)}</div>
      </td>
    );
  }
}

TableCell.propTypes = {
  row: PropTypes.any,
  column: PropTypes.any,
  tableStoreState: PropTypes.any,
  hidden: PropTypes.bool,
  rowIndex: PropTypes.number,
  rowIdentity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default TableCell;
