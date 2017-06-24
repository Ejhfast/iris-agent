webpackHotUpdate(0,{

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _react = __webpack_require__(2);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(56);\n\nvar _lodash = __webpack_require__(155);\n\nvar _ = _interopRequireWildcard(_lodash);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar RightPane = function RightPane(_ref) {\n    var variables = _ref.variables,\n        doc = _ref.doc;\n    return _react2.default.createElement(\n        'div',\n        { className: 'right_pane' },\n        _react2.default.createElement(\n            'div',\n            { className: 'subtitle' },\n            'Iris'\n        ),\n        _react2.default.createElement(\n            'div',\n            { className: 'snippet' },\n            'Built with React and Redux. More will appear here soon.'\n        ),\n        _react2.default.createElement(\n            'div',\n            { className: 'variableTable' },\n            _react2.default.createElement(\n                'div',\n                { className: 'title' },\n                'Current Variables'\n            ),\n            _react2.default.createElement(\n                'ul',\n                null,\n                _.map(_.sortBy(variables, function (v) {\n                    return v.order;\n                }), function (x) {\n                    return _react2.default.createElement(\n                        'li',\n                        null,\n                        _react2.default.createElement(\n                            'span',\n                            { className: 'three_quarter name' },\n                            x.name\n                        ),\n                        _react2.default.createElement(\n                            'span',\n                            { className: 'quarter' },\n                            x.value\n                        )\n                    );\n                })\n            )\n        ),\n        _react2.default.createElement(\n            'div',\n            { className: 'func_info' },\n            _react2.default.createElement(\n                'div',\n                null,\n                doc.title\n            ),\n            _react2.default.createElement(\n                'div',\n                { className: 'func_title' },\n                'add two numbers: x and y'\n            ),\n            _react2.default.createElement(\n                'div',\n                { className: 'func_description' },\n                'This function takes two numbers as input and produces their sum.'\n            ),\n            _react2.default.createElement(\n                'div',\n                { className: 'examples' },\n                _react2.default.createElement(\n                    'div',\n                    { className: 'head' },\n                    'EXAMPLES:'\n                ),\n                _react2.default.createElement(\n                    'div',\n                    { className: 'example' },\n                    '\"add 2 3\"'\n                ),\n                _react2.default.createElement(\n                    'div',\n                    { className: 'example' },\n                    '\"add 45 and 43\"'\n                )\n            ),\n            _react2.default.createElement(\n                'div',\n                { className: 'func_code' },\n                _react2.default.createElement(\n                    'div',\n                    { className: 'head' },\n                    'CODE:'\n                ),\n                _react2.default.createElement(\n                    'pre',\n                    null,\n                    'def add_two_numbers(x,y): return x + y'\n                )\n            )\n        )\n    );\n};\n\nRightPane.propTypes = {\n    variables: _react.PropTypes.arrayOf(_react.PropTypes.any)\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n    return {\n        variables: state.variables,\n        doc: state.docs\n    };\n};\n\nRightPane = (0, _reactRedux.connect)(mapStateToProps)(RightPane);\n\nexports.default = RightPane;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9SaWdodFBhbmUuanM/NmE1YiJdLCJuYW1lcyI6WyJfIiwiUmlnaHRQYW5lIiwidmFyaWFibGVzIiwiZG9jIiwibWFwIiwic29ydEJ5IiwidiIsIm9yZGVyIiwieCIsIm5hbWUiLCJ2YWx1ZSIsInRpdGxlIiwicHJvcFR5cGVzIiwiYXJyYXlPZiIsImFueSIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwiZG9jcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7SUFBWUEsQzs7Ozs7O0FBRVosSUFBSUMsWUFBWTtBQUFBLFFBQUdDLFNBQUgsUUFBR0EsU0FBSDtBQUFBLFFBQWNDLEdBQWQsUUFBY0EsR0FBZDtBQUFBLFdBQ1o7QUFBQTtBQUFBLFVBQUssV0FBVSxZQUFmO0FBQ0k7QUFBQTtBQUFBLGNBQUssV0FBVSxVQUFmO0FBQUE7QUFBQSxTQURKO0FBRUk7QUFBQTtBQUFBLGNBQUssV0FBVSxTQUFmO0FBQUE7QUFBQSxTQUZKO0FBR0k7QUFBQTtBQUFBLGNBQUssV0FBVSxlQUFmO0FBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsT0FBZjtBQUFBO0FBQUEsYUFESjtBQUVJO0FBQUE7QUFBQTtBQUNJSCxrQkFBRUksR0FBRixDQUFNSixFQUFFSyxNQUFGLENBQVNILFNBQVQsRUFBb0IsVUFBQ0ksQ0FBRCxFQUFPO0FBQy9CLDJCQUFPQSxFQUFFQyxLQUFUO0FBQ0gsaUJBRk8sQ0FBTixFQUdBLFVBQUNDLENBQUQsRUFBTztBQUNILDJCQUFPO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSw4QkFBTSxXQUFVLG9CQUFoQjtBQUF1Q0EsOEJBQUVDO0FBQXpDLHlCQUFKO0FBQTBEO0FBQUE7QUFBQSw4QkFBTSxXQUFVLFNBQWhCO0FBQTRCRCw4QkFBRUU7QUFBOUI7QUFBMUQscUJBQVA7QUFDSCxpQkFMRDtBQURKO0FBRkosU0FISjtBQWNJO0FBQUE7QUFBQSxjQUFLLFdBQVUsV0FBZjtBQUNFO0FBQUE7QUFBQTtBQUFNUCxvQkFBSVE7QUFBVixhQURGO0FBRUU7QUFBQTtBQUFBLGtCQUFLLFdBQVUsWUFBZjtBQUFBO0FBQUEsYUFGRjtBQUdFO0FBQUE7QUFBQSxrQkFBSyxXQUFVLGtCQUFmO0FBQUE7QUFBQSxhQUhGO0FBSUU7QUFBQTtBQUFBLGtCQUFLLFdBQVUsVUFBZjtBQUNFO0FBQUE7QUFBQSxzQkFBSyxXQUFVLE1BQWY7QUFBQTtBQUFBLGlCQURGO0FBRUU7QUFBQTtBQUFBLHNCQUFLLFdBQVUsU0FBZjtBQUFBO0FBQUEsaUJBRkY7QUFHRTtBQUFBO0FBQUEsc0JBQUssV0FBVSxTQUFmO0FBQUE7QUFBQTtBQUhGLGFBSkY7QUFTRTtBQUFBO0FBQUEsa0JBQUssV0FBVSxXQUFmO0FBQ0U7QUFBQTtBQUFBLHNCQUFLLFdBQVUsTUFBZjtBQUFBO0FBQUEsaUJBREY7QUFFRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkY7QUFURjtBQWRKLEtBRFk7QUFBQSxDQUFoQjs7QUFpQ0FWLFVBQVVXLFNBQVYsR0FBc0I7QUFDbEJWLGVBQVcsaUJBQVVXLE9BQVYsQ0FBa0IsaUJBQVVDLEdBQTVCO0FBRE8sQ0FBdEI7O0FBSUEsSUFBTUMsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFDQyxLQUFEO0FBQUEsV0FBWTtBQUNoQ2QsbUJBQVdjLE1BQU1kLFNBRGU7QUFFaENDLGFBQUthLE1BQU1DO0FBRnFCLEtBQVo7QUFBQSxDQUF4Qjs7QUFLQWhCLFlBQVkseUJBQVFjLGVBQVIsRUFBeUJkLFNBQXpCLENBQVo7O2tCQUVlQSxTIiwiZmlsZSI6IjQyNi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5sZXQgUmlnaHRQYW5lID0gKHsgdmFyaWFibGVzLCBkb2MgfSkgPT5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cInJpZ2h0X3BhbmVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJ0aXRsZVwiPklyaXM8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbmlwcGV0XCI+QnVpbHQgd2l0aCBSZWFjdCBhbmQgUmVkdXguIE1vcmUgd2lsbCBhcHBlYXIgaGVyZSBzb29uLjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZhcmlhYmxlVGFibGVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5DdXJyZW50IFZhcmlhYmxlczwvZGl2PlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICB7IF8ubWFwKF8uc29ydEJ5KHZhcmlhYmxlcywgKHYpID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB2Lm9yZGVyO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAoeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGxpPjxzcGFuIGNsYXNzTmFtZT1cInRocmVlX3F1YXJ0ZXIgbmFtZVwiPnsgeC5uYW1lIH08L3NwYW4+PHNwYW4gY2xhc3NOYW1lPVwicXVhcnRlclwiPnsgeC52YWx1ZSB9PC9zcGFuPjwvbGk+O1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnVuY19pbmZvXCI+XG4gICAgICAgICAgPGRpdj57ZG9jLnRpdGxlfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnVuY190aXRsZVwiPmFkZCB0d28gbnVtYmVyczogeCBhbmQgeTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnVuY19kZXNjcmlwdGlvblwiPlRoaXMgZnVuY3Rpb24gdGFrZXMgdHdvIG51bWJlcnMgYXMgaW5wdXQgYW5kIHByb2R1Y2VzIHRoZWlyIHN1bS48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4YW1wbGVzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRcIj5FWEFNUExFUzo8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXhhbXBsZVwiPlwiYWRkIDIgM1wiPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV4YW1wbGVcIj5cImFkZCA0NSBhbmQgNDNcIjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZnVuY19jb2RlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRcIj5DT0RFOjwvZGl2PlxuICAgICAgICAgICAgPHByZT5cbiAgICAgICAgICAgIGRlZiBhZGRfdHdvX251bWJlcnMoeCx5KTogcmV0dXJuIHggKyB5XG4gICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+O1xuXG5SaWdodFBhbmUucHJvcFR5cGVzID0ge1xuICAgIHZhcmlhYmxlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+ICh7XG4gICAgdmFyaWFibGVzOiBzdGF0ZS52YXJpYWJsZXMsXG4gICAgZG9jOiBzdGF0ZS5kb2NzXG59KTtcblxuUmlnaHRQYW5lID0gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMpKFJpZ2h0UGFuZSk7XG5cbmV4cG9ydCBkZWZhdWx0IFJpZ2h0UGFuZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9jb21wb25lbnRzL1JpZ2h0UGFuZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ })

})