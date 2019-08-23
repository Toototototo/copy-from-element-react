import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from "react";
import { throttle } from "throttle-debounce";
import { PropTypes, PureComponent } from "../../libs";
import Checkbox from "../checkbox";
import FilterPannel from "./FilterPannel";

var _document = document;

var TableHeader = function (_PureComponent) {
  _inherits(TableHeader, _PureComponent);

  function TableHeader(props) {
    _classCallCheck(this, TableHeader);

    var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props));

    ["handleHeaderClick", "handleFilterClick", "handleSortClick"].forEach(function (fn) {
      _this[fn] = throttle(300, true, _this[fn]);
    });
    return _this;
  }

  TableHeader.prototype.handleMouseMove = function handleMouseMove(column, event) {
    if (!column.resizable) return;
    if (column.subColumns && column.subColumns.length) return;
    var border = this.props.border;


    if (!this.dragging && border) {
      var target = event.target;
      while (target && target.tagName !== "TH") {
        target = target.parentNode;
      }

      var rect = target.getBoundingClientRect();
      var bodyStyle = _document.body.style;
      if (rect.width > 12 && rect.right - event.pageX < 8) {
        bodyStyle.cursor = "col-resize";
        this.draggingColumn = column;
      } else {
        bodyStyle.cursor = "";
        this.draggingColumn = null;
      }
    }
  };

  TableHeader.prototype.handleMouseDown = function handleMouseDown(column, event) {
    var _this2 = this;

    if (this.draggingColumn) {
      this.dragging = true;

      var table = this.context.table;
      var tableEl = table.el,
          resizeProxy = table.resizeProxy;

      var tableLeft = tableEl.getBoundingClientRect().left;
      var columnEl = event.target;
      while (columnEl && columnEl.tagName !== "TH") {
        columnEl = columnEl.parentNode;
      }
      var columnRect = columnEl.getBoundingClientRect();
      var minLeft = columnRect.left - tableLeft + 30;
      columnEl.classList.add("noclick");

      var startMouseLeft = event.clientX;
      var startLeft = columnRect.right - tableLeft;
      var startColumnLeft = columnRect.left - tableLeft;

      resizeProxy.style.visibility = "visible";
      resizeProxy.style.left = startLeft + "px";

      _document.onselectstart = function () {
        return false;
      };
      _document.ondragstart = function () {
        return false;
      };

      var handleMouseMove = function handleMouseMove(event) {
        var deltaLeft = event.clientX - startMouseLeft;
        var proxyLeft = startLeft + deltaLeft;

        resizeProxy.style.left = Math.max(minLeft, proxyLeft) + "px";
      };

      var handleMouseUp = function handleMouseUp(event) {
        if (_this2.dragging) {
          var finalLeft = parseInt(resizeProxy.style.left, 10);
          var columnWidth = finalLeft - startColumnLeft;
          var oldWidth = column.realWidth;
          column.width = column.realWidth = columnWidth;

          _this2.dragging = false;
          _this2.draggingColumn = null;

          _document.body.style.cursor = "";
          resizeProxy.style.visibility = "hidden";
          _document.removeEventListener("mousemove", handleMouseMove);
          _document.removeEventListener("mouseup", handleMouseUp);
          _document.onselectstart = null;
          _document.ondragstart = null;
          setTimeout(function () {
            columnEl.classList.remove("noclick");
          });

          var layout = _this2.context.layout;

          layout.scheduleLayout();
          _this2.dispatchEvent("onHeaderDragEnd", columnWidth, oldWidth, column, event);
        }
      };

      _document.addEventListener("mousemove", handleMouseMove);
      _document.addEventListener("mouseup", handleMouseUp);
    }
  };

  TableHeader.prototype.handleMouseOut = function handleMouseOut() {
    _document.body.style.cursor = "";
  };

  TableHeader.prototype.handleHeaderClick = function handleHeaderClick(column, event) {
    if (column.sortable && !column.filters) {
      this.handleSortClick(column, null, event);
    } else if (column.filters && !column.sortable) {
      this.handleFilterClick(column, event);
    } else {
      this.dispatchEvent("onHeaderClick", column, event);
    }
  };

  TableHeader.prototype.handleSortClick = function handleSortClick(column, givenOrder, event) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    var target = event.target;
    while (target && target.tagName !== "TH") {
      target = target.parentNode;
    }
    if (target.classList.contains("noclick")) return;

    var order = void 0;
    var tableStoreState = this.props.tableStoreState;
    var tableStore = this.context.tableStore;

    if (givenOrder) {
      order = givenOrder;
    } else {
      var sortColumn = tableStoreState.sortColumn,
          sortOrder = tableStoreState.sortOrder;

      if (column === sortColumn) {
        if (!sortOrder) {
          order = "ascending";
        } else {
          order = sortOrder === "ascending" ? "descending" : null;
        }
      } else {
        order = "ascending";
      }
    }
    tableStore.changeSortCondition(column, order);

    this.dispatchEvent("onHeaderClick", column, event);
  };

  TableHeader.prototype.handleFilterClick = function handleFilterClick(column, event) {
    if (event) {
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    }
    var tableStore = this.context.tableStore;


    tableStore.toggleFilterOpened(column);

    event && this.dispatchEvent("onHeaderClick", column, event);
  };

  TableHeader.prototype.dispatchEvent = function dispatchEvent(name) {
    var fn = this.props[name];

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    fn && fn.apply(undefined, args);
  };

  TableHeader.prototype.changeFilteredValue = function changeFilteredValue(column, value) {
    var tableStore = this.context.tableStore;

    tableStore.changeFilteredValue(column, value);
  };

  TableHeader.prototype.isCellHidden = function isCellHidden(index, columns) {
    var fixed = this.props.fixed;

    if (fixed === true || fixed === "left") {
      return index >= this.leftFixedCount;
    } else if (fixed === "right") {
      var before = 0;
      for (var i = 0; i < index; i++) {
        before += columns[i].colSpan;
      }
      return before < this.columnsCount - this.rightFixedCount;
    } else {
      return index < this.leftFixedCount || index >= this.columnsCount - this.rightFixedCount;
    }
  };

  TableHeader.prototype.renderHeader = function renderHeader(column) {
    var type = column.type;
    var tableStore = this.context.tableStore;

    if (type === "expand") {
      return column.label || "";
    }

    if (type === "index") {
      return column.label || "#";
    }

    if (type === "selection") {
      return React.createElement(Checkbox, {
        indeterminate: tableStore.isIndeterminate,
        checked: tableStore.isAllSelected,
        onChange: function onChange(v) {
          return tableStore.toggleAllSelection(v);
        }
      });
    }

    return column.renderHeader ? column.renderHeader(column) : column.label;
  };

  TableHeader.prototype.render = function render() {
    var _this3 = this;

    var _props = this.props,
        tableStoreState = _props.tableStoreState,
        layout = _props.layout,
        fixed = _props.fixed;

    return React.createElement(
      "table",
      {
        className: "el-table__header",
        cellPadding: 0,
        cellSpacing: 0,
        style: this.style({
          borderSpacing: 0,
          border: 0
        })
      },
      React.createElement(
        "colgroup",
        null,
        tableStoreState.columns.map(function (column) {
          return React.createElement("col", {
            width: column.realWidth,
            style: { width: column.realWidth },
            key: column.key || column.dataIndex || column.type
          });
        }),
        !fixed && React.createElement("col", {
          key: "gutter",
          width: layout.scrollY ? layout.gutterWidth : 0,
          style: { width: layout.scrollY ? layout.gutterWidth : 0 }
        })
      ),
      React.createElement(
        "thead",
        null,
        tableStoreState.columnRows.map(function (columns, rowIndex) {
          return React.createElement(
            "tr",
            { key: rowIndex },
            columns.map(function (column, cellIndex) {
              return (
                // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
                React.createElement(
                  "th",
                  {
                    colSpan: column.colSpan,
                    rowSpan: column.rowSpan,
                    className: _this3.className(tableStoreState.sortColumn === column && tableStoreState.sortOrder, column.headerAlign, column.className, column.labelClassName, column.columnKey, {
                      "is-hidden": rowIndex === 0 && _this3.isCellHidden(cellIndex, columns),
                      "is-leaf": !column.subColumns,
                      "is-sortable": column.sortable
                    }),
                    onMouseMove: _this3.handleMouseMove.bind(_this3, column),
                    onMouseDown: _this3.handleMouseDown.bind(_this3, column),
                    onMouseOut: _this3.handleMouseOut,
                    onClick: _this3.handleHeaderClick.bind(_this3, column),
                    key: cellIndex
                  },
                  React.createElement(
                    "div",
                    { className: "cell" },
                    _this3.renderHeader(column),
                    column.sortable &&
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    React.createElement(
                      "span",
                      {
                        className: "caret-wrapper",
                        onClick: _this3.handleSortClick.bind(_this3, column, null)
                      },
                      React.createElement("i", {
                        className: "sort-caret ascending",
                        onClick: _this3.handleSortClick.bind(_this3, column, "ascending")
                      }),
                      React.createElement("i", {
                        className: "sort-caret descending",
                        onClick: _this3.handleSortClick.bind(_this3, column, "descending")
                      })
                    ),
                    column.filterable && React.createElement(
                      FilterPannel,
                      {
                        visible: column.filterOpened,
                        multiple: column.filterMultiple,
                        filters: column.filters,
                        filteredValue: column.filteredValue,
                        placement: column.filterPlacement,
                        onFilterChange: _this3.changeFilteredValue.bind(_this3, column),
                        toggleFilter: _this3.handleFilterClick.bind(_this3, column)
                      },
                      React.createElement(
                        "span",
                        {
                          className: "el-table__column-filter-trigger",
                          onClick: _this3.handleFilterClick.bind(_this3, column)
                        },
                        React.createElement("i", {
                          className: _this3.classNames("el-icon-arrow-down", {
                            "el-icon-arrow-up": column.filterOpened
                          })
                        })
                      )
                    )
                  )
                )
              );
            }),
            !fixed && React.createElement("th", {
              className: "gutter",
              style: { width: layout.scrollY ? layout.gutterWidth : 0 }
            })
          );
        })
      )
    );
  };

  _createClass(TableHeader, [{
    key: "columnsCount",
    get: function get() {
      var tableStoreState = this.props.tableStoreState;

      return tableStoreState.columns.length;
    }
  }, {
    key: "leftFixedCount",
    get: function get() {
      var tableStoreState = this.props.tableStoreState;

      return tableStoreState.fixedColumns.length;
    }
  }, {
    key: "rightFixedCount",
    get: function get() {
      var tableStoreState = this.props.tableStoreState;

      return tableStoreState.rightFixedColumns.length;
    }
  }]);

  return TableHeader;
}(PureComponent);

TableHeader.contextTypes = {
  tableStore: PropTypes.any,
  layout: PropTypes.any,
  table: PropTypes.any
};
export default TableHeader;