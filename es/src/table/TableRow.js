import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { PureComponent } from '../../libs';
import TableCell from './TableCell';

var fns = ['handleMouseEnter', 'onMouseLeave', 'onClick', 'onContextMenu'];

var TableRow = function (_PureComponent) {
  _inherits(TableRow, _PureComponent);

  function TableRow() {
    _classCallCheck(this, TableRow);

    return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
  }

  TableRow.prototype.getRowStyle = function getRowStyle(row, index) {
    var rowStyle = this.props.rowStyle;

    if (typeof rowStyle === 'function') {
      return rowStyle.call(null, row, index);
    }

    return rowStyle;
  };

  TableRow.prototype.getRowClassName = function getRowClassName(row, index) {
    var rowClassName = this.props.rowClassName;

    if (typeof rowClassName === 'function') {
      return rowClassName.call(null, row, index);
    }
    return rowClassName;
  };

  TableRow.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        expanded = _props.expanded,
        row = _props.row,
        rowIndex = _props.rowIndex,
        rowIdentity = _props.rowIdentity,
        _props$columns = _props.columns,
        columns = _props$columns === undefined ? [] : _props$columns,
        selected = _props.selected,
        showGutter = _props.showGutter,
        _props$hiddenColumns = _props.hiddenColumns,
        hiddenColumns = _props$hiddenColumns === undefined ? [] : _props$hiddenColumns,
        stripe = _props.stripe,
        renderExpanded = _props.renderExpanded,
        highlightCurrentRow = _props.highlightCurrentRow,
        isCurrent = _props.isCurrent,
        isHover = _props.isHover,
        onRow = _props.onRow;

    var rowEventsHandler = {};
    if (onRow) {
      var handlers = onRow();
      Object.keys(handlers).forEach(function (fn) {
        if (fn in fns) {
          var propsFn = _this2.props[fn];
          rowEventsHandler[fn] = function (event) {
            if (!event.target.className.toString().includes('checkbox')) {
              handlers[fn](row, rowIndex, event);
            }
            propsFn && propsFn(row, rowIndex, event);
          };
        } else {
          rowEventsHandler[fn] = function (event) {
            if (event.target.className.toString().includes('checkbox')) {
              return;
            }
            handlers[fn](row, rowIndex, event);
          };
        }
      });
    }
    if (expanded) {
      return [React.createElement(
        'tr',
        {
          key: rowIdentity,
          style: this.getRowStyle(row, rowIndex),
          className: this.className('el-table__row', {
            'el-table__row--striped': stripe && rowIndex % 2 === 1,
            'hover-row': isHover,
            'current-row': highlightCurrentRow && isCurrent
          }, this.getRowClassName(row, rowIndex))
        },
        columns.map(function (col, index) {
          var value = void 0;
          if (col.type === 'selection') {
            value = selected;
          } else if (col.type === 'expand') {
            value = true;
          } else {
            value = get(row, col.dataIndex);
          }
          return React.createElement(TableCell, {
            value: value,
            rowIndex: rowIndex,
            hidden: hiddenColumns[index],
            key: rowIdentity + '-' + (col.key || col.dataIndex),
            row: row,
            column: col
          });
        }),
        showGutter && React.createElement('td', { className: 'gutter' })
      ), React.createElement(
        'tr',
        { key: rowIdentity + '-Expanded' },
        React.createElement(
          'td',
          { colSpan: columns.length, className: 'el-table__expanded-cell' },
          typeof renderExpanded === 'function' && renderExpanded(row, rowIndex)
        )
      )];
    }
    return React.createElement(
      'tr',
      _extends({
        key: rowIdentity,
        style: this.getRowStyle(row, rowIndex),
        className: this.className('el-table__row', {
          'el-table__row--striped': stripe && rowIndex % 2 === 1,
          'hover-row': isHover,
          'current-row': highlightCurrentRow && isCurrent
        }, this.getRowClassName(row, rowIndex))
      }, rowEventsHandler),
      columns.map(function (col, index) {
        var value = void 0;
        if (col.type === 'selection') {
          value = selected;
        } else if (col.type === 'expand') {
          value = false;
        } else {
          value = get(row, col.dataIndex);
        }
        return React.createElement(TableCell, {
          value: value,
          rowIndex: rowIndex,
          hidden: hiddenColumns[index],
          key: rowIdentity + '-' + (col.key || col.dataIndex),
          row: row,
          column: col
        });
      }),
      showGutter && React.createElement('td', { className: 'gutter' })
    );
  };

  return TableRow;
}(PureComponent);

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
  showGutter: PropTypes.bool,
  renderExpanded: PropTypes.func,
  highlightCurrentRow: PropTypes.bool,
  isCurrent: PropTypes.bool,
  isHover: PropTypes.bool,
  onRow: PropTypes.func
};

export default TableRow;