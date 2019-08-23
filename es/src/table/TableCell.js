import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import { PureComponent } from '../../libs';

import Checkbox from '../checkbox';

var TableCell = function (_PureComponent) {
  _inherits(TableCell, _PureComponent);

  function TableCell() {
    var _temp, _this, _ret;

    _classCallCheck(this, TableCell);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.renderCell = function (row, column, index, key) {
      var value = _this.props.value;
      var type = column.type,
          selectable = column.selectable;
      var tableStore = _this.context.tableStore;

      if (type === 'expand') {
        return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          React.createElement(
            'div',
            {
              className: _this.classNames('el-table__expand-icon ', {
                'el-table__expand-icon--expanded': value
              }),
              onClick: _this.handleExpandClick.bind(_this, row, key)
            },
            React.createElement('i', { className: 'el-icon el-icon-arrow-right' })
          )
        );
      }

      if (type === 'index') {
        return React.createElement(
          'div',
          null,
          index + 1
        );
      }

      if (type === 'selection') {
        return React.createElement(Checkbox, {
          checked: value,
          disabled: selectable && !selectable(row, index),
          onChange: function onChange() {
            return tableStore.toggleRowSelection(row, !value);
          }
        });
      }

      return column.render(value, row, index);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  TableCell.prototype.handleCellMouseEnter = function handleCellMouseEnter(row, column, event) {
    this.dispatchEvent('onCellMouseEnter', row, column, event.currentTarget, event);
  };

  TableCell.prototype.handleCellMouseLeave = function handleCellMouseLeave(row, column, event) {
    this.dispatchEvent('onCellMouseLeave', row, column, event.currentTarget, event);
  };

  TableCell.prototype.handleCellClick = function handleCellClick(row, column, event) {
    this.dispatchEvent('onCellClick', row, column, event.currentTarget, event);
    this.dispatchEvent('onRowClick', row, event, column);
  };

  TableCell.prototype.handleCellDbClick = function handleCellDbClick(row, column, event) {
    this.dispatchEvent('onCellDbClick', row, column, event.currentTarget, event);
    this.dispatchEvent('onRowDbClick', row, column);
  };

  TableCell.prototype.dispatchEvent = function dispatchEvent(name) {
    var fn = this.props[name];

    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    fn && fn.apply(undefined, args);
  };

  TableCell.prototype.handleExpandClick = function handleExpandClick(row, rowKey) {
    var tableStore = this.context.tableStore;

    tableStore.toggleRowExpanded(row, rowKey);
  };

  TableCell.prototype.render = function render() {
    var _props = this.props,
        _props$row = _props.row,
        row = _props$row === undefined ? {} : _props$row,
        _props$column = _props.column,
        column = _props$column === undefined ? {} : _props$column,
        hidden = _props.hidden,
        rowIdentity = _props.rowIdentity,
        rowIndex = _props.rowIndex;

    return React.createElement(
      'td',
      {
        onKeyDown: function onKeyDown() {},
        className: this.classNames(column.className, column.align, column.columnKey, {
          'is-hidden': hidden
        }),
        onMouseEnter: this.handleCellMouseEnter.bind(this, row, column),
        onMouseLeave: this.handleCellMouseLeave.bind(this, row, column),
        onClick: this.handleCellClick.bind(this, row, column),
        onDoubleClick: this.handleCellDbClick.bind(this, row, column)
      },
      React.createElement(
        'div',
        { className: 'cell' },
        this.renderCell(row, column, rowIndex, rowIdentity)
      )
    );
  };

  return TableCell;
}(PureComponent);

TableCell.contextTypes = {
  tableStore: PropTypes.any
};


TableCell.propTypes = {
  row: PropTypes.any,
  column: PropTypes.any,
  tableStoreState: PropTypes.any,
  hidden: PropTypes.bool,
  rowIndex: PropTypes.number,
  rowIdentity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.any
};

export default TableCell;