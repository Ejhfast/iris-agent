webpackHotUpdate(0,{

/***/ 1303:
/***/ (function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _react = __webpack_require__(2);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _InputBox = __webpack_require__(168);\n\nvar _python = __webpack_require__(126);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar file_input = void 0;\n\nvar onChangeFile = function onChangeFile(dispatch) {\n    _InputBox.input.value = file_input.files[0].path;\n    (0, _python.updateHint)(_InputBox.input.value);\n    // updateDocs(input.value);\n};\n\nvar FilePickMessage = function FilePickMessage(_ref) {\n    var dispatch = _ref.dispatch,\n        active = _ref.active,\n        origin = _ref.origin,\n        text = _ref.text,\n        hidden = _ref.hidden;\n    return _react2.default.createElement(\n        'div',\n        { className: origin === 'iris' ? 'message left' : 'message right', style: hidden === true ? { display: 'none' } : {} },\n        _react2.default.createElement(\n            'div',\n            { className: 'bubble' },\n            _react2.default.createElement('input', { type: 'file', name: 'file', id: 'file', className: 'inputfile', disabled: active, onChange: function onChange() {\n                    return onChangeFile(dispatch);\n                }, ref: function ref(node) {\n                    file_input = node;\n                } })\n        )\n    );\n};\n\nexports.default = FilePickMessage;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9GaWxlUGlja01lc3NhZ2UuanM/MjEwYSJdLCJuYW1lcyI6WyJmaWxlX2lucHV0Iiwib25DaGFuZ2VGaWxlIiwiZGlzcGF0Y2giLCJ2YWx1ZSIsImZpbGVzIiwicGF0aCIsIkZpbGVQaWNrTWVzc2FnZSIsImFjdGl2ZSIsIm9yaWdpbiIsInRleHQiLCJoaWRkZW4iLCJkaXNwbGF5Iiwibm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUVBLElBQUlBLG1CQUFKOztBQUVBLElBQU1DLGVBQWUsU0FBZkEsWUFBZSxDQUFDQyxRQUFELEVBQWM7QUFDL0Isb0JBQU1DLEtBQU4sR0FBY0gsV0FBV0ksS0FBWCxDQUFpQixDQUFqQixFQUFvQkMsSUFBbEM7QUFDQSw0QkFBVyxnQkFBTUYsS0FBakI7QUFDQTtBQUNILENBSkQ7O0FBTUEsSUFBTUcsa0JBQWtCLFNBQWxCQSxlQUFrQjtBQUFBLFFBQUdKLFFBQUgsUUFBR0EsUUFBSDtBQUFBLFFBQWFLLE1BQWIsUUFBYUEsTUFBYjtBQUFBLFFBQXFCQyxNQUFyQixRQUFxQkEsTUFBckI7QUFBQSxRQUE2QkMsSUFBN0IsUUFBNkJBLElBQTdCO0FBQUEsUUFBbUNDLE1BQW5DLFFBQW1DQSxNQUFuQztBQUFBLFdBQ3BCO0FBQUE7QUFBQSxVQUFLLFdBQWFGLFdBQVcsTUFBWCxHQUFvQixjQUFwQixHQUFxQyxlQUF2RCxFQUF3RSxPQUFPRSxXQUFXLElBQVgsR0FBa0IsRUFBQ0MsU0FBUyxNQUFWLEVBQWxCLEdBQXNDLEVBQXJIO0FBQ0k7QUFBQTtBQUFBLGNBQUssV0FBWSxRQUFqQjtBQUNBLHFEQUFPLE1BQUssTUFBWixFQUFtQixNQUFLLE1BQXhCLEVBQStCLElBQUcsTUFBbEMsRUFBeUMsV0FBVSxXQUFuRCxFQUErRCxVQUFVSixNQUF6RSxFQUFpRixVQUFVO0FBQUEsMkJBQU1OLGFBQWFDLFFBQWIsQ0FBTjtBQUFBLGlCQUEzRixFQUF5SCxLQUFLLG1CQUFRO0FBQUNGLGlDQUFhWSxJQUFiO0FBQW1CLGlCQUExSjtBQURBO0FBREosS0FEb0I7QUFBQSxDQUF4Qjs7a0JBT2VOLGUiLCJmaWxlIjoiMTMwMy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBpbnB1dCB9IGZyb20gJy4uL2NvbnRhaW5lcnMvSW5wdXRCb3gnO1xuaW1wb3J0IHsgdXBkYXRlSGludCB9IGZyb20gJy4uL2FwaV9jYWxscy9weXRob24uanMnO1xuXG5sZXQgZmlsZV9pbnB1dDtcblxuY29uc3Qgb25DaGFuZ2VGaWxlID0gKGRpc3BhdGNoKSA9PiB7XG4gICAgaW5wdXQudmFsdWUgPSBmaWxlX2lucHV0LmZpbGVzWzBdLnBhdGg7XG4gICAgdXBkYXRlSGludChpbnB1dC52YWx1ZSk7XG4gICAgLy8gdXBkYXRlRG9jcyhpbnB1dC52YWx1ZSk7XG59O1xuXG5jb25zdCBGaWxlUGlja01lc3NhZ2UgPSAoeyBkaXNwYXRjaCwgYWN0aXZlLCBvcmlnaW4sIHRleHQsIGhpZGRlbiB9KSA9PlxuICAgIDxkaXYgY2xhc3NOYW1lID0ge29yaWdpbiA9PT0gJ2lyaXMnID8gJ21lc3NhZ2UgbGVmdCcgOiAnbWVzc2FnZSByaWdodCd9IHN0eWxlPXtoaWRkZW4gPT09IHRydWUgPyB7ZGlzcGxheTogJ25vbmUnfSA6IHt9fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWUgPSBcImJ1YmJsZVwiPlxuICAgICAgICA8aW5wdXQgdHlwZT0nZmlsZScgbmFtZT1cImZpbGVcIiBpZD1cImZpbGVcIiBjbGFzc05hbWU9XCJpbnB1dGZpbGVcIiBkaXNhYmxlZD17YWN0aXZlfSBvbkNoYW5nZT17KCkgPT4gb25DaGFuZ2VGaWxlKGRpc3BhdGNoKX0gcmVmPXtub2RlID0+IHtmaWxlX2lucHV0ID0gbm9kZTt9fS8+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PjtcblxuZXhwb3J0IGRlZmF1bHQgRmlsZVBpY2tNZXNzYWdlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2NvbXBvbmVudHMvRmlsZVBpY2tNZXNzYWdlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ })

})