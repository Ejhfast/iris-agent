webpackHotUpdate(0,{

/***/ 1419:
/***/ (function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(2);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactVegaLite = __webpack_require__(1377);\n\nvar _reactVegaLite2 = _interopRequireDefault(_reactVegaLite);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar spec = {\n  \"description\": \"A simple bar chart with embedded data.\",\n  \"mark\": \"bar\",\n  \"encoding\": {\n    \"x\": { \"field\": \"a\", \"type\": \"ordinal\" },\n    \"y\": { \"field\": \"b\", \"type\": \"quantitative\" }\n  }\n};\n\nvar barData = {\n  \"values\": [{ \"a\": \"A\", \"b\": 20 }, { \"a\": \"B\", \"b\": 34 }, { \"a\": \"C\", \"b\": 55 }, { \"a\": \"D\", \"b\": 19 }, { \"a\": \"E\", \"b\": 40 }, { \"a\": \"F\", \"b\": 34 }, { \"a\": \"G\", \"b\": 91 }, { \"a\": \"H\", \"b\": 78 }, { \"a\": \"I\", \"b\": 25 }]\n};\n\nvar VegaMessage = function VegaMessage(_ref) {\n  var origin = _ref.origin,\n      spec = _ref.spec,\n      data = _ref.data;\n  return _react2.default.createElement(\n    'div',\n    { className: origin === 'iris' ? 'message left' : 'message right' },\n    _react2.default.createElement(_reactVegaLite2.default, { spec: spec, data: data })\n  );\n};\n\nexports.default = VegaMessage;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9WZWdhTWVzc2FnZS5qcz82Y2FhIl0sIm5hbWVzIjpbInNwZWMiLCJiYXJEYXRhIiwiVmVnYU1lc3NhZ2UiLCJvcmlnaW4iLCJkYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxPQUFPO0FBQ1gsaUJBQWUsd0NBREo7QUFFWCxVQUFRLEtBRkc7QUFHWCxjQUFZO0FBQ1YsU0FBSyxFQUFDLFNBQVMsR0FBVixFQUFlLFFBQVEsU0FBdkIsRUFESztBQUVWLFNBQUssRUFBQyxTQUFTLEdBQVYsRUFBZSxRQUFRLGNBQXZCO0FBRks7QUFIRCxDQUFiOztBQVNBLElBQU1DLFVBQVU7QUFDZCxZQUFVLENBQ1IsRUFBQyxLQUFLLEdBQU4sRUFBVSxLQUFLLEVBQWYsRUFEUSxFQUNZLEVBQUMsS0FBSyxHQUFOLEVBQVUsS0FBSyxFQUFmLEVBRFosRUFDZ0MsRUFBQyxLQUFLLEdBQU4sRUFBVSxLQUFLLEVBQWYsRUFEaEMsRUFFUixFQUFDLEtBQUssR0FBTixFQUFVLEtBQUssRUFBZixFQUZRLEVBRVksRUFBQyxLQUFLLEdBQU4sRUFBVSxLQUFLLEVBQWYsRUFGWixFQUVnQyxFQUFDLEtBQUssR0FBTixFQUFVLEtBQUssRUFBZixFQUZoQyxFQUdSLEVBQUMsS0FBSyxHQUFOLEVBQVUsS0FBSyxFQUFmLEVBSFEsRUFHWSxFQUFDLEtBQUssR0FBTixFQUFVLEtBQUssRUFBZixFQUhaLEVBR2dDLEVBQUMsS0FBSyxHQUFOLEVBQVUsS0FBSyxFQUFmLEVBSGhDO0FBREksQ0FBaEI7O0FBUUEsSUFBTUMsY0FBYyxTQUFkQSxXQUFjO0FBQUEsTUFBR0MsTUFBSCxRQUFHQSxNQUFIO0FBQUEsTUFBV0gsSUFBWCxRQUFXQSxJQUFYO0FBQUEsTUFBaUJJLElBQWpCLFFBQWlCQSxJQUFqQjtBQUFBLFNBQ2hCO0FBQUE7QUFBQSxNQUFLLFdBQWFELFdBQVcsTUFBWCxHQUFvQixjQUFwQixHQUFxQyxlQUF2RDtBQUNJLDZEQUFVLE1BQU1ILElBQWhCLEVBQXNCLE1BQU1JLElBQTVCO0FBREosR0FEZ0I7QUFBQSxDQUFwQjs7a0JBTWVGLFciLCJmaWxlIjoiMTQxOS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVmVnYUxpdGUgZnJvbSAncmVhY3QtdmVnYS1saXRlJztcblxuY29uc3Qgc3BlYyA9IHtcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkEgc2ltcGxlIGJhciBjaGFydCB3aXRoIGVtYmVkZGVkIGRhdGEuXCIsXG4gIFwibWFya1wiOiBcImJhclwiLFxuICBcImVuY29kaW5nXCI6IHtcbiAgICBcInhcIjoge1wiZmllbGRcIjogXCJhXCIsIFwidHlwZVwiOiBcIm9yZGluYWxcIn0sXG4gICAgXCJ5XCI6IHtcImZpZWxkXCI6IFwiYlwiLCBcInR5cGVcIjogXCJxdWFudGl0YXRpdmVcIn1cbiAgfVxufTtcblxuY29uc3QgYmFyRGF0YSA9IHtcbiAgXCJ2YWx1ZXNcIjogW1xuICAgIHtcImFcIjogXCJBXCIsXCJiXCI6IDIwfSwge1wiYVwiOiBcIkJcIixcImJcIjogMzR9LCB7XCJhXCI6IFwiQ1wiLFwiYlwiOiA1NX0sXG4gICAge1wiYVwiOiBcIkRcIixcImJcIjogMTl9LCB7XCJhXCI6IFwiRVwiLFwiYlwiOiA0MH0sIHtcImFcIjogXCJGXCIsXCJiXCI6IDM0fSxcbiAgICB7XCJhXCI6IFwiR1wiLFwiYlwiOiA5MX0sIHtcImFcIjogXCJIXCIsXCJiXCI6IDc4fSwge1wiYVwiOiBcIklcIixcImJcIjogMjV9XG4gIF1cbn07XG5cbmNvbnN0IFZlZ2FNZXNzYWdlID0gKHsgb3JpZ2luLCBzcGVjLCBkYXRhIH0pID0+XG4gICAgPGRpdiBjbGFzc05hbWUgPSB7b3JpZ2luID09PSAnaXJpcycgPyAnbWVzc2FnZSBsZWZ0JyA6ICdtZXNzYWdlIHJpZ2h0J30+XG4gICAgICAgIDxWZWdhTGl0ZSBzcGVjPXtzcGVjfSBkYXRhPXtkYXRhfSAvPlxuICAgIDwvZGl2PjtcblxuXG5leHBvcnQgZGVmYXVsdCBWZWdhTWVzc2FnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9jb21wb25lbnRzL1ZlZ2FNZXNzYWdlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ })

})