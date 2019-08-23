import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as React from 'react';
import { PropTypes, PureComponent } from '../../libs';
import { getRowIdentity } from './utils';

import ColGroup from './ColGroup';
import TableRow from './TableRow';

var TableBody = function (_PureComponent) {
  _inherits(TableBody, _PureComponent);

  function TableBody(props) {
    _classCallCheck(this, TableBody);

    var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props));

    _initialiseProps.call(_this);

    var _props$tableStoreStat = props.tableStoreState,
        tableStoreState = _props$tableStoreStat === undefined ? {} : _props$tableStoreStat;
    ['handleMouseLeave'].forEach(function (fn) {
      _this[fn] = _this[fn].bind(_this);
    });
    _this.columnsHidden = tableStoreState.columns.map(function (column, index) {
      return _this.isColumnHidden(index);
    });
    return _this;
  }

  TableBody.prototype.dispatchEvent = function dispatchEvent(name) {
    var fn = this.props[name];

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    fn && fn.apply(undefined, args);
  };

  TableBody.prototype.isColumnHidden = function isColumnHidden(index) {
    var fixed = this.props.fixed;

    if (fixed === true || fixed === 'left') {
      return index >= this.leftFixedCount;
    } else if (fixed === 'right') {
      return index < this.columnsCount - this.rightFixedCount;
    } else {
      return index < this.leftFixedCount || index >= this.columnsCount - this.rightFixedCount;
    }
  };

  TableBody.prototype.getKeyOfRow = function getKeyOfRow(row) {
    var rowKey = this.props.rowKey;

    if (rowKey) {
      return getRowIdentity(row, rowKey);
    }

    return null;
  };

  TableBody.prototype.render = function render() {
    var tableStoreState = this.props.tableStoreState;

    return React.createElement(
      'table',
      {
        className: 'el-table__body',
        cellPadding: 0,
        cellSpacing: 0,
        style: this.style({
          borderSpacing: 0,
          border: 0
        })
      },
      React.createElement(ColGroup, { columns: tableStoreState.columns }),
      React.createElement(
        'tbody',
        null,
        this.getTableRows()
      )
    );
  };

  _createClass(TableBody, [{
    key: 'columnsCount',
    get: function get() {
      var tableStoreState = this.props.tableStoreState;

      return tableStoreState.columns.length;
    }
  }, {
    key: 'leftFixedCount',
    get: function get() {
      var tableStoreState = this.props.tableStoreState;

      return tableStoreState.fixedColumns.length;
    }
  }, {
    key: 'rightFixedCount',
    get: function get() {
      var tableStoreState = this.props.tableStoreState;

      return tableStoreState.rightFixedColumns.length;
    }
  }]);

  return TableBody;
}(PureComponent);

TableBody.contextTypes = {
  tableStore: PropTypes.any
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleMouseEnter = function (row, index) {
    var tableStore = _this2.context.tableStore;

    tableStore.setHoverRow(index);
  };

  this.handleMouseLeave = function () {
    var tableStore = _this2.context.tableStore;

    tableStore.setHoverRow(null);
  };

  this.handleRowContextMenu = function (row, index, event) {
    _this2.dispatchEvent('onRowContextMenu', row, event);
  };

  this.handleClick = function (row, index) {
    var tableStore = _this2.context.tableStore;

    tableStore.setCurrentRow(row, index);
  };

  this.getTableRows = function () {
    var _props = _this2.props,
        tableStoreState = _props.tableStoreState,
        highlightCurrentRow = _props.highlightCurrentRow,
        layout = _props.layout,
        stripe = _props.stripe,
        renderExpanded = _props.renderExpanded,
        fixed = _props.fixed,
        currentRowKey = _props.currentRowKey,
        rowClassName = _props.rowClassName,
        rowStyle = _props.rowStyle,
        onRow = _props.onRow;
    var tableStore = _this2.context.tableStore;
    var _tableStoreState$data = tableStoreState.data,
        data = _tableStoreState$data === undefined ? [] : _tableStoreState$data,
        _tableStoreState$colu = tableStoreState.columns,
        columns = _tableStoreState$colu === undefined ? [] : _tableStoreState$colu,
        hoverRow = tableStoreState.hoverRow,
        currentRow = tableStoreState.currentRow;

    var showGutter = !fixed && layout.scrollY && !!layout.gutterWidth;
    return data.map(function (item, index) {
      var rowIdentity = _this2.getKeyOfRow(item);
      var expanded = tableStore.isRowExpanding(item, rowIdentity);
      var selected = tableStore.isRowSelected(item, rowIdentity);
      var isCurrent = currentRowKey === rowIdentity || currentRow === item;
      var isHover = hoverRow === index;
      return React.createElement(TableRow, {
        onRow: onRow,
        rowStyle: rowStyle,
        rowClassName: rowClassName,
        isCurrent: isCurrent,
        showGutter: showGutter,
        selected: selected,
        isHover: isHover,
        expanded: expanded,
        fixed: fixed,
        layout: layout,
        stripe: stripe,
        renderExpanded: renderExpanded,
        highlightCurrentRow: highlightCurrentRow,
        hiddenColumns: _this2.columnsHidden,
        key: rowIdentity,
        rowIdentity: rowIdentity,
        rowIndex: index,
        onMouseEnter: _this2.handleMouseEnter,
        onMouseLeave: _this2.handleMouseLeave,
        onClick: _this2.handleClick,
        onContextMenu: _this2.handleRowContextMenu,
        columns: columns,
        row: item
      });
    });
  };
};

export default TableBody;