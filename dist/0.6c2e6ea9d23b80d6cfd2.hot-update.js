webpackHotUpdate(0,{

/***/ 490:
/***/ (function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(2);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(30);\n\nvar _index = __webpack_require__(43);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// References to arg components, indexed by id (position of arg in list)\nvar arg_name = {},\n    arg_type = {},\n    arg_string = {};\n\n// Helper to update arg state using reference to components\nvar onChangeInput = function onChangeInput(dispatch, id) {\n  var new_values = {\n    arg_name: arg_name[id].value,\n    arg_type: arg_type[id].value,\n    arg_string: arg_string[id].value\n  };\n  dispatch((0, _index.updateCommandArg)(id, new_values));\n};\n\n// Helper to update arg state to delete arg by id\nvar onClickDelete = function onClickDelete(dispatch, id) {\n  dispatch((0, _index.deleteCommandArg)(id));\n};\n\n// helper to add argument\n// TODO: should this be refactored into a component that manages arguments?\nvar addArgument = function addArgument(dispatch) {\n  return function () {\n    dispatch((0, _index.addCommandArg)());\n  };\n};\n\n// Function that defines the set of arguments\nvar ArgumentAnnotation = function ArgumentAnnotation(_ref) {\n  var dispatch = _ref.dispatch,\n      args = _ref.args;\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(\n      'div',\n      { className: 'label' },\n      'Arguments:'\n    ),\n    _react2.default.createElement(\n      'div',\n      { className: 'arguments' },\n      args.map(function (arg, i) {\n        var name = arg.arg_name;\n        var string = arg.arg_string;\n        var arg_t = arg.arg_type;\n        return _react2.default.createElement(\n          'div',\n          { className: 'arg_annotation' },\n          _react2.default.createElement('input', { type: 'text', className: 'arg_name', placeholder: 'name of arg', onChange: function onChange() {\n              return onChangeInput(dispatch, id);\n            }, ref: function ref(node) {\n              arg_name[id] = node;\n            }, value: name }),\n          _react2.default.createElement(\n            'select',\n            { className: 'arg_type', value: arg_t, onChange: function onChange() {\n                return onChangeInput(dispatch, id);\n              }, ref: function ref(node) {\n                arg_type[id] = node;\n              } },\n            _react2.default.createElement(\n              'option',\n              null,\n              'Int'\n            ),\n            _react2.default.createElement(\n              'option',\n              null,\n              'String'\n            ),\n            _react2.default.createElement(\n              'option',\n              null,\n              'Array'\n            ),\n            _react2.default.createElement(\n              'option',\n              null,\n              'Float'\n            ),\n            _react2.default.createElement(\n              'option',\n              null,\n              'Any'\n            ),\n            _react2.default.createElement(\n              'option',\n              null,\n              'Dataframe'\n            )\n          ),\n          _react2.default.createElement('input', { type: 'text', className: 'arg_string', placeholder: 'Message to request this argument from user...', onChange: function onChange() {\n              return onChangeInput(dispatch, id);\n            }, ref: function ref(node) {\n              arg_string[id] = node;\n            }, value: string }),\n          _react2.default.createElement(\n            'button',\n            { onClick: function onClick() {\n                return onClickDelete(dispatch, id);\n              } },\n            'Delete'\n          )\n        );\n      })\n    ),\n    _react2.default.createElement(\n      'button',\n      { onClick: addArgument(dispatch) },\n      'Add Argument'\n    )\n  );\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    args: state.commandEditPane.args\n  };\n};\n\nArgumentAnnotation = (0, _reactRedux.connect)(mapStateToProps)(ArgumentAnnotation);\n\nexports.default = ArgumentAnnotation;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9Bcmd1bWVudEFubm90YXRpb24uanM/MzM3NCJdLCJuYW1lcyI6WyJhcmdfbmFtZSIsImFyZ190eXBlIiwiYXJnX3N0cmluZyIsIm9uQ2hhbmdlSW5wdXQiLCJkaXNwYXRjaCIsImlkIiwibmV3X3ZhbHVlcyIsInZhbHVlIiwib25DbGlja0RlbGV0ZSIsImFkZEFyZ3VtZW50IiwiQXJndW1lbnRBbm5vdGF0aW9uIiwiYXJncyIsIm1hcCIsImFyZyIsImkiLCJuYW1lIiwic3RyaW5nIiwiYXJnX3QiLCJub2RlIiwibWFwU3RhdGVUb1Byb3BzIiwic3RhdGUiLCJjb21tYW5kRWRpdFBhbmUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTtBQUNBLElBQUlBLFdBQVcsRUFBZjtBQUFBLElBQW1CQyxXQUFXLEVBQTlCO0FBQUEsSUFBa0NDLGFBQWEsRUFBL0M7O0FBRUE7QUFDQSxJQUFNQyxnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQUNDLFFBQUQsRUFBV0MsRUFBWCxFQUFrQjtBQUN0QyxNQUFNQyxhQUFhO0FBQ2pCTixjQUFVQSxTQUFTSyxFQUFULEVBQWFFLEtBRE47QUFFakJOLGNBQVVBLFNBQVNJLEVBQVQsRUFBYUUsS0FGTjtBQUdqQkwsZ0JBQVlBLFdBQVdHLEVBQVgsRUFBZUU7QUFIVixHQUFuQjtBQUtBSCxXQUFTLDZCQUFpQkMsRUFBakIsRUFBcUJDLFVBQXJCLENBQVQ7QUFDRCxDQVBEOztBQVNBO0FBQ0EsSUFBTUUsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFDSixRQUFELEVBQVdDLEVBQVgsRUFBa0I7QUFDdENELFdBQVMsNkJBQWlCQyxFQUFqQixDQUFUO0FBQ0QsQ0FGRDs7QUFJQTtBQUNBO0FBQ0EsSUFBTUksY0FBYyxTQUFkQSxXQUFjLENBQUNMLFFBQUQ7QUFBQSxTQUNsQixZQUFNO0FBQ0pBLGFBQVMsMkJBQVQ7QUFDRCxHQUhpQjtBQUFBLENBQXBCOztBQUtBO0FBQ0EsSUFBSU0scUJBQXFCO0FBQUEsTUFBR04sUUFBSCxRQUFHQSxRQUFIO0FBQUEsTUFBYU8sSUFBYixRQUFhQSxJQUFiO0FBQUEsU0FDckI7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxPQUFmO0FBQUE7QUFBQSxLQURGO0FBRUU7QUFBQTtBQUFBLFFBQUssV0FBVSxXQUFmO0FBQ0dBLFdBQUtDLEdBQUwsQ0FBUyxVQUFDQyxHQUFELEVBQUtDLENBQUwsRUFBVztBQUNuQixZQUFNQyxPQUFPRixJQUFJYixRQUFqQjtBQUNBLFlBQU1nQixTQUFTSCxJQUFJWCxVQUFuQjtBQUNBLFlBQU1lLFFBQVFKLElBQUlaLFFBQWxCO0FBQ0EsZUFBUTtBQUFBO0FBQUEsWUFBSyxXQUFVLGdCQUFmO0FBQ0osbURBQU8sTUFBSyxNQUFaLEVBQW1CLFdBQVUsVUFBN0IsRUFBd0MsYUFBWSxhQUFwRCxFQUFrRSxVQUFVO0FBQUEscUJBQU1FLGNBQWNDLFFBQWQsRUFBd0JDLEVBQXhCLENBQU47QUFBQSxhQUE1RSxFQUErRyxLQUFLLG1CQUFRO0FBQUNMLHVCQUFTSyxFQUFULElBQWVhLElBQWY7QUFBcUIsYUFBbEosRUFBb0osT0FBT0gsSUFBM0osR0FESTtBQUVKO0FBQUE7QUFBQSxjQUFRLFdBQVUsVUFBbEIsRUFBNkIsT0FBT0UsS0FBcEMsRUFBMkMsVUFBVTtBQUFBLHVCQUFNZCxjQUFjQyxRQUFkLEVBQXdCQyxFQUF4QixDQUFOO0FBQUEsZUFBckQsRUFBd0YsS0FBSyxtQkFBUTtBQUFDSix5QkFBU0ksRUFBVCxJQUFlYSxJQUFmO0FBQXFCLGVBQTNIO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQURGO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUZGO0FBR0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUhGO0FBSUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUpGO0FBS0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUxGO0FBTUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU5GLFdBRkk7QUFVSixtREFBTyxNQUFLLE1BQVosRUFBbUIsV0FBVSxZQUE3QixFQUEwQyxhQUFZLCtDQUF0RCxFQUFzRyxVQUFVO0FBQUEscUJBQU1mLGNBQWNDLFFBQWQsRUFBd0JDLEVBQXhCLENBQU47QUFBQSxhQUFoSCxFQUFtSixLQUFLLG1CQUFRO0FBQUNILHlCQUFXRyxFQUFYLElBQWlCYSxJQUFqQjtBQUF1QixhQUF4TCxFQUEwTCxPQUFPRixNQUFqTSxHQVZJO0FBV0o7QUFBQTtBQUFBLGNBQVEsU0FBUztBQUFBLHVCQUFNUixjQUFjSixRQUFkLEVBQXdCQyxFQUF4QixDQUFOO0FBQUEsZUFBakI7QUFBQTtBQUFBO0FBWEksU0FBUjtBQWFELE9BakJBO0FBREgsS0FGRjtBQXNCRTtBQUFBO0FBQUEsUUFBUSxTQUFTSSxZQUFZTCxRQUFaLENBQWpCO0FBQUE7QUFBQTtBQXRCRixHQURxQjtBQUFBLENBQXpCOztBQTRCQSxJQUFNZSxrQkFBa0IsU0FBbEJBLGVBQWtCLENBQUNDLEtBQUQ7QUFBQSxTQUFZO0FBQ2xDVCxVQUFNUyxNQUFNQyxlQUFOLENBQXNCVjtBQURNLEdBQVo7QUFBQSxDQUF4Qjs7QUFJQUQscUJBQXFCLHlCQUFRUyxlQUFSLEVBQXlCVCxrQkFBekIsQ0FBckI7O2tCQUVlQSxrQiIsImZpbGUiOiI0OTAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IHVwZGF0ZUNvbW1hbmRBcmcsIGRlbGV0ZUNvbW1hbmRBcmcsIGFkZENvbW1hbmRBcmcgfSBmcm9tICcuLi9hY3Rpb25zL2luZGV4LmpzJztcblxuLy8gUmVmZXJlbmNlcyB0byBhcmcgY29tcG9uZW50cywgaW5kZXhlZCBieSBpZCAocG9zaXRpb24gb2YgYXJnIGluIGxpc3QpXG5sZXQgYXJnX25hbWUgPSB7fSwgYXJnX3R5cGUgPSB7fSwgYXJnX3N0cmluZyA9IHt9O1xuXG4vLyBIZWxwZXIgdG8gdXBkYXRlIGFyZyBzdGF0ZSB1c2luZyByZWZlcmVuY2UgdG8gY29tcG9uZW50c1xuY29uc3Qgb25DaGFuZ2VJbnB1dCA9IChkaXNwYXRjaCwgaWQpID0+IHtcbiAgY29uc3QgbmV3X3ZhbHVlcyA9IHtcbiAgICBhcmdfbmFtZTogYXJnX25hbWVbaWRdLnZhbHVlLFxuICAgIGFyZ190eXBlOiBhcmdfdHlwZVtpZF0udmFsdWUsXG4gICAgYXJnX3N0cmluZzogYXJnX3N0cmluZ1tpZF0udmFsdWVcbiAgfTtcbiAgZGlzcGF0Y2godXBkYXRlQ29tbWFuZEFyZyhpZCwgbmV3X3ZhbHVlcykpO1xufTtcblxuLy8gSGVscGVyIHRvIHVwZGF0ZSBhcmcgc3RhdGUgdG8gZGVsZXRlIGFyZyBieSBpZFxuY29uc3Qgb25DbGlja0RlbGV0ZSA9IChkaXNwYXRjaCwgaWQpID0+IHtcbiAgZGlzcGF0Y2goZGVsZXRlQ29tbWFuZEFyZyhpZCkpO1xufTtcblxuLy8gaGVscGVyIHRvIGFkZCBhcmd1bWVudFxuLy8gVE9ETzogc2hvdWxkIHRoaXMgYmUgcmVmYWN0b3JlZCBpbnRvIGEgY29tcG9uZW50IHRoYXQgbWFuYWdlcyBhcmd1bWVudHM/XG5jb25zdCBhZGRBcmd1bWVudCA9IChkaXNwYXRjaCkgPT5cbiAgKCkgPT4ge1xuICAgIGRpc3BhdGNoKGFkZENvbW1hbmRBcmcoKSk7XG4gIH07XG5cbi8vIEZ1bmN0aW9uIHRoYXQgZGVmaW5lcyB0aGUgc2V0IG9mIGFyZ3VtZW50c1xubGV0IEFyZ3VtZW50QW5ub3RhdGlvbiA9ICh7IGRpc3BhdGNoLCBhcmdzIH0pID0+XG4gICAgPGRpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiZWxcIj5Bcmd1bWVudHM6PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFyZ3VtZW50c1wiPlxuICAgICAgICB7YXJncy5tYXAoKGFyZyxpKSA9PiB7XG4gICAgICAgICAgY29uc3QgbmFtZSA9IGFyZy5hcmdfbmFtZTtcbiAgICAgICAgICBjb25zdCBzdHJpbmcgPSBhcmcuYXJnX3N0cmluZztcbiAgICAgICAgICBjb25zdCBhcmdfdCA9IGFyZy5hcmdfdHlwZTtcbiAgICAgICAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwiYXJnX2Fubm90YXRpb25cIj5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiYXJnX25hbWVcIiBwbGFjZWhvbGRlcj1cIm5hbWUgb2YgYXJnXCIgb25DaGFuZ2U9eygpID0+IG9uQ2hhbmdlSW5wdXQoZGlzcGF0Y2gsIGlkKX0gcmVmPXtub2RlID0+IHthcmdfbmFtZVtpZF0gPSBub2RlO319IHZhbHVlPXtuYW1lfS8+XG4gICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiYXJnX3R5cGVcIiB2YWx1ZT17YXJnX3R9IG9uQ2hhbmdlPXsoKSA9PiBvbkNoYW5nZUlucHV0KGRpc3BhdGNoLCBpZCl9IHJlZj17bm9kZSA9PiB7YXJnX3R5cGVbaWRdID0gbm9kZTt9fT5cbiAgICAgICAgICAgICAgICA8b3B0aW9uPkludDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24+U3RyaW5nPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbj5BcnJheTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24+RmxvYXQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uPkFueTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24+RGF0YWZyYW1lPC9vcHRpb24+XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJhcmdfc3RyaW5nXCIgcGxhY2Vob2xkZXI9XCJNZXNzYWdlIHRvIHJlcXVlc3QgdGhpcyBhcmd1bWVudCBmcm9tIHVzZXIuLi5cIiBvbkNoYW5nZT17KCkgPT4gb25DaGFuZ2VJbnB1dChkaXNwYXRjaCwgaWQpfSByZWY9e25vZGUgPT4ge2FyZ19zdHJpbmdbaWRdID0gbm9kZTt9fSB2YWx1ZT17c3RyaW5nfS8+XG4gICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gb25DbGlja0RlbGV0ZShkaXNwYXRjaCwgaWQpfT5EZWxldGU8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj4pO1xuICAgICAgICB9KX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXthZGRBcmd1bWVudChkaXNwYXRjaCl9PkFkZCBBcmd1bWVudDwvYnV0dG9uPlxuICAgIDwvZGl2PjtcblxuXG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4gKHtcbiAgYXJnczogc3RhdGUuY29tbWFuZEVkaXRQYW5lLmFyZ3MsXG59KTtcblxuQXJndW1lbnRBbm5vdGF0aW9uID0gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMpKEFyZ3VtZW50QW5ub3RhdGlvbik7XG5cbmV4cG9ydCBkZWZhdWx0IEFyZ3VtZW50QW5ub3RhdGlvbjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9jb21wb25lbnRzL0FyZ3VtZW50QW5ub3RhdGlvbi5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ })

})