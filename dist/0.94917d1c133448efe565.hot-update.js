webpackHotUpdate(0,{

/***/ 492:
/***/ (function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _reactDataGrid = __webpack_require__(402);\n\nvar _reactDataGrid2 = _interopRequireDefault(_reactDataGrid);\n\nvar _react = __webpack_require__(2);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _types = __webpack_require__(61);\n\nvar proptypes = _interopRequireWildcard(_types);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar CollectionMessage = function (_Component) {\n  _inherits(CollectionMessage, _Component);\n\n  function CollectionMessage() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, CollectionMessage);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CollectionMessage.__proto__ || Object.getPrototypeOf(CollectionMessage)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {\n      console.log(_this.props.text);\n      var data = JSON.parse(_this.props.text);\n      console.log(data);\n      _this.testColumns = data[\"column_data\"];\n      _this.testRows = data[\"row_data\"];\n      _this.getRow = function (i) {\n        return _this.testRows[i];\n      };\n      var containsText = false;\n      var singleColumn = _this.testColumns.length === 1;\n      var hasText = false;\n      return _react2.default.createElement(\n        'div',\n        { className: _this.props.origin === 'iris' ? 'message left' : 'message right', style: _this.props.hidden === true ? { display: 'none' } : {} },\n        _react2.default.createElement(\n          'div',\n          { className: 'bubble table' },\n          _react2.default.createElement(\n            'div',\n            { className: 'data_table', style: { width: _this.testColumns.length * (350 + 10 + 1) } },\n            _react2.default.createElement(\n              'div',\n              { className: 'header' },\n              _this.testColumns.map(function (column, i) {\n                var newColStyle = {};\n                if (column.type === \"Text\") {\n                  newColStyle['width'] = 350;\n                  // newColStyle['height'] = '4em';\n                  hasText = true;\n                }\n                if (singleColumn || i == 0) {\n                  newColStyle['border-left'] = 'none';\n                };\n                if (i < 50) {\n                  return _react2.default.createElement(\n                    'span',\n                    { className: 'data_column', style: newColStyle },\n                    column.name\n                  );\n                }\n              })\n            ),\n            _this.testRows.map(function (row) {\n              var newRowStyle = {};\n              if (containsText) {\n                newRowStyle['height'] = '4em';\n              };\n              return _react2.default.createElement(\n                'div',\n                { className: 'data_row', style: newRowStyle },\n                _this.testColumns.map(function (column, i) {\n                  var newColStyle = {};\n                  if (column.type === \"Text\") {\n                    newColStyle['width'] = 350;\n                    newColStyle['height'] = '4em';\n                  }\n                  if (singleColumn || i == 0) {\n                    newColStyle['border-left'] = 'none';\n                  };\n                  if (i < 50) {\n                    return _react2.default.createElement(\n                      'span',\n                      { className: 'data_column', style: newColStyle },\n                      row[column.name]\n                    );\n                  }\n                })\n              );\n            })\n          )\n        )\n      );\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  return CollectionMessage;\n}(_react.Component);\n\nCollectionMessage.propTypes = proptypes.messageType;\n\nexports.default = CollectionMessage;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9Db2xsZWN0aW9uTWVzc2FnZS5qcz8wZDQ2Il0sIm5hbWVzIjpbInByb3B0eXBlcyIsIkNvbGxlY3Rpb25NZXNzYWdlIiwicmVuZGVyIiwiY29uc29sZSIsImxvZyIsInByb3BzIiwidGV4dCIsImRhdGEiLCJKU09OIiwicGFyc2UiLCJ0ZXN0Q29sdW1ucyIsInRlc3RSb3dzIiwiZ2V0Um93IiwiaSIsImNvbnRhaW5zVGV4dCIsInNpbmdsZUNvbHVtbiIsImxlbmd0aCIsImhhc1RleHQiLCJvcmlnaW4iLCJoaWRkZW4iLCJkaXNwbGF5Iiwid2lkdGgiLCJtYXAiLCJjb2x1bW4iLCJuZXdDb2xTdHlsZSIsInR5cGUiLCJuYW1lIiwibmV3Um93U3R5bGUiLCJyb3ciLCJwcm9wVHlwZXMiLCJtZXNzYWdlVHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztJQUFZQSxTOzs7Ozs7Ozs7Ozs7SUFFTkMsaUI7Ozs7Ozs7Ozs7Ozs7OzRNQUVKQyxNLEdBQVMsWUFBTTtBQUNiQyxjQUFRQyxHQUFSLENBQVksTUFBS0MsS0FBTCxDQUFXQyxJQUF2QjtBQUNBLFVBQU1DLE9BQU9DLEtBQUtDLEtBQUwsQ0FBVyxNQUFLSixLQUFMLENBQVdDLElBQXRCLENBQWI7QUFDQUgsY0FBUUMsR0FBUixDQUFZRyxJQUFaO0FBQ0EsWUFBS0csV0FBTCxHQUFtQkgsS0FBSyxhQUFMLENBQW5CO0FBQ0EsWUFBS0ksUUFBTCxHQUFnQkosS0FBSyxVQUFMLENBQWhCO0FBQ0EsWUFBS0ssTUFBTCxHQUFjLFVBQUNDLENBQUQ7QUFBQSxlQUFPLE1BQUtGLFFBQUwsQ0FBY0UsQ0FBZCxDQUFQO0FBQUEsT0FBZDtBQUNBLFVBQUlDLGVBQWUsS0FBbkI7QUFDQSxVQUFJQyxlQUFlLE1BQUtMLFdBQUwsQ0FBaUJNLE1BQWpCLEtBQTRCLENBQS9DO0FBQ0EsVUFBSUMsVUFBVSxLQUFkO0FBQ0EsYUFBUTtBQUFBO0FBQUEsVUFBSyxXQUFhLE1BQUtaLEtBQUwsQ0FBV2EsTUFBWCxLQUFzQixNQUF0QixHQUErQixjQUEvQixHQUFnRCxlQUFsRSxFQUFtRixPQUFPLE1BQUtiLEtBQUwsQ0FBV2MsTUFBWCxLQUFzQixJQUF0QixHQUE2QixFQUFDQyxTQUFTLE1BQVYsRUFBN0IsR0FBaUQsRUFBM0k7QUFDSjtBQUFBO0FBQUEsWUFBSyxXQUFVLGNBQWY7QUFDQTtBQUFBO0FBQUEsY0FBSyxXQUFVLFlBQWYsRUFBNEIsT0FBTyxFQUFDQyxPQUFPLE1BQUtYLFdBQUwsQ0FBaUJNLE1BQWpCLElBQTJCLE1BQUksRUFBSixHQUFPLENBQWxDLENBQVIsRUFBbkM7QUFDRTtBQUFBO0FBQUEsZ0JBQUssV0FBVSxRQUFmO0FBQ0Msb0JBQUtOLFdBQUwsQ0FBaUJZLEdBQWpCLENBQXFCLFVBQUNDLE1BQUQsRUFBUVYsQ0FBUixFQUFjO0FBQ2xDLG9CQUFJVyxjQUFjLEVBQWxCO0FBQ0Esb0JBQUdELE9BQU9FLElBQVAsS0FBZ0IsTUFBbkIsRUFBMEI7QUFDeEJELDhCQUFZLE9BQVosSUFBdUIsR0FBdkI7QUFDQTtBQUNBUCw0QkFBVSxJQUFWO0FBQ0Q7QUFDRCxvQkFBSUYsZ0JBQWdCRixLQUFLLENBQXpCLEVBQTJCO0FBQUVXLDhCQUFZLGFBQVosSUFBNkIsTUFBN0I7QUFBcUM7QUFDbEUsb0JBQUdYLElBQUksRUFBUCxFQUFVO0FBQ1IseUJBQU87QUFBQTtBQUFBLHNCQUFNLFdBQVUsYUFBaEIsRUFBOEIsT0FBT1csV0FBckM7QUFBbURELDJCQUFPRztBQUExRCxtQkFBUDtBQUNEO0FBQ0YsZUFYQTtBQURELGFBREY7QUFlRyxrQkFBS2YsUUFBTCxDQUFjVyxHQUFkLENBQWtCLGVBQU87QUFDeEIsa0JBQUlLLGNBQWMsRUFBbEI7QUFDQSxrQkFBSWIsWUFBSixFQUFpQjtBQUFFYSw0QkFBWSxRQUFaLElBQXdCLEtBQXhCO0FBQThCO0FBQ2pELHFCQUFRO0FBQUE7QUFBQSxrQkFBSyxXQUFVLFVBQWYsRUFBMEIsT0FBT0EsV0FBakM7QUFDTCxzQkFBS2pCLFdBQUwsQ0FBaUJZLEdBQWpCLENBQXFCLFVBQUNDLE1BQUQsRUFBU1YsQ0FBVCxFQUFlO0FBQ25DLHNCQUFJVyxjQUFjLEVBQWxCO0FBQ0Esc0JBQUdELE9BQU9FLElBQVAsS0FBZ0IsTUFBbkIsRUFBMEI7QUFDeEJELGdDQUFZLE9BQVosSUFBdUIsR0FBdkI7QUFDQUEsZ0NBQVksUUFBWixJQUF3QixLQUF4QjtBQUNEO0FBQ0Qsc0JBQUlULGdCQUFnQkYsS0FBSyxDQUF6QixFQUEyQjtBQUFFVyxnQ0FBWSxhQUFaLElBQTZCLE1BQTdCO0FBQXFDO0FBQ2xFLHNCQUFHWCxJQUFJLEVBQVAsRUFBVTtBQUNSLDJCQUFPO0FBQUE7QUFBQSx3QkFBTSxXQUFVLGFBQWhCLEVBQThCLE9BQU9XLFdBQXJDO0FBQW1ESSwwQkFBSUwsT0FBT0csSUFBWDtBQUFuRCxxQkFBUDtBQUNEO0FBQ0YsaUJBVkE7QUFESyxlQUFSO0FBYUQsYUFoQkE7QUFmSDtBQURBO0FBREksT0FBUjtBQXFDRCxLOzs7Ozs7QUFJSHpCLGtCQUFrQjRCLFNBQWxCLEdBQThCN0IsVUFBVThCLFdBQXhDOztrQkFFZTdCLGlCIiwiZmlsZSI6IjQ5Mi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdERhdGFHcmlkIGZyb20gJ3JlYWN0LWRhdGEtZ3JpZCc7XG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIHByb3B0eXBlcyBmcm9tICcuLi9wcm9wdHlwZXMvdHlwZXMnO1xuXG5jbGFzcyBDb2xsZWN0aW9uTWVzc2FnZSBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgcmVuZGVyID0gKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKHRoaXMucHJvcHMudGV4dCk7XG4gICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UodGhpcy5wcm9wcy50ZXh0KTtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICB0aGlzLnRlc3RDb2x1bW5zID0gZGF0YVtcImNvbHVtbl9kYXRhXCJdO1xuICAgIHRoaXMudGVzdFJvd3MgPSBkYXRhW1wicm93X2RhdGFcIl07XG4gICAgdGhpcy5nZXRSb3cgPSAoaSkgPT4gdGhpcy50ZXN0Um93c1tpXTtcbiAgICBsZXQgY29udGFpbnNUZXh0ID0gZmFsc2U7XG4gICAgbGV0IHNpbmdsZUNvbHVtbiA9IHRoaXMudGVzdENvbHVtbnMubGVuZ3RoID09PSAxO1xuICAgIGxldCBoYXNUZXh0ID0gZmFsc2U7XG4gICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZSA9IHt0aGlzLnByb3BzLm9yaWdpbiA9PT0gJ2lyaXMnID8gJ21lc3NhZ2UgbGVmdCcgOiAnbWVzc2FnZSByaWdodCd9IHN0eWxlPXt0aGlzLnByb3BzLmhpZGRlbiA9PT0gdHJ1ZSA/IHtkaXNwbGF5OiAnbm9uZSd9IDoge319PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1YmJsZSB0YWJsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRhdGFfdGFibGVcIiBzdHlsZT17e3dpZHRoOiB0aGlzLnRlc3RDb2x1bW5zLmxlbmd0aCAqICgzNTArMTArMSl9fT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclwiPlxuICAgICAgICAgIHt0aGlzLnRlc3RDb2x1bW5zLm1hcCgoY29sdW1uLGkpID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdDb2xTdHlsZSA9IHt9O1xuICAgICAgICAgICAgaWYoY29sdW1uLnR5cGUgPT09IFwiVGV4dFwiKXtcbiAgICAgICAgICAgICAgbmV3Q29sU3R5bGVbJ3dpZHRoJ10gPSAzNTA7XG4gICAgICAgICAgICAgIC8vIG5ld0NvbFN0eWxlWydoZWlnaHQnXSA9ICc0ZW0nO1xuICAgICAgICAgICAgICBoYXNUZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzaW5nbGVDb2x1bW4gfHwgaSA9PSAwKXsgbmV3Q29sU3R5bGVbJ2JvcmRlci1sZWZ0J10gPSAnbm9uZScgfTtcbiAgICAgICAgICAgIGlmKGkgPCA1MCl7XG4gICAgICAgICAgICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9XCJkYXRhX2NvbHVtblwiIHN0eWxlPXtuZXdDb2xTdHlsZX0+e2NvbHVtbi5uYW1lfTwvc3Bhbj47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge3RoaXMudGVzdFJvd3MubWFwKHJvdyA9PiB7XG4gICAgICAgICAgICBsZXQgbmV3Um93U3R5bGUgPSB7fTtcbiAgICAgICAgICAgIGlmIChjb250YWluc1RleHQpeyBuZXdSb3dTdHlsZVsnaGVpZ2h0J10gPSAnNGVtJ307XG4gICAgICAgICAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwiZGF0YV9yb3dcIiBzdHlsZT17bmV3Um93U3R5bGV9PlxuICAgICAgICAgICAgICB7dGhpcy50ZXN0Q29sdW1ucy5tYXAoKGNvbHVtbiwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBuZXdDb2xTdHlsZSA9IHt9O1xuICAgICAgICAgICAgICAgIGlmKGNvbHVtbi50eXBlID09PSBcIlRleHRcIil7XG4gICAgICAgICAgICAgICAgICBuZXdDb2xTdHlsZVsnd2lkdGgnXSA9IDM1MDtcbiAgICAgICAgICAgICAgICAgIG5ld0NvbFN0eWxlWydoZWlnaHQnXSA9ICc0ZW0nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2luZ2xlQ29sdW1uIHx8IGkgPT0gMCl7IG5ld0NvbFN0eWxlWydib3JkZXItbGVmdCddID0gJ25vbmUnIH07XG4gICAgICAgICAgICAgICAgaWYoaSA8IDUwKXtcbiAgICAgICAgICAgICAgICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9XCJkYXRhX2NvbHVtblwiIHN0eWxlPXtuZXdDb2xTdHlsZX0+e3Jvd1tjb2x1bW4ubmFtZV19PC9zcGFuPjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9kaXY+KVxuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+KTtcbiAgfVxuXG59XG5cbkNvbGxlY3Rpb25NZXNzYWdlLnByb3BUeXBlcyA9IHByb3B0eXBlcy5tZXNzYWdlVHlwZTtcblxuZXhwb3J0IGRlZmF1bHQgQ29sbGVjdGlvbk1lc3NhZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvY29tcG9uZW50cy9Db2xsZWN0aW9uTWVzc2FnZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ })

})