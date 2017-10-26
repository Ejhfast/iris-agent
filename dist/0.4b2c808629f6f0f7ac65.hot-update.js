webpackHotUpdate(0,{

/***/ 498:
/***/ (function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(2);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(30);\n\nvar _reactSyntaxHighlighter = __webpack_require__(443);\n\nvar _reactSyntaxHighlighter2 = _interopRequireDefault(_reactSyntaxHighlighter);\n\nvar _python = __webpack_require__(61);\n\nvar _index = __webpack_require__(43);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n// function to load a command into the command edit pane, and open pane\n// the button for this is in the docs pane, but maybe logic should be moved to CommandEdit?\nvar editCommand = function editCommand(dispatch, id) {\n  (0, _python.updateCommandAPI)(text);\n  dispatch((0, _index.setCodeEdit)({ code_edit: false }));\n};\n\n// this component defines what is displayed in the docs window\n\nvar FunctionInfo = function (_Component) {\n  _inherits(FunctionInfo, _Component);\n\n  function FunctionInfo() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, FunctionInfo);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FunctionInfo.__proto__ || Object.getPrototypeOf(FunctionInfo)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {\n      if (_this.props.doc.title === \"\") {\n        return _react2.default.createElement(\n          'div',\n          { className: 'func_info' },\n          _react2.default.createElement(\n            'div',\n            { className: 'func_title' },\n            'Search for a command to see documentation'\n          )\n        );\n      } else {\n        return _react2.default.createElement(\n          'div',\n          { className: 'func_info' },\n          _react2.default.createElement(\n            'div',\n            { className: 'func_title' },\n            _this.props.doc.title\n          ),\n          _react2.default.createElement(\n            'div',\n            { className: 'func_description' },\n            _this.props.doc.description.join(\" \")\n          ),\n          _react2.default.createElement(\n            'div',\n            { className: 'examples' },\n            _react2.default.createElement(\n              'div',\n              { className: 'head' },\n              'Examples:'\n            ),\n            _this.props.doc.examples.map(function (ex) {\n              return _react2.default.createElement(\n                'div',\n                { className: 'example' },\n                ex\n              );\n            })\n          ),\n          _react2.default.createElement(\n            'div',\n            { className: 'func_code' },\n            _react2.default.createElement(\n              'div',\n              { className: 'head' },\n              'Code:'\n            ),\n            _react2.default.createElement(\n              'pre',\n              null,\n              _react2.default.createElement(\n                _reactSyntaxHighlighter2.default,\n                { language: 'python' },\n                _this.props.doc.source\n              )\n            )\n          ),\n          _react2.default.createElement(\n            'button',\n            { onClick: function onClick() {\n                return editCommand(_this.props.dispatch, _this.props.doc.id);\n              } },\n            'Edit Command'\n          )\n        );\n      }\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  return FunctionInfo;\n}(_react.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    doc: state.docs,\n    minimizeState: state.minimizeState\n  };\n};\n\nFunctionInfo = (0, _reactRedux.connect)(mapStateToProps)(FunctionInfo);\n\nexports.default = FunctionInfo;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9GdW5jdGlvbkluZm8uanM/YmY0ZCJdLCJuYW1lcyI6WyJlZGl0Q29tbWFuZCIsImRpc3BhdGNoIiwiaWQiLCJ0ZXh0IiwiY29kZV9lZGl0IiwiRnVuY3Rpb25JbmZvIiwicmVuZGVyIiwicHJvcHMiLCJkb2MiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwiam9pbiIsImV4YW1wbGVzIiwibWFwIiwiZXgiLCJzb3VyY2UiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzdGF0ZSIsImRvY3MiLCJtaW5pbWl6ZVN0YXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFHQTtBQUNBO0FBQ0EsSUFBTUEsY0FBYyxTQUFkQSxXQUFjLENBQUNDLFFBQUQsRUFBV0MsRUFBWCxFQUFrQjtBQUNwQyxnQ0FBaUJDLElBQWpCO0FBQ0FGLFdBQVMsd0JBQVksRUFBQ0csV0FBVSxLQUFYLEVBQVosQ0FBVDtBQUNELENBSEQ7O0FBS0E7O0lBQ01DLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUVGQyxNLEdBQVMsWUFBTTtBQUNiLFVBQUksTUFBS0MsS0FBTCxDQUFXQyxHQUFYLENBQWVDLEtBQWYsS0FBeUIsRUFBN0IsRUFBZ0M7QUFDOUIsZUFBTztBQUFBO0FBQUEsWUFBSyxXQUFVLFdBQWY7QUFBMkI7QUFBQTtBQUFBLGNBQUssV0FBVSxZQUFmO0FBQUE7QUFBQTtBQUEzQixTQUFQO0FBQ0QsT0FGRCxNQUdJO0FBQ0YsZUFBUTtBQUFBO0FBQUEsWUFBSyxXQUFVLFdBQWY7QUFDTjtBQUFBO0FBQUEsY0FBSyxXQUFVLFlBQWY7QUFBNkIsa0JBQUtGLEtBQUwsQ0FBV0MsR0FBWCxDQUFlQztBQUE1QyxXQURNO0FBRU47QUFBQTtBQUFBLGNBQUssV0FBVSxrQkFBZjtBQUNHLGtCQUFLRixLQUFMLENBQVdDLEdBQVgsQ0FBZUUsV0FBZixDQUEyQkMsSUFBM0IsQ0FBZ0MsR0FBaEM7QUFESCxXQUZNO0FBS047QUFBQTtBQUFBLGNBQUssV0FBVSxVQUFmO0FBQ0U7QUFBQTtBQUFBLGdCQUFLLFdBQVUsTUFBZjtBQUFBO0FBQUEsYUFERjtBQUVHLGtCQUFLSixLQUFMLENBQVdDLEdBQVgsQ0FBZUksUUFBZixDQUF3QkMsR0FBeEIsQ0FBNEI7QUFBQSxxQkFBTTtBQUFBO0FBQUEsa0JBQUssV0FBVSxTQUFmO0FBQTBCQztBQUExQixlQUFOO0FBQUEsYUFBNUI7QUFGSCxXQUxNO0FBU047QUFBQTtBQUFBLGNBQUssV0FBVSxXQUFmO0FBQ0U7QUFBQTtBQUFBLGdCQUFLLFdBQVUsTUFBZjtBQUFBO0FBQUEsYUFERjtBQUVFO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQSxrQkFBbUIsVUFBVyxRQUE5QjtBQUNDLHNCQUFLUCxLQUFMLENBQVdDLEdBQVgsQ0FBZU87QUFEaEI7QUFEQTtBQUZGLFdBVE07QUFpQk47QUFBQTtBQUFBLGNBQVEsU0FBUztBQUFBLHVCQUFNZixZQUFZLE1BQUtPLEtBQUwsQ0FBV04sUUFBdkIsRUFBaUMsTUFBS00sS0FBTCxDQUFXQyxHQUFYLENBQWVOLEVBQWhELENBQU47QUFBQSxlQUFqQjtBQUFBO0FBQUE7QUFqQk0sU0FBUjtBQW1CRDtBQUNGLEs7Ozs7OztBQUdMLElBQU1jLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ0MsS0FBRDtBQUFBLFNBQVk7QUFDaENULFNBQUtTLE1BQU1DLElBRHFCO0FBRWhDQyxtQkFBZUYsTUFBTUU7QUFGVyxHQUFaO0FBQUEsQ0FBeEI7O0FBS0FkLGVBQWUseUJBQVFXLGVBQVIsRUFBeUJYLFlBQXpCLENBQWY7O2tCQUVlQSxZIiwiZmlsZSI6IjQ5OC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMsIENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgU3ludGF4SGlnaGxpZ2h0ZXIgZnJvbSAncmVhY3Qtc3ludGF4LWhpZ2hsaWdodGVyJztcbmltcG9ydCB7IHVwZGF0ZUNvbW1hbmRBUEkgfSBmcm9tICcuLi9hcGlfY2FsbHMvcHl0aG9uLmpzJztcbmltcG9ydCB7IHNldENvZGVFZGl0IH0gZnJvbSAnLi4vYWN0aW9ucy9pbmRleC5qcyc7XG5cblxuLy8gZnVuY3Rpb24gdG8gbG9hZCBhIGNvbW1hbmQgaW50byB0aGUgY29tbWFuZCBlZGl0IHBhbmUsIGFuZCBvcGVuIHBhbmVcbi8vIHRoZSBidXR0b24gZm9yIHRoaXMgaXMgaW4gdGhlIGRvY3MgcGFuZSwgYnV0IG1heWJlIGxvZ2ljIHNob3VsZCBiZSBtb3ZlZCB0byBDb21tYW5kRWRpdD9cbmNvbnN0IGVkaXRDb21tYW5kID0gKGRpc3BhdGNoLCBpZCkgPT4ge1xuICB1cGRhdGVDb21tYW5kQVBJKHRleHQpO1xuICBkaXNwYXRjaChzZXRDb2RlRWRpdCh7Y29kZV9lZGl0OmZhbHNlfSkpO1xufVxuXG4vLyB0aGlzIGNvbXBvbmVudCBkZWZpbmVzIHdoYXQgaXMgZGlzcGxheWVkIGluIHRoZSBkb2NzIHdpbmRvd1xuY2xhc3MgRnVuY3Rpb25JbmZvIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAgIHJlbmRlciA9ICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmRvYy50aXRsZSA9PT0gXCJcIil7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImZ1bmNfaW5mb1wiPjxkaXYgY2xhc3NOYW1lPVwiZnVuY190aXRsZVwiPlNlYXJjaCBmb3IgYSBjb21tYW5kIHRvIHNlZSBkb2N1bWVudGF0aW9uPC9kaXY+PC9kaXY+XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwiZnVuY19pbmZvXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmdW5jX3RpdGxlXCI+e3RoaXMucHJvcHMuZG9jLnRpdGxlfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnVuY19kZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAge3RoaXMucHJvcHMuZG9jLmRlc2NyaXB0aW9uLmpvaW4oXCIgXCIpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXhhbXBsZXNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZFwiPkV4YW1wbGVzOjwvZGl2PlxuICAgICAgICAgICAge3RoaXMucHJvcHMuZG9jLmV4YW1wbGVzLm1hcChleCA9PiA8ZGl2IGNsYXNzTmFtZT1cImV4YW1wbGVcIj57ZXh9PC9kaXY+KX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZ1bmNfY29kZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkXCI+Q29kZTo8L2Rpdj5cbiAgICAgICAgICAgIDxwcmU+XG4gICAgICAgICAgICA8U3ludGF4SGlnaGxpZ2h0ZXIgbGFuZ3VhZ2UgPSBcInB5dGhvblwiPlxuICAgICAgICAgICAge3RoaXMucHJvcHMuZG9jLnNvdXJjZX1cbiAgICAgICAgICAgIDwvU3ludGF4SGlnaGxpZ2h0ZXI+XG4gICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGVkaXRDb21tYW5kKHRoaXMucHJvcHMuZGlzcGF0Y2gsIHRoaXMucHJvcHMuZG9jLmlkKX0+RWRpdCBDb21tYW5kPC9idXR0b24+XG4gICAgICAgIDwvZGl2PilcbiAgICAgIH1cbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4gKHtcbiAgICBkb2M6IHN0YXRlLmRvY3MsXG4gICAgbWluaW1pemVTdGF0ZTogc3RhdGUubWluaW1pemVTdGF0ZVxufSk7XG5cbkZ1bmN0aW9uSW5mbyA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShGdW5jdGlvbkluZm8pO1xuXG5leHBvcnQgZGVmYXVsdCBGdW5jdGlvbkluZm87XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvY29tcG9uZW50cy9GdW5jdGlvbkluZm8uanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ })

})