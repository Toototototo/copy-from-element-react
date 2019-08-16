// @flow
import * as React from 'react';
import { PropTypes, PureComponent } from '../../libs';
import { getRowIdentity } from './utils';

import type { TableBodyProps } from './Types';
import ColGroup from './ColGroup';
import TableRow from './TableRow';

export default class TableBody extends PureComponent<TableBodyProps> {
  static contextTypes = {
    tableStore: PropTypes.any,
  };

  constructor(props: TableBodyProps) {
    super(props);
    const { tableStoreState = {} } = props;
    ['handleMouseLeave'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
    this.columnsHidden = tableStoreState.columns.map((column, index) => this.isColumnHidden(index));
  }

  get columnsCount(): number {
    const { tableStoreState } = this.props
    return tableStoreState.columns.length;
  }

  get leftFixedCount(): number {
    const { tableStoreState } = this.props
    return tableStoreState.fixedColumns.length;
  }

  get rightFixedCount(): number {
    const { tableStoreState } = this.props
    return tableStoreState.rightFixedColumns.length;
  }

  handleMouseEnter = (index: number) => {
    const { tableStore } = this.context;
    tableStore.setHoverRow(index);
  }

  handleMouseLeave = () => {
    const { tableStore } = this.context;
    tableStore.setHoverRow(null);
  };

  handleRowContextMenu = (row: Object, event: SyntheticEvent<HTMLTableRowElement>) => {
    this.dispatchEvent('onRowContextMenu', row, event)
  }

  dispatchEvent(name: string, ...args: Array<any>) {
    const { [name]: fn } = this.props
    fn && fn(...args);
  }

  isColumnHidden(index: number): boolean {
    const { fixed } = this.props;
    if (fixed === true || fixed === 'left') {
      return index >= this.leftFixedCount;
    } else if (fixed === 'right') {
      return index < this.columnsCount - this.rightFixedCount;
    } else {
      return (index < this.leftFixedCount) || (index >= this.columnsCount - this.rightFixedCount);
    }
  }

  getKeyOfRow(row: Object): number | string {
    const { rowKey } = this.props;
    if (rowKey) {
      return getRowIdentity(row, rowKey);
    }

    return null;
  }

  handleClick = (row: Object, index: number) => {
    const { tableStore } = this.context;
    tableStore.setCurrentRow(row, index);
  };

  getTableRows = () => {
    const { tableStoreState, highlightCurrentRow, layout, stripe, renderExpanded, fixed, currentRowKey, rowClassName, rowStyle } = this.props;
    const { tableStore } = this.context;
    const { data = [], columns = [], hoverRow, currentRow } = tableStoreState;
    const showGutter = (!fixed && layout.scrollY && !!layout.gutterWidth);
    return data.map((item, index) => {
      const rowIdentity = this.getKeyOfRow(item);
      const expanded = tableStore.isRowExpanding(item, rowIdentity);
      const selected = tableStore.isRowSelected(item, rowIdentity);
      const isCurrent = (currentRowKey === rowIdentity || currentRow === item);
      const isHover = hoverRow === index;
      return (
        <TableRow
          rowStyle={rowStyle}
          rowClassName={rowClassName}
          isCurrent={isCurrent}
          showGutter={showGutter}
          selected={selected}
          isHover={isHover}
          expanded={expanded}
          fixed={fixed}
          layout={layout}
          stripe={stripe}
          renderExpanded={renderExpanded}
          highlightCurrentRow={highlightCurrentRow}
          hiddenColumns={this.columnsHidden}
          key={rowIdentity}
          rowIdentity={rowIdentity}
          rowIndex={index}
          handleMouseEnter={this.handleMouseEnter}
          handleMouseLeave={this.handleMouseLeave}
          handleClick={this.handleClick}
          handleRowContextMenu={this.handleRowContextMenu}
          columns={columns}
          row={item}
        />
      )
    });
  };

  render() {
    const { tableStoreState } = this.props;
    return (
      <table
        className="el-table__body"
        cellPadding={0}
        cellSpacing={0}
        style={this.style({
          borderSpacing: 0,
          border: 0
        })}
      >
        <ColGroup columns={tableStoreState.columns} />
        <tbody>{this.getTableRows()}</tbody>
      </table>
    );
  }
}
