webpackHotUpdate(0,{

/***/ 432:
/***/ (function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(2);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(25);\n\nvar _index = __webpack_require__(48);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar arg_name = void 0,\n    arg_type = void 0,\n    arg_string = void 0;\n\nvar onChangeInput = function onChangeInput(dispatch, id) {\n  console.log(\"change \" + id);\n  var new_values = {\n    arg_name: arg_name.value,\n    arg_type: arg_type.value,\n    art_string: arg_string.value\n  };\n  dispatch((0, _index.updateCommandArg)(id, new_values));\n};\n\nvar onClickDelete = function onClickDelete(dispatch, id) {\n  console.log(\"delete \" + id);\n  dispatch((0, _index.deleteCommandArg)(id));\n};\n\nvar ArgumentAnnotation = function ArgumentAnnotation(_ref) {\n  var dispatch = _ref.dispatch,\n      id = _ref.id,\n      arg_name = _ref.arg_name;\n  return _react2.default.createElement(\n    'div',\n    { className: 'arg_annotation' },\n    _react2.default.createElement('input', { type: 'text', name: 'arg_name', onChange: function onChange() {\n        return onChangeInput(dispatch, id);\n      }, ref: function ref(node) {\n        arg_name = node;\n      }, value: arg_name }),\n    _react2.default.createElement(\n      'select',\n      { name: 'arg_type', onChange: function onChange() {\n          return onChangeInput(dispatch, id);\n        }, ref: function ref(node) {\n          arg_type = node;\n        } },\n      _react2.default.createElement(\n        'option',\n        null,\n        'Int'\n      ),\n      _react2.default.createElement(\n        'option',\n        null,\n        'String'\n      )\n    ),\n    _react2.default.createElement('input', { type: 'text', placeholder: 'Message to request this argument from user...', onChange: function onChange() {\n        return onChangeInput(dispatch, id);\n      }, ref: function ref(node) {\n        arg_string = node;\n      } }),\n    _react2.default.createElement(\n      'button',\n      { onClick: function onClick() {\n          return onClickDelete(dispatch, id);\n        } },\n      'Delete'\n    )\n  );\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {};\n};\n\nArgumentAnnotation = (0, _reactRedux.connect)(mapStateToProps)(ArgumentAnnotation);\n\nexports.default = ArgumentAnnotation;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9Bcmd1bWVudEFubm90YXRpb24uanM/MzM3NCJdLCJuYW1lcyI6WyJhcmdfbmFtZSIsImFyZ190eXBlIiwiYXJnX3N0cmluZyIsIm9uQ2hhbmdlSW5wdXQiLCJkaXNwYXRjaCIsImlkIiwiY29uc29sZSIsImxvZyIsIm5ld192YWx1ZXMiLCJ2YWx1ZSIsImFydF9zdHJpbmciLCJvbkNsaWNrRGVsZXRlIiwiQXJndW1lbnRBbm5vdGF0aW9uIiwibm9kZSIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBR0EsSUFBSUEsaUJBQUo7QUFBQSxJQUFjQyxpQkFBZDtBQUFBLElBQXdCQyxtQkFBeEI7O0FBRUEsSUFBTUMsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFDQyxRQUFELEVBQVdDLEVBQVgsRUFBa0I7QUFDdENDLFVBQVFDLEdBQVIsQ0FBWSxZQUFVRixFQUF0QjtBQUNBLE1BQU1HLGFBQWE7QUFDakJSLGNBQVVBLFNBQVNTLEtBREY7QUFFakJSLGNBQVVBLFNBQVNRLEtBRkY7QUFHakJDLGdCQUFZUixXQUFXTztBQUhOLEdBQW5CO0FBS0FMLFdBQVMsNkJBQWlCQyxFQUFqQixFQUFxQkcsVUFBckIsQ0FBVDtBQUNELENBUkQ7O0FBVUEsSUFBTUcsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFDUCxRQUFELEVBQVdDLEVBQVgsRUFBa0I7QUFDdENDLFVBQVFDLEdBQVIsQ0FBWSxZQUFVRixFQUF0QjtBQUNBRCxXQUFTLDZCQUFpQkMsRUFBakIsQ0FBVDtBQUNELENBSEQ7O0FBS0EsSUFBSU8scUJBQXFCO0FBQUEsTUFBR1IsUUFBSCxRQUFHQSxRQUFIO0FBQUEsTUFBYUMsRUFBYixRQUFhQSxFQUFiO0FBQUEsTUFBaUJMLFFBQWpCLFFBQWlCQSxRQUFqQjtBQUFBLFNBQ3JCO0FBQUE7QUFBQSxNQUFLLFdBQVUsZ0JBQWY7QUFDSSw2Q0FBTyxNQUFLLE1BQVosRUFBbUIsTUFBSyxVQUF4QixFQUFtQyxVQUFVO0FBQUEsZUFBTUcsY0FBY0MsUUFBZCxFQUF3QkMsRUFBeEIsQ0FBTjtBQUFBLE9BQTdDLEVBQWdGLEtBQUssbUJBQVE7QUFBQ0wsbUJBQVdhLElBQVg7QUFBaUIsT0FBL0csRUFBaUgsT0FBT2IsUUFBeEgsR0FESjtBQUVJO0FBQUE7QUFBQSxRQUFRLE1BQUssVUFBYixFQUF3QixVQUFVO0FBQUEsaUJBQU1HLGNBQWNDLFFBQWQsRUFBd0JDLEVBQXhCLENBQU47QUFBQSxTQUFsQyxFQUFxRSxLQUFLLG1CQUFRO0FBQUNKLHFCQUFXWSxJQUFYO0FBQWlCLFNBQXBHO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQURGO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZGLEtBRko7QUFNSSw2Q0FBTyxNQUFLLE1BQVosRUFBbUIsYUFBWSwrQ0FBL0IsRUFBK0UsVUFBVTtBQUFBLGVBQU1WLGNBQWNDLFFBQWQsRUFBd0JDLEVBQXhCLENBQU47QUFBQSxPQUF6RixFQUE0SCxLQUFLLG1CQUFRO0FBQUNILHFCQUFhVyxJQUFiO0FBQW1CLE9BQTdKLEdBTko7QUFPSTtBQUFBO0FBQUEsUUFBUSxTQUFTO0FBQUEsaUJBQU1GLGNBQWNQLFFBQWQsRUFBd0JDLEVBQXhCLENBQU47QUFBQSxTQUFqQjtBQUFBO0FBQUE7QUFQSixHQURxQjtBQUFBLENBQXpCOztBQVdBLElBQU1TLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ0MsS0FBRDtBQUFBLFNBQVksRUFBWjtBQUFBLENBQXhCOztBQUVBSCxxQkFBcUIseUJBQVFFLGVBQVIsRUFBeUJGLGtCQUF6QixDQUFyQjs7a0JBRWVBLGtCIiwiZmlsZSI6IjQzMi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgdXBkYXRlQ29tbWFuZEFyZywgZGVsZXRlQ29tbWFuZEFyZyB9IGZyb20gJy4uL2FjdGlvbnMvaW5kZXguanMnO1xuXG5cbmxldCBhcmdfbmFtZSwgYXJnX3R5cGUsIGFyZ19zdHJpbmc7XG5cbmNvbnN0IG9uQ2hhbmdlSW5wdXQgPSAoZGlzcGF0Y2gsIGlkKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiY2hhbmdlIFwiK2lkKTtcbiAgY29uc3QgbmV3X3ZhbHVlcyA9IHtcbiAgICBhcmdfbmFtZTogYXJnX25hbWUudmFsdWUsXG4gICAgYXJnX3R5cGU6IGFyZ190eXBlLnZhbHVlLFxuICAgIGFydF9zdHJpbmc6IGFyZ19zdHJpbmcudmFsdWVcbiAgfTtcbiAgZGlzcGF0Y2godXBkYXRlQ29tbWFuZEFyZyhpZCwgbmV3X3ZhbHVlcykpO1xufTtcblxuY29uc3Qgb25DbGlja0RlbGV0ZSA9IChkaXNwYXRjaCwgaWQpID0+IHtcbiAgY29uc29sZS5sb2coXCJkZWxldGUgXCIraWQpO1xuICBkaXNwYXRjaChkZWxldGVDb21tYW5kQXJnKGlkKSk7XG59O1xuXG5sZXQgQXJndW1lbnRBbm5vdGF0aW9uID0gKHsgZGlzcGF0Y2gsIGlkLCBhcmdfbmFtZSB9KSA9PlxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYXJnX2Fubm90YXRpb25cIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImFyZ19uYW1lXCIgb25DaGFuZ2U9eygpID0+IG9uQ2hhbmdlSW5wdXQoZGlzcGF0Y2gsIGlkKX0gcmVmPXtub2RlID0+IHthcmdfbmFtZSA9IG5vZGU7fX0gdmFsdWU9e2FyZ19uYW1lfS8+XG4gICAgICAgIDxzZWxlY3QgbmFtZT1cImFyZ190eXBlXCIgb25DaGFuZ2U9eygpID0+IG9uQ2hhbmdlSW5wdXQoZGlzcGF0Y2gsIGlkKX0gcmVmPXtub2RlID0+IHthcmdfdHlwZSA9IG5vZGU7fX0+XG4gICAgICAgICAgPG9wdGlvbj5JbnQ8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uPlN0cmluZzwvb3B0aW9uPlxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJNZXNzYWdlIHRvIHJlcXVlc3QgdGhpcyBhcmd1bWVudCBmcm9tIHVzZXIuLi5cIiBvbkNoYW5nZT17KCkgPT4gb25DaGFuZ2VJbnB1dChkaXNwYXRjaCwgaWQpfSByZWY9e25vZGUgPT4ge2FyZ19zdHJpbmcgPSBub2RlO319Lz5cbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBvbkNsaWNrRGVsZXRlKGRpc3BhdGNoLCBpZCl9PkRlbGV0ZTwvYnV0dG9uPlxuICAgIDwvZGl2PjtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiAoe30pO1xuXG5Bcmd1bWVudEFubm90YXRpb24gPSBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcykoQXJndW1lbnRBbm5vdGF0aW9uKTtcblxuZXhwb3J0IGRlZmF1bHQgQXJndW1lbnRBbm5vdGF0aW9uO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2NvbXBvbmVudHMvQXJndW1lbnRBbm5vdGF0aW9uLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ })

})