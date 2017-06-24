webpackHotUpdate(0,{

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(2);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(56);\n\nvar _lodash = __webpack_require__(155);\n\nvar _ = _interopRequireWildcard(_lodash);\n\nvar _FunctionSearch = __webpack_require__(1256);\n\nvar _FunctionSearch2 = _interopRequireDefault(_FunctionSearch);\n\nvar _FunctionInfo = __webpack_require__(1302);\n\nvar _FunctionInfo2 = _interopRequireDefault(_FunctionInfo);\n\nvar _reactSplitPane = __webpack_require__(1296);\n\nvar _reactSplitPane2 = _interopRequireDefault(_reactSplitPane);\n\nvar _index = __webpack_require__(167);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar minimize = function minimize(dispatch, minimizeState) {\n  console.log(\"clicked\");\n  dispatch((0, _index.toggleDocs)(minimizeState));\n};\n\nvar _handleSplitPaneOnDragFinished = function _handleSplitPaneOnDragFinished() {\n  var splitPane = undefined.refs['splitPane'];\n  var draggedSize = splitPane.state.draggedSize;\n  // ↓ this is what does the trick\n  splitPane.setState({\n    resized: false,\n    defaultSize: draggedSize,\n    draggedSize: undefined\n  });\n};\n\nvar RightPane = function RightPane(_ref) {\n  var dispatch = _ref.dispatch,\n      variables = _ref.variables,\n      doc = _ref.doc,\n      minimizeState = _ref.minimizeState;\n\n  var sizeP = void 0;\n  if (minimizeState.docs === true) {\n    sizeP = \"100%\";\n  } else {\n    sizeP = \"50%\";\n  }\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(\n      _reactSplitPane2.default,\n      { split: 'horizontal', defaultSize: '30%' },\n      _react2.default.createElement(\n        'div',\n        { className: 'variableTable' },\n        _react2.default.createElement(\n          'div',\n          { className: 'title' },\n          'Current Variables'\n        ),\n        _react2.default.createElement(\n          'ul',\n          null,\n          _.map(_.sortBy(variables, function (v) {\n            return v.order;\n          }), function (x) {\n            return _react2.default.createElement(\n              'li',\n              null,\n              _react2.default.createElement(\n                'span',\n                { className: 'three_quarter name' },\n                x.name\n              ),\n              _react2.default.createElement(\n                'span',\n                { className: 'quarter' },\n                x.value\n              )\n            );\n          })\n        )\n      ),\n      splitPane\n    ),\n    _react2.default.createElement(\n      'button',\n      { className: 'minButton', onClick: function onClick() {\n          return minimize(dispatch, minimizeState);\n        } },\n      'Minimize'\n    )\n  );\n};\n\nRightPane.propTypes = {\n  variables: _react.PropTypes.arrayOf(_react.PropTypes.any),\n  doc: _react.PropTypes.any,\n  minimizeState: _react.PropTypes.any\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    variables: state.variables,\n    doc: state.docs,\n    minimizeState: state.minimizeState\n  };\n};\n\nRightPane = (0, _reactRedux.connect)(mapStateToProps)(RightPane);\n\nexports.default = RightPane;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9SaWdodFBhbmUuanM/NmE1YiJdLCJuYW1lcyI6WyJfIiwibWluaW1pemUiLCJkaXNwYXRjaCIsIm1pbmltaXplU3RhdGUiLCJjb25zb2xlIiwibG9nIiwiX2hhbmRsZVNwbGl0UGFuZU9uRHJhZ0ZpbmlzaGVkIiwic3BsaXRQYW5lIiwicmVmcyIsImRyYWdnZWRTaXplIiwic3RhdGUiLCJzZXRTdGF0ZSIsInJlc2l6ZWQiLCJkZWZhdWx0U2l6ZSIsInVuZGVmaW5lZCIsIlJpZ2h0UGFuZSIsInZhcmlhYmxlcyIsImRvYyIsInNpemVQIiwiZG9jcyIsIm1hcCIsInNvcnRCeSIsInYiLCJvcmRlciIsIngiLCJuYW1lIiwidmFsdWUiLCJwcm9wVHlwZXMiLCJhcnJheU9mIiwiYW55IiwibWFwU3RhdGVUb1Byb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztJQUFZQSxDOztBQUNaOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQyxXQUFXLFNBQVhBLFFBQVcsQ0FBQ0MsUUFBRCxFQUFXQyxhQUFYLEVBQTZCO0FBQzVDQyxVQUFRQyxHQUFSLENBQVksU0FBWjtBQUNBSCxXQUFTLHVCQUFXQyxhQUFYLENBQVQ7QUFDRCxDQUhEOztBQUtBLElBQU1HLGlDQUFpQyxTQUFqQ0EsOEJBQWlDLEdBQU07QUFDekMsTUFBTUMsWUFBWSxVQUFLQyxJQUFMLENBQVUsV0FBVixDQUFsQjtBQUNBLE1BQU1DLGNBQWNGLFVBQVVHLEtBQVYsQ0FBZ0JELFdBQXBDO0FBQ0E7QUFDQUYsWUFBVUksUUFBVixDQUFtQjtBQUNqQkMsYUFBUyxLQURRO0FBRWpCQyxpQkFBWUosV0FGSztBQUdqQkEsaUJBQWFLO0FBSEksR0FBbkI7QUFLRCxDQVRIOztBQVlBLElBQUlDLFlBQVkseUJBQWlEO0FBQUEsTUFBOUNiLFFBQThDLFFBQTlDQSxRQUE4QztBQUFBLE1BQXBDYyxTQUFvQyxRQUFwQ0EsU0FBb0M7QUFBQSxNQUF6QkMsR0FBeUIsUUFBekJBLEdBQXlCO0FBQUEsTUFBcEJkLGFBQW9CLFFBQXBCQSxhQUFvQjs7QUFDL0QsTUFBSWUsY0FBSjtBQUNBLE1BQUlmLGNBQWNnQixJQUFkLEtBQXVCLElBQTNCLEVBQWdDO0FBQzlCRCxZQUFRLE1BQVI7QUFDRCxHQUZELE1BR0k7QUFDRkEsWUFBUSxLQUFSO0FBQ0Q7QUFDRCxTQUFRO0FBQUE7QUFBQTtBQUNSO0FBQUE7QUFBQSxRQUFXLE9BQU0sWUFBakIsRUFBOEIsYUFBWSxLQUExQztBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsZUFBZjtBQUNJO0FBQUE7QUFBQSxZQUFLLFdBQVUsT0FBZjtBQUFBO0FBQUEsU0FESjtBQUVJO0FBQUE7QUFBQTtBQUNJbEIsWUFBRW9CLEdBQUYsQ0FBTXBCLEVBQUVxQixNQUFGLENBQVNMLFNBQVQsRUFBb0IsVUFBQ00sQ0FBRCxFQUFPO0FBQy9CLG1CQUFPQSxFQUFFQyxLQUFUO0FBQ0gsV0FGTyxDQUFOLEVBR0EsVUFBQ0MsQ0FBRCxFQUFPO0FBQ0gsbUJBQU87QUFBQTtBQUFBO0FBQUk7QUFBQTtBQUFBLGtCQUFNLFdBQVUsb0JBQWhCO0FBQXVDQSxrQkFBRUM7QUFBekMsZUFBSjtBQUEwRDtBQUFBO0FBQUEsa0JBQU0sV0FBVSxTQUFoQjtBQUE0QkQsa0JBQUVFO0FBQTlCO0FBQTFELGFBQVA7QUFDSCxXQUxEO0FBREo7QUFGSixPQURGO0FBWUduQjtBQVpILEtBRFE7QUFlUjtBQUFBO0FBQUEsUUFBUSxXQUFVLFdBQWxCLEVBQThCLFNBQVM7QUFBQSxpQkFBTU4sU0FBU0MsUUFBVCxFQUFtQkMsYUFBbkIsQ0FBTjtBQUFBLFNBQXZDO0FBQUE7QUFBQTtBQWZRLEdBQVI7QUFpQkQsQ0F6QkQ7O0FBNEJBWSxVQUFVWSxTQUFWLEdBQXNCO0FBQ2xCWCxhQUFXLGlCQUFVWSxPQUFWLENBQWtCLGlCQUFVQyxHQUE1QixDQURPO0FBRWxCWixPQUFLLGlCQUFVWSxHQUZHO0FBR2xCMUIsaUJBQWUsaUJBQVUwQjtBQUhQLENBQXRCOztBQU1BLElBQU1DLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ3BCLEtBQUQ7QUFBQSxTQUFZO0FBQ2hDTSxlQUFXTixNQUFNTSxTQURlO0FBRWhDQyxTQUFLUCxNQUFNUyxJQUZxQjtBQUdoQ2hCLG1CQUFlTyxNQUFNUDtBQUhXLEdBQVo7QUFBQSxDQUF4Qjs7QUFNQVksWUFBWSx5QkFBUWUsZUFBUixFQUF5QmYsU0FBekIsQ0FBWjs7a0JBRWVBLFMiLCJmaWxlIjoiNDI2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgRnVuY3Rpb25TZWFyY2ggZnJvbSAnLi9GdW5jdGlvblNlYXJjaCc7XG5pbXBvcnQgRnVuY3Rpb25JbmZvIGZyb20gJy4vRnVuY3Rpb25JbmZvJztcbmltcG9ydCBTcGxpdFBhbmUgZnJvbSAncmVhY3Qtc3BsaXQtcGFuZSc7XG5pbXBvcnQgeyB0b2dnbGVEb2NzIH0gZnJvbSAnLi4vYWN0aW9ucy9pbmRleC5qcyc7XG5cbmNvbnN0IG1pbmltaXplID0gKGRpc3BhdGNoLCBtaW5pbWl6ZVN0YXRlKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiY2xpY2tlZFwiKTtcbiAgZGlzcGF0Y2godG9nZ2xlRG9jcyhtaW5pbWl6ZVN0YXRlKSk7XG59XG5cbmNvbnN0IF9oYW5kbGVTcGxpdFBhbmVPbkRyYWdGaW5pc2hlZCA9ICgpID0+IHtcbiAgICBjb25zdCBzcGxpdFBhbmUgPSB0aGlzLnJlZnNbJ3NwbGl0UGFuZSddO1xuICAgIGNvbnN0IGRyYWdnZWRTaXplID0gc3BsaXRQYW5lLnN0YXRlLmRyYWdnZWRTaXplO1xuICAgIC8vIOKGkyB0aGlzIGlzIHdoYXQgZG9lcyB0aGUgdHJpY2tcbiAgICBzcGxpdFBhbmUuc2V0U3RhdGUoe1xuICAgICAgcmVzaXplZDogZmFsc2UsXG4gICAgICBkZWZhdWx0U2l6ZTpkcmFnZ2VkU2l6ZSxcbiAgICAgIGRyYWdnZWRTaXplOiB1bmRlZmluZWQsXG4gICAgfSk7XG4gIH07XG5cblxubGV0IFJpZ2h0UGFuZSA9ICh7IGRpc3BhdGNoLCB2YXJpYWJsZXMsIGRvYywgbWluaW1pemVTdGF0ZSB9KSA9PiB7XG4gIGxldCBzaXplUDtcbiAgaWYgKG1pbmltaXplU3RhdGUuZG9jcyA9PT0gdHJ1ZSl7XG4gICAgc2l6ZVAgPSBcIjEwMCVcIjtcbiAgfVxuICBlbHNle1xuICAgIHNpemVQID0gXCI1MCVcIjtcbiAgfVxuICByZXR1cm4gKDxkaXY+XG4gIDxTcGxpdFBhbmUgc3BsaXQ9XCJob3Jpem9udGFsXCIgZGVmYXVsdFNpemU9XCIzMCVcIj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cInZhcmlhYmxlVGFibGVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPkN1cnJlbnQgVmFyaWFibGVzPC9kaXY+XG4gICAgICAgIDx1bD5cbiAgICAgICAgICB7IF8ubWFwKF8uc29ydEJ5KHZhcmlhYmxlcywgKHYpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHYub3JkZXI7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgICAoeCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiA8bGk+PHNwYW4gY2xhc3NOYW1lPVwidGhyZWVfcXVhcnRlciBuYW1lXCI+eyB4Lm5hbWUgfTwvc3Bhbj48c3BhbiBjbGFzc05hbWU9XCJxdWFydGVyXCI+eyB4LnZhbHVlIH08L3NwYW4+PC9saT47XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgICB7c3BsaXRQYW5lfVxuICA8L1NwbGl0UGFuZT5cbiAgPGJ1dHRvbiBjbGFzc05hbWU9XCJtaW5CdXR0b25cIiBvbkNsaWNrPXsoKSA9PiBtaW5pbWl6ZShkaXNwYXRjaCwgbWluaW1pemVTdGF0ZSl9Pk1pbmltaXplPC9idXR0b24+XG4gIDwvZGl2Pik7XG59O1xuXG5cblJpZ2h0UGFuZS5wcm9wVHlwZXMgPSB7XG4gICAgdmFyaWFibGVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgICBkb2M6IFByb3BUeXBlcy5hbnksXG4gICAgbWluaW1pemVTdGF0ZTogUHJvcFR5cGVzLmFueVxufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiAoe1xuICAgIHZhcmlhYmxlczogc3RhdGUudmFyaWFibGVzLFxuICAgIGRvYzogc3RhdGUuZG9jcyxcbiAgICBtaW5pbWl6ZVN0YXRlOiBzdGF0ZS5taW5pbWl6ZVN0YXRlXG59KTtcblxuUmlnaHRQYW5lID0gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMpKFJpZ2h0UGFuZSk7XG5cbmV4cG9ydCBkZWZhdWx0IFJpZ2h0UGFuZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9jb21wb25lbnRzL1JpZ2h0UGFuZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ })

})