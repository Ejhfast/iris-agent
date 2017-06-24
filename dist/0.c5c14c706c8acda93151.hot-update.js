webpackHotUpdate(0,{

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(2);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(56);\n\nvar _lodash = __webpack_require__(155);\n\nvar _ = _interopRequireWildcard(_lodash);\n\nvar _FunctionSearch = __webpack_require__(1256);\n\nvar _FunctionSearch2 = _interopRequireDefault(_FunctionSearch);\n\nvar _FunctionInfo = __webpack_require__(1302);\n\nvar _FunctionInfo2 = _interopRequireDefault(_FunctionInfo);\n\nvar _reactSplitPane = __webpack_require__(1296);\n\nvar _reactSplitPane2 = _interopRequireDefault(_reactSplitPane);\n\nvar _index = __webpack_require__(167);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar minimize = function minimize(dispatch, minimizeState) {\n  console.log(\"clicked\");\n  dispatch((0, _index.toggleDocs)(minimizeState));\n};\n\nvar _handleSplitPaneOnDragFinished = function _handleSplitPaneOnDragFinished(splitPane) {\n  console.log(splitPane);\n  var draggedSize = splitPane.state.draggedSize;\n  // ↓ this is what does the trick\n  splitPane.setState({\n    resized: false,\n    defaultSize: draggedSize,\n    draggedSize: undefined\n  });\n};\n\nvar RightPane = function RightPane(_ref) {\n  var dispatch = _ref.dispatch,\n      variables = _ref.variables,\n      doc = _ref.doc,\n      minimizeState = _ref.minimizeState;\n\n  var sizeP = void 0;\n  if (minimizeState.docs === true) {\n    sizeP = \"100%\";\n  } else {\n    sizeP = \"50%\";\n  }\n  var splitPane = void 0;\n  var uf = function uf() {\n    return _handleSplitPaneOnDragFinished(splitPane);\n  };\n  splitPane = _react2.default.createElement(\n    _reactSplitPane2.default,\n    { className: 'secondSplit', split: 'horizontal', defaultSize: sizeP, onDragFinished: uf },\n    _react2.default.createElement(_FunctionSearch2.default, null),\n    _react2.default.createElement(_FunctionInfo2.default, null)\n  );\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(\n      _reactSplitPane2.default,\n      { split: 'horizontal', defaultSize: '30%' },\n      _react2.default.createElement(\n        'div',\n        { className: 'variableTable' },\n        _react2.default.createElement(\n          'div',\n          { className: 'title' },\n          'Current Variables'\n        ),\n        _react2.default.createElement(\n          'ul',\n          null,\n          _.map(_.sortBy(variables, function (v) {\n            return v.order;\n          }), function (x) {\n            return _react2.default.createElement(\n              'li',\n              null,\n              _react2.default.createElement(\n                'span',\n                { className: 'three_quarter name' },\n                x.name\n              ),\n              _react2.default.createElement(\n                'span',\n                { className: 'quarter' },\n                x.value\n              )\n            );\n          })\n        )\n      ),\n      splitPane\n    ),\n    _react2.default.createElement(\n      'button',\n      { className: 'minButton', onClick: function onClick() {\n          return minimize(dispatch, minimizeState);\n        } },\n      'Minimize'\n    )\n  );\n};\n\nRightPane.propTypes = {\n  variables: _react.PropTypes.arrayOf(_react.PropTypes.any),\n  doc: _react.PropTypes.any,\n  minimizeState: _react.PropTypes.any\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    variables: state.variables,\n    doc: state.docs,\n    minimizeState: state.minimizeState\n  };\n};\n\nRightPane = (0, _reactRedux.connect)(mapStateToProps)(RightPane);\n\nexports.default = RightPane;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9SaWdodFBhbmUuanM/NmE1YiJdLCJuYW1lcyI6WyJfIiwibWluaW1pemUiLCJkaXNwYXRjaCIsIm1pbmltaXplU3RhdGUiLCJjb25zb2xlIiwibG9nIiwiX2hhbmRsZVNwbGl0UGFuZU9uRHJhZ0ZpbmlzaGVkIiwic3BsaXRQYW5lIiwiZHJhZ2dlZFNpemUiLCJzdGF0ZSIsInNldFN0YXRlIiwicmVzaXplZCIsImRlZmF1bHRTaXplIiwidW5kZWZpbmVkIiwiUmlnaHRQYW5lIiwidmFyaWFibGVzIiwiZG9jIiwic2l6ZVAiLCJkb2NzIiwidWYiLCJtYXAiLCJzb3J0QnkiLCJ2Iiwib3JkZXIiLCJ4IiwibmFtZSIsInZhbHVlIiwicHJvcFR5cGVzIiwiYXJyYXlPZiIsImFueSIsIm1hcFN0YXRlVG9Qcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7SUFBWUEsQzs7QUFDWjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUMsV0FBVyxTQUFYQSxRQUFXLENBQUNDLFFBQUQsRUFBV0MsYUFBWCxFQUE2QjtBQUM1Q0MsVUFBUUMsR0FBUixDQUFZLFNBQVo7QUFDQUgsV0FBUyx1QkFBV0MsYUFBWCxDQUFUO0FBQ0QsQ0FIRDs7QUFLQSxJQUFNRyxpQ0FBaUMsU0FBakNBLDhCQUFpQyxDQUFDQyxTQUFELEVBQWU7QUFDcERILFVBQVFDLEdBQVIsQ0FBWUUsU0FBWjtBQUNFLE1BQU1DLGNBQWNELFVBQVVFLEtBQVYsQ0FBZ0JELFdBQXBDO0FBQ0E7QUFDQUQsWUFBVUcsUUFBVixDQUFtQjtBQUNqQkMsYUFBUyxLQURRO0FBRWpCQyxpQkFBWUosV0FGSztBQUdqQkEsaUJBQWFLO0FBSEksR0FBbkI7QUFLRCxDQVRIOztBQVlBLElBQUlDLFlBQVkseUJBQWlEO0FBQUEsTUFBOUNaLFFBQThDLFFBQTlDQSxRQUE4QztBQUFBLE1BQXBDYSxTQUFvQyxRQUFwQ0EsU0FBb0M7QUFBQSxNQUF6QkMsR0FBeUIsUUFBekJBLEdBQXlCO0FBQUEsTUFBcEJiLGFBQW9CLFFBQXBCQSxhQUFvQjs7QUFDL0QsTUFBSWMsY0FBSjtBQUNBLE1BQUlkLGNBQWNlLElBQWQsS0FBdUIsSUFBM0IsRUFBZ0M7QUFDOUJELFlBQVEsTUFBUjtBQUNELEdBRkQsTUFHSTtBQUNGQSxZQUFRLEtBQVI7QUFDRDtBQUNELE1BQUlWLGtCQUFKO0FBQ0EsTUFBTVksS0FBSyxTQUFMQSxFQUFLO0FBQUEsV0FBTWIsK0JBQStCQyxTQUEvQixDQUFOO0FBQUEsR0FBWDtBQUNBQSxjQUFhO0FBQUE7QUFBQSxNQUFXLFdBQVUsYUFBckIsRUFBbUMsT0FBTSxZQUF6QyxFQUFzRCxhQUFhVSxLQUFuRSxFQUEwRSxnQkFBaUJFLEVBQTNGO0FBQ1gsaUVBRFc7QUFFWDtBQUZXLEdBQWI7QUFJQSxTQUFRO0FBQUE7QUFBQTtBQUNSO0FBQUE7QUFBQSxRQUFXLE9BQU0sWUFBakIsRUFBOEIsYUFBWSxLQUExQztBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsZUFBZjtBQUNJO0FBQUE7QUFBQSxZQUFLLFdBQVUsT0FBZjtBQUFBO0FBQUEsU0FESjtBQUVJO0FBQUE7QUFBQTtBQUNJbkIsWUFBRW9CLEdBQUYsQ0FBTXBCLEVBQUVxQixNQUFGLENBQVNOLFNBQVQsRUFBb0IsVUFBQ08sQ0FBRCxFQUFPO0FBQy9CLG1CQUFPQSxFQUFFQyxLQUFUO0FBQ0gsV0FGTyxDQUFOLEVBR0EsVUFBQ0MsQ0FBRCxFQUFPO0FBQ0gsbUJBQU87QUFBQTtBQUFBO0FBQUk7QUFBQTtBQUFBLGtCQUFNLFdBQVUsb0JBQWhCO0FBQXVDQSxrQkFBRUM7QUFBekMsZUFBSjtBQUEwRDtBQUFBO0FBQUEsa0JBQU0sV0FBVSxTQUFoQjtBQUE0QkQsa0JBQUVFO0FBQTlCO0FBQTFELGFBQVA7QUFDSCxXQUxEO0FBREo7QUFGSixPQURGO0FBWUduQjtBQVpILEtBRFE7QUFlUjtBQUFBO0FBQUEsUUFBUSxXQUFVLFdBQWxCLEVBQThCLFNBQVM7QUFBQSxpQkFBTU4sU0FBU0MsUUFBVCxFQUFtQkMsYUFBbkIsQ0FBTjtBQUFBLFNBQXZDO0FBQUE7QUFBQTtBQWZRLEdBQVI7QUFpQkQsQ0EvQkQ7O0FBa0NBVyxVQUFVYSxTQUFWLEdBQXNCO0FBQ2xCWixhQUFXLGlCQUFVYSxPQUFWLENBQWtCLGlCQUFVQyxHQUE1QixDQURPO0FBRWxCYixPQUFLLGlCQUFVYSxHQUZHO0FBR2xCMUIsaUJBQWUsaUJBQVUwQjtBQUhQLENBQXRCOztBQU1BLElBQU1DLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ3JCLEtBQUQ7QUFBQSxTQUFZO0FBQ2hDTSxlQUFXTixNQUFNTSxTQURlO0FBRWhDQyxTQUFLUCxNQUFNUyxJQUZxQjtBQUdoQ2YsbUJBQWVNLE1BQU1OO0FBSFcsR0FBWjtBQUFBLENBQXhCOztBQU1BVyxZQUFZLHlCQUFRZ0IsZUFBUixFQUF5QmhCLFNBQXpCLENBQVo7O2tCQUVlQSxTIiwiZmlsZSI6IjQyNi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IEZ1bmN0aW9uU2VhcmNoIGZyb20gJy4vRnVuY3Rpb25TZWFyY2gnO1xuaW1wb3J0IEZ1bmN0aW9uSW5mbyBmcm9tICcuL0Z1bmN0aW9uSW5mbyc7XG5pbXBvcnQgU3BsaXRQYW5lIGZyb20gJ3JlYWN0LXNwbGl0LXBhbmUnO1xuaW1wb3J0IHsgdG9nZ2xlRG9jcyB9IGZyb20gJy4uL2FjdGlvbnMvaW5kZXguanMnO1xuXG5jb25zdCBtaW5pbWl6ZSA9IChkaXNwYXRjaCwgbWluaW1pemVTdGF0ZSkgPT4ge1xuICBjb25zb2xlLmxvZyhcImNsaWNrZWRcIik7XG4gIGRpc3BhdGNoKHRvZ2dsZURvY3MobWluaW1pemVTdGF0ZSkpO1xufVxuXG5jb25zdCBfaGFuZGxlU3BsaXRQYW5lT25EcmFnRmluaXNoZWQgPSAoc3BsaXRQYW5lKSA9PiB7XG4gIGNvbnNvbGUubG9nKHNwbGl0UGFuZSk7XG4gICAgY29uc3QgZHJhZ2dlZFNpemUgPSBzcGxpdFBhbmUuc3RhdGUuZHJhZ2dlZFNpemU7XG4gICAgLy8g4oaTIHRoaXMgaXMgd2hhdCBkb2VzIHRoZSB0cmlja1xuICAgIHNwbGl0UGFuZS5zZXRTdGF0ZSh7XG4gICAgICByZXNpemVkOiBmYWxzZSxcbiAgICAgIGRlZmF1bHRTaXplOmRyYWdnZWRTaXplLFxuICAgICAgZHJhZ2dlZFNpemU6IHVuZGVmaW5lZCxcbiAgICB9KTtcbiAgfTtcblxuXG5sZXQgUmlnaHRQYW5lID0gKHsgZGlzcGF0Y2gsIHZhcmlhYmxlcywgZG9jLCBtaW5pbWl6ZVN0YXRlIH0pID0+IHtcbiAgbGV0IHNpemVQO1xuICBpZiAobWluaW1pemVTdGF0ZS5kb2NzID09PSB0cnVlKXtcbiAgICBzaXplUCA9IFwiMTAwJVwiO1xuICB9XG4gIGVsc2V7XG4gICAgc2l6ZVAgPSBcIjUwJVwiO1xuICB9XG4gIGxldCBzcGxpdFBhbmU7XG4gIGNvbnN0IHVmID0gKCkgPT4gX2hhbmRsZVNwbGl0UGFuZU9uRHJhZ0ZpbmlzaGVkKHNwbGl0UGFuZSk7XG4gIHNwbGl0UGFuZSA9ICg8U3BsaXRQYW5lIGNsYXNzTmFtZT1cInNlY29uZFNwbGl0XCIgc3BsaXQ9XCJob3Jpem9udGFsXCIgZGVmYXVsdFNpemU9e3NpemVQfSBvbkRyYWdGaW5pc2hlZD17IHVmIH0+XG4gICAgPEZ1bmN0aW9uU2VhcmNoIC8+XG4gICAgPEZ1bmN0aW9uSW5mbyAvPlxuICA8L1NwbGl0UGFuZT4pXG4gIHJldHVybiAoPGRpdj5cbiAgPFNwbGl0UGFuZSBzcGxpdD1cImhvcml6b250YWxcIiBkZWZhdWx0U2l6ZT1cIjMwJVwiPlxuICAgIDxkaXYgY2xhc3NOYW1lPVwidmFyaWFibGVUYWJsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+Q3VycmVudCBWYXJpYWJsZXM8L2Rpdj5cbiAgICAgICAgPHVsPlxuICAgICAgICAgIHsgXy5tYXAoXy5zb3J0QnkodmFyaWFibGVzLCAodikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdi5vcmRlcjtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICAgICh4KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxsaT48c3BhbiBjbGFzc05hbWU9XCJ0aHJlZV9xdWFydGVyIG5hbWVcIj57IHgubmFtZSB9PC9zcGFuPjxzcGFuIGNsYXNzTmFtZT1cInF1YXJ0ZXJcIj57IHgudmFsdWUgfTwvc3Bhbj48L2xpPjtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICAgIHtzcGxpdFBhbmV9XG4gIDwvU3BsaXRQYW5lPlxuICA8YnV0dG9uIGNsYXNzTmFtZT1cIm1pbkJ1dHRvblwiIG9uQ2xpY2s9eygpID0+IG1pbmltaXplKGRpc3BhdGNoLCBtaW5pbWl6ZVN0YXRlKX0+TWluaW1pemU8L2J1dHRvbj5cbiAgPC9kaXY+KTtcbn07XG5cblxuUmlnaHRQYW5lLnByb3BUeXBlcyA9IHtcbiAgICB2YXJpYWJsZXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICAgIGRvYzogUHJvcFR5cGVzLmFueSxcbiAgICBtaW5pbWl6ZVN0YXRlOiBQcm9wVHlwZXMuYW55XG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+ICh7XG4gICAgdmFyaWFibGVzOiBzdGF0ZS52YXJpYWJsZXMsXG4gICAgZG9jOiBzdGF0ZS5kb2NzLFxuICAgIG1pbmltaXplU3RhdGU6IHN0YXRlLm1pbmltaXplU3RhdGVcbn0pO1xuXG5SaWdodFBhbmUgPSBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcykoUmlnaHRQYW5lKTtcblxuZXhwb3J0IGRlZmF1bHQgUmlnaHRQYW5lO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2NvbXBvbmVudHMvUmlnaHRQYW5lLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ })

})