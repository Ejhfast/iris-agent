webpackHotUpdate(0,{

/***/ 493:
/***/ (function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(2);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(30);\n\nvar _brace = __webpack_require__(208);\n\nvar _brace2 = _interopRequireDefault(_brace);\n\nvar _reactAce = __webpack_require__(1153);\n\nvar _reactAce2 = _interopRequireDefault(_reactAce);\n\nvar _ArgumentAnnotation = __webpack_require__(490);\n\nvar _ArgumentAnnotation2 = _interopRequireDefault(_ArgumentAnnotation);\n\nvar _ExamplesEditor = __webpack_require__(496);\n\nvar _index = __webpack_require__(48);\n\nvar _python = __webpack_require__(73);\n\nvar _reactSplitPane = __webpack_require__(292);\n\nvar _reactSplitPane2 = _interopRequireDefault(_reactSplitPane);\n\n__webpack_require__(568);\n\n__webpack_require__(569);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar command_name = void 0,\n    command_title = void 0,\n    test_inputs = void 0,\n    args_editor = void 0,\n    command_editor = void 0,\n    explanation_editor = void 0,\n    code_preview = void 0;\n\nvar argValues = function argValues() {\n  return _.map(examples_ref, function (value, key) {\n    return value.value;\n  });\n};\n\nvar runTest = function runTest(args_obj) {\n  console.log(command_name);\n  console.log(\"running\", command_name.value);\n  console.log(\"running\", command_title.value);\n  (0, _python.testFunction)({\n    name: command_name.value,\n    title: command_title.value,\n    args: args_obj,\n    examples: (0, _ExamplesEditor.exampleValues)(),\n    command: command_editor.editor.getValue(),\n    explanation: explanation_editor.editor.getValue()\n  });\n};\n\nvar onChangeInput = function onChangeInput(dispatch, name, i) {\n  console.log(name, i);\n  console.log(i.value);\n  console.log(\"setting\", name, i.value);\n  dispatch((0, _index.updateCodeEditor)(name, i.value));\n};\n\nvar onChange = function onChange(dispatch, name) {\n  return function (value) {\n    console.log(value);\n    console.log(\"setting\", name, value);\n    dispatch((0, _index.updateCodeEditor)(name, value));\n  };\n};\n\nvar addArgument = function addArgument(dispatch) {\n  return function () {\n    dispatch((0, _index.addCommandArg)());\n  };\n};\n\nvar CommandEdit = function (_Component) {\n  _inherits(CommandEdit, _Component);\n\n  function CommandEdit() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, CommandEdit);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CommandEdit.__proto__ || Object.getPrototypeOf(CommandEdit)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {\n      return _react2.default.createElement(\n        'div',\n        { className: 'command_edit' },\n        _react2.default.createElement(\n          'div',\n          { 'class': 'overflow' },\n          _react2.default.createElement(\n            'div',\n            { className: 'label' },\n            'Command name:'\n          ),\n          _react2.default.createElement('input', { type: 'text', placeholder: 'e.g., AddTwoNumbers', onChange: function onChange() {\n              return onChangeInput(_this.props.dispatch, 'name', command_name);\n            }, ref: function ref(node) {\n              command_name = node;\n            }, value: _this.props.name }),\n          _react2.default.createElement(\n            'div',\n            { className: 'label' },\n            'Command title:'\n          ),\n          _react2.default.createElement('input', { type: 'text', placeholder: 'e.g., add {x} and {y}', onChange: function onChange() {\n              return onChangeInput(_this.props.dispatch, 'title', command_title);\n            }, ref: function ref(node) {\n              command_title = node;\n            }, value: _this.props.title }),\n          _react2.default.createElement(\n            'div',\n            { className: 'label' },\n            'Arguments:'\n          ),\n          _react2.default.createElement(\n            'button',\n            { onClick: addArgument(_this.props.dispatch) },\n            'Add Argument'\n          ),\n          _react2.default.createElement(\n            'div',\n            { className: 'arguments' },\n            _this.props.args.map(function (arg, i) {\n              return _react2.default.createElement(_ArgumentAnnotation2.default, { id: i, name: arg.arg_name, string: arg.arg_string, arg_t: arg.arg_type });\n            })\n          ),\n          _react2.default.createElement(\n            'div',\n            { className: 'label' },\n            'Examples'\n          ),\n          _react2.default.createElement(_ExamplesEditor.ExamplesEditor, null),\n          _react2.default.createElement(\n            'div',\n            { className: 'label' },\n            'The python command:'\n          ),\n          _react2.default.createElement(_reactAce2.default, {\n            mode: 'python',\n            width: '100%',\n            height: '300px',\n            autoScrollEditorIntoView: 'true',\n            maxLines: 15,\n            theme: 'github',\n            onChange: onChange(_this.props.dispatch, 'command'),\n            value: _this.props.command,\n            name: 'command_editor',\n            ref: function ref(node) {\n              command_editor = node;\n            }\n\n          }),\n          _react2.default.createElement(\n            'div',\n            { className: 'label' },\n            'The explanation:'\n          ),\n          _react2.default.createElement(_reactAce2.default, {\n            mode: 'python',\n            width: '100%',\n            maxLines: 15,\n            autoScrollEditorIntoView: 'true',\n            height: '300px',\n            theme: 'github',\n            onChange: onChange(_this.props.dispatch, 'explanation'),\n            value: _this.props.explanation,\n            name: 'explanation_editor',\n            ref: function ref(node) {\n              explanation_editor = node;\n            }\n          })\n        ),\n        _react2.default.createElement(\n          'button',\n          { onClick: function onClick() {\n              return runTest(_this.props.args);\n            } },\n          'Compile Code'\n        ),\n        _react2.default.createElement(\n          'div',\n          { className: 'command_edit testpane overflow' },\n          _react2.default.createElement(\n            'div',\n            { className: 'label' },\n            'Code preview:'\n          ),\n          _react2.default.createElement(_reactAce2.default, {\n            mode: 'python',\n            width: '100%',\n            maxLines: 15,\n            autoScrollEditorIntoView: 'true',\n            height: '300px',\n            theme: 'github',\n            name: 'code_preview',\n            value: _this.props.preview,\n            contentEditable: false,\n            ref: function ref(node) {\n              code_preview = node;\n            }\n          }),\n          _this.props.error !== \"\" ? _react2.default.createElement(\n            'div',\n            { className: 'errorBox' },\n            _this.props.error\n          ) : _react2.default.createElement('div', null)\n        )\n      );\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  _createClass(CommandEdit, [{\n    key: 'componentDidUpdate',\n    value: function componentDidUpdate() {\n      console.log(\"setting values\", this.props.command);\n      // command_editor.editor.setValue(this.props.command);\n      code_preview.editor.setOptions({\n        readOnly: true,\n        highlightActiveLine: false,\n        highlightGutterLine: false\n      });\n    }\n  }]);\n\n  return CommandEdit;\n}(_react.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    title: state.commandEditPane.title,\n    name: state.commandEditPane.name,\n    args: state.commandEditPane.args,\n    command: state.commandEditPane.command,\n    explanation: state.commandEditPane.explanation,\n    testInputs: state.commandEditPane.testInputs,\n    preview: state.commandEditPane.preview,\n    error: state.commandEditPane.error\n  };\n};\n\nCommandEdit = (0, _reactRedux.connect)(mapStateToProps)(CommandEdit);\n\nexports.default = CommandEdit;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9Db21tYW5kRWRpdC5qcz9jMTBjIl0sIm5hbWVzIjpbImNvbW1hbmRfbmFtZSIsImNvbW1hbmRfdGl0bGUiLCJ0ZXN0X2lucHV0cyIsImFyZ3NfZWRpdG9yIiwiY29tbWFuZF9lZGl0b3IiLCJleHBsYW5hdGlvbl9lZGl0b3IiLCJjb2RlX3ByZXZpZXciLCJhcmdWYWx1ZXMiLCJfIiwibWFwIiwiZXhhbXBsZXNfcmVmIiwidmFsdWUiLCJrZXkiLCJydW5UZXN0IiwiYXJnc19vYmoiLCJjb25zb2xlIiwibG9nIiwibmFtZSIsInRpdGxlIiwiYXJncyIsImV4YW1wbGVzIiwiY29tbWFuZCIsImVkaXRvciIsImdldFZhbHVlIiwiZXhwbGFuYXRpb24iLCJvbkNoYW5nZUlucHV0IiwiZGlzcGF0Y2giLCJpIiwib25DaGFuZ2UiLCJhZGRBcmd1bWVudCIsIkNvbW1hbmRFZGl0IiwicmVuZGVyIiwicHJvcHMiLCJub2RlIiwiYXJnIiwiYXJnX25hbWUiLCJhcmdfc3RyaW5nIiwiYXJnX3R5cGUiLCJwcmV2aWV3IiwiZXJyb3IiLCJzZXRPcHRpb25zIiwicmVhZE9ubHkiLCJoaWdobGlnaHRBY3RpdmVMaW5lIiwiaGlnaGxpZ2h0R3V0dGVyTGluZSIsIm1hcFN0YXRlVG9Qcm9wcyIsInN0YXRlIiwiY29tbWFuZEVkaXRQYW5lIiwidGVzdElucHV0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7QUFHQSxJQUFJQSxxQkFBSjtBQUFBLElBQWtCQyxzQkFBbEI7QUFBQSxJQUFpQ0Msb0JBQWpDO0FBQUEsSUFBOENDLG9CQUE5QztBQUFBLElBQTJEQyx1QkFBM0Q7QUFBQSxJQUEyRUMsMkJBQTNFO0FBQUEsSUFBK0ZDLHFCQUEvRjs7QUFFQSxJQUFNQyxZQUFZLFNBQVpBLFNB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QUFNMEIsTUFBTUMsZUFBTixDQUFzQjNCLElBSEk7QUFJaENFLGFBQVN3QixNQUFNQyxlQUFOLENBQXNCekIsT0FKQztBQUtoQ0csaUJBQWFxQixNQUFNQyxlQUFOLENBQXNCdEIsV0FMSDtBQU1oQ3VCLGdCQUFZRixNQUFNQyxlQUFOLENBQXNCQyxVQU5GO0FBT2hDVCxhQUFTTyxNQUFNQyxlQUFOLENBQXNCUixPQVBDO0FBUWhDQyxXQUFPTSxNQUFNQyxlQUFOLENBQXNCUDtBQVJHLEdBQVo7QUFBQSxDQUF4Qjs7QUFXQVQsY0FBYyx5QkFBUWMsZUFBUixFQUF5QmQsV0FBekIsQ0FBZDs7a0JBRWVBLFciLCJmaWxlIjoiNDkzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcywgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBicmFjZSBmcm9tICdicmFjZSc7XG5pbXBvcnQgQWNlRWRpdG9yIGZyb20gJ3JlYWN0LWFjZSc7XG5pbXBvcnQgQXJndW1lbnRBbm5vdGF0aW9uIGZyb20gJy4vQXJndW1lbnRBbm5vdGF0aW9uJztcbmltcG9ydCB7IEV4YW1wbGVzRWRpdG9yLCBleGFtcGxlVmFsdWVzIH0gZnJvbSAnLi9FeGFtcGxlc0VkaXRvcic7XG5pbXBvcnQgeyB1cGRhdGVDb2RlRWRpdG9yLCBhZGRDb21tYW5kQXJnIH0gZnJvbSAnLi4vYWN0aW9ucy9pbmRleC5qcyc7XG5pbXBvcnQgeyBkb1NlYXJjaCwgdXBkYXRlSGludCwgdXBkYXRlRG9jcywgdGVzdEZ1bmN0aW9uIH0gZnJvbSAnLi4vYXBpX2NhbGxzL3B5dGhvbi5qcyc7XG5pbXBvcnQgU3BsaXRQYW5lIGZyb20gJ3JlYWN0LXNwbGl0LXBhbmUnO1xuXG5pbXBvcnQgJ2JyYWNlL21vZGUvcHl0aG9uJztcbmltcG9ydCAnYnJhY2UvdGhlbWUvZ2l0aHViJztcblxuXG5sZXQgY29tbWFuZF9uYW1lLCBjb21tYW5kX3RpdGxlLCB0ZXN0X2lucHV0cywgYXJnc19lZGl0b3IsIGNvbW1hbmRfZWRpdG9yLCBleHBsYW5hdGlvbl9lZGl0b3IsIGNvZGVfcHJldmlldztcblxuY29uc3QgYXJnVmFsdWVzID0gKCkgPT4gXy5tYXAoZXhhbXBsZXNfcmVmLCAodmFsdWUsIGtleSkgPT4gdmFsdWUudmFsdWUpO1xuXG5jb25zdCBydW5UZXN0ID0gKGFyZ3Nfb2JqKSA9PiB7XG4gIGNvbnNvbGUubG9nKGNvbW1hbmRfbmFtZSk7XG4gIGNvbnNvbGUubG9nKFwicnVubmluZ1wiLCBjb21tYW5kX25hbWUudmFsdWUpXG4gIGNvbnNvbGUubG9nKFwicnVubmluZ1wiLCBjb21tYW5kX3RpdGxlLnZhbHVlKVxuICB0ZXN0RnVuY3Rpb24oe1xuICAgICAgbmFtZTogY29tbWFuZF9uYW1lLnZhbHVlLFxuICAgICAgdGl0bGU6Y29tbWFuZF90aXRsZS52YWx1ZSxcbiAgICAgIGFyZ3M6IGFyZ3Nfb2JqLFxuICAgICAgZXhhbXBsZXM6IGV4YW1wbGVWYWx1ZXMoKSxcbiAgICAgIGNvbW1hbmQ6Y29tbWFuZF9lZGl0b3IuZWRpdG9yLmdldFZhbHVlKCksXG4gICAgICBleHBsYW5hdGlvbjpleHBsYW5hdGlvbl9lZGl0b3IuZWRpdG9yLmdldFZhbHVlKClcbiAgfSk7XG59O1xuXG5jb25zdCBvbkNoYW5nZUlucHV0ID0gKGRpc3BhdGNoLCBuYW1lLCBpKSA9PiB7XG4gICAgY29uc29sZS5sb2cobmFtZSwgaSk7XG4gICAgY29uc29sZS5sb2coaS52YWx1ZSk7XG4gICAgY29uc29sZS5sb2coXCJzZXR0aW5nXCIsbmFtZSxpLnZhbHVlKTtcbiAgICBkaXNwYXRjaCh1cGRhdGVDb2RlRWRpdG9yKG5hbWUsIGkudmFsdWUpKTtcbiAgfTtcblxuXG5jb25zdCBvbkNoYW5nZSA9IChkaXNwYXRjaCwgbmFtZSkgPT5cbiAgKHZhbHVlKSA9PiB7XG4gICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgIGNvbnNvbGUubG9nKFwic2V0dGluZ1wiLG5hbWUsdmFsdWUpO1xuICAgIGRpc3BhdGNoKHVwZGF0ZUNvZGVFZGl0b3IobmFtZSwgdmFsdWUpKTtcbiAgfTtcblxuY29uc3QgYWRkQXJndW1lbnQgPSAoZGlzcGF0Y2gpID0+XG4gICgpID0+IHtcbiAgICBkaXNwYXRjaChhZGRDb21tYW5kQXJnKCkpO1xuICB9O1xuXG5jbGFzcyBDb21tYW5kRWRpdCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2V0dGluZyB2YWx1ZXNcIiwgdGhpcy5wcm9wcy5jb21tYW5kKTtcbiAgICAgICAgLy8gY29tbWFuZF9lZGl0b3IuZWRpdG9yLnNldFZhbHVlKHRoaXMucHJvcHMuY29tbWFuZCk7XG4gICAgICAgIGNvZGVfcHJldmlldy5lZGl0b3Iuc2V0T3B0aW9ucyh7XG4gICAgICAgICAgICByZWFkT25seTogdHJ1ZSxcbiAgICAgICAgICAgIGhpZ2hsaWdodEFjdGl2ZUxpbmU6IGZhbHNlLFxuICAgICAgICAgICAgaGlnaGxpZ2h0R3V0dGVyTGluZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyID0gKCkgPT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRfZWRpdFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm92ZXJmbG93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYmVsXCI+Q29tbWFuZCBuYW1lOjwvZGl2PlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJlLmcuLCBBZGRUd29OdW1iZXJzXCIgb25DaGFuZ2U9eygpID0+IG9uQ2hhbmdlSW5wdXQodGhpcy5wcm9wcy5kaXNwYXRjaCwgJ25hbWUnLCBjb21tYW5kX25hbWUpfSByZWY9e25vZGUgPT4ge2NvbW1hbmRfbmFtZSA9IG5vZGU7fX0gdmFsdWU9e3RoaXMucHJvcHMubmFtZX0gLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiZWxcIj5Db21tYW5kIHRpdGxlOjwvZGl2PlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJlLmcuLCBhZGQge3h9IGFuZCB7eX1cIiBvbkNoYW5nZT17KCkgPT4gb25DaGFuZ2VJbnB1dCh0aGlzLnByb3BzLmRpc3BhdGNoLCAndGl0bGUnLCBjb21tYW5kX3RpdGxlKX0gcmVmPXtub2RlID0+IHtjb21tYW5kX3RpdGxlID0gbm9kZTt9fSB2YWx1ZT17dGhpcy5wcm9wcy50aXRsZX0vPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYWJlbFwiPkFyZ3VtZW50czo8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17YWRkQXJndW1lbnQodGhpcy5wcm9wcy5kaXNwYXRjaCl9PkFkZCBBcmd1bWVudDwvYnV0dG9uPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcmd1bWVudHNcIj5cbiAgICAgICAgICAgICAge3RoaXMucHJvcHMuYXJncy5tYXAoKGFyZyxpKSA9PiA8QXJndW1lbnRBbm5vdGF0aW9uIGlkPXtpfSBuYW1lPXthcmcuYXJnX25hbWV9IHN0cmluZz17YXJnLmFyZ19zdHJpbmd9IGFyZ190PXthcmcuYXJnX3R5cGV9Lz4pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYmVsXCI+RXhhbXBsZXM8L2Rpdj5cbiAgICAgICAgICAgIDxFeGFtcGxlc0VkaXRvciAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYWJlbFwiPlRoZSBweXRob24gY29tbWFuZDo8L2Rpdj5cbiAgICAgICAgICAgIDxBY2VFZGl0b3JcbiAgICAgICAgICAgICAgbW9kZT1cInB5dGhvblwiXG4gICAgICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgICAgICAgIGhlaWdodD1cIjMwMHB4XCJcbiAgICAgICAgICAgICAgYXV0b1Njcm9sbEVkaXRvckludG9WaWV3PVwidHJ1ZVwiXG4gICAgICAgICAgICAgIG1heExpbmVzPXsxNX1cbiAgICAgICAgICAgICAgdGhlbWU9XCJnaXRodWJcIlxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2UodGhpcy5wcm9wcy5kaXNwYXRjaCwgJ2NvbW1hbmQnKX1cbiAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuY29tbWFuZH1cbiAgICAgICAgICAgICAgbmFtZT1cImNvbW1hbmRfZWRpdG9yXCJcbiAgICAgICAgICAgICAgcmVmPXtub2RlID0+IHtjb21tYW5kX2VkaXRvciA9IG5vZGU7fX1cblxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiZWxcIj5UaGUgZXhwbGFuYXRpb246PC9kaXY+XG4gICAgICAgICAgICA8QWNlRWRpdG9yXG4gICAgICAgICAgICAgIG1vZGU9XCJweXRob25cIlxuICAgICAgICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICAgICAgICBtYXhMaW5lcz17MTV9XG4gICAgICAgICAgICAgIGF1dG9TY3JvbGxFZGl0b3JJbnRvVmlldz1cInRydWVcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCIzMDBweFwiXG4gICAgICAgICAgICAgIHRoZW1lPVwiZ2l0aHViXCJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlKHRoaXMucHJvcHMuZGlzcGF0Y2gsICdleHBsYW5hdGlvbicpfVxuICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5leHBsYW5hdGlvbn1cbiAgICAgICAgICAgICAgbmFtZT1cImV4cGxhbmF0aW9uX2VkaXRvclwiXG4gICAgICAgICAgICAgIHJlZj17bm9kZSA9PiB7ZXhwbGFuYXRpb25fZWRpdG9yID0gbm9kZTt9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHJ1blRlc3QodGhpcy5wcm9wcy5hcmdzKX0+Q29tcGlsZSBDb2RlPC9idXR0b24+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21tYW5kX2VkaXQgdGVzdHBhbmUgb3ZlcmZsb3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiZWxcIj5Db2RlIHByZXZpZXc6PC9kaXY+XG4gICAgICAgICAgICA8QWNlRWRpdG9yXG4gICAgICAgICAgICAgIG1vZGU9XCJweXRob25cIlxuICAgICAgICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICAgICAgICBtYXhMaW5lcz17MTV9XG4gICAgICAgICAgICAgIGF1dG9TY3JvbGxFZGl0b3JJbnRvVmlldz1cInRydWVcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCIzMDBweFwiXG4gICAgICAgICAgICAgIHRoZW1lPVwiZ2l0aHViXCJcbiAgICAgICAgICAgICAgbmFtZT1cImNvZGVfcHJldmlld1wiXG4gICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLnByZXZpZXd9XG4gICAgICAgICAgICAgIGNvbnRlbnRFZGl0YWJsZSA9IHtmYWxzZX1cbiAgICAgICAgICAgICAgcmVmPXtub2RlID0+IHtjb2RlX3ByZXZpZXcgPSBub2RlO319XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAge3RoaXMucHJvcHMuZXJyb3IgIT09IFwiXCIgPyA8ZGl2IGNsYXNzTmFtZT1cImVycm9yQm94XCI+e3RoaXMucHJvcHMuZXJyb3J9PC9kaXY+IDogPGRpdj48L2Rpdj59XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cblxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+ICh7XG4gICAgdGl0bGU6IHN0YXRlLmNvbW1hbmRFZGl0UGFuZS50aXRsZSxcbiAgICBuYW1lOiBzdGF0ZS5jb21tYW5kRWRpdFBhbmUubmFtZSxcbiAgICBhcmdzOiBzdGF0ZS5jb21tYW5kRWRpdFBhbmUuYXJncyxcbiAgICBjb21tYW5kOiBzdGF0ZS5jb21tYW5kRWRpdFBhbmUuY29tbWFuZCxcbiAgICBleHBsYW5hdGlvbjogc3RhdGUuY29tbWFuZEVkaXRQYW5lLmV4cGxhbmF0aW9uLFxuICAgIHRlc3RJbnB1dHM6IHN0YXRlLmNvbW1hbmRFZGl0UGFuZS50ZXN0SW5wdXRzLFxuICAgIHByZXZpZXc6IHN0YXRlLmNvbW1hbmRFZGl0UGFuZS5wcmV2aWV3LFxuICAgIGVycm9yOiBzdGF0ZS5jb21tYW5kRWRpdFBhbmUuZXJyb3Jcbn0pO1xuXG5Db21tYW5kRWRpdCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShDb21tYW5kRWRpdCk7XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1hbmRFZGl0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2NvbXBvbmVudHMvQ29tbWFuZEVkaXQuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ })

})