webpackHotUpdate(0,{

/***/ 433:
/***/ (function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _react = __webpack_require__(2);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Message = __webpack_require__(441);\n\nvar _Message2 = _interopRequireDefault(_Message);\n\nvar _VisualMessage = __webpack_require__(450);\n\nvar _VisualMessage2 = _interopRequireDefault(_VisualMessage);\n\nvar _DataMessage = __webpack_require__(434);\n\nvar _DataMessage2 = _interopRequireDefault(_DataMessage);\n\nvar _CodeMessage = __webpack_require__(430);\n\nvar _CodeMessage2 = _interopRequireDefault(_CodeMessage);\n\nvar _ExplainMessage = __webpack_require__(436);\n\nvar _ExplainMessage2 = _interopRequireDefault(_ExplainMessage);\n\nvar _FilePickMessage = __webpack_require__(437);\n\nvar _FilePickMessage2 = _interopRequireDefault(_FilePickMessage);\n\nvar _CollectionMessage = __webpack_require__(431);\n\nvar _CollectionMessage2 = _interopRequireDefault(_CollectionMessage);\n\nvar _TableSelectMessage = __webpack_require__(447);\n\nvar _TableSelectMessage2 = _interopRequireDefault(_TableSelectMessage);\n\nvar _VegaMessage = __webpack_require__(1419);\n\nvar _VegaMessage2 = _interopRequireDefault(_VegaMessage);\n\nvar _Title = __webpack_require__(448);\n\nvar _Title2 = _interopRequireDefault(_Title);\n\nvar _types = __webpack_require__(59);\n\nvar proptypes = _interopRequireWildcard(_types);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n// import SemanticView from '../components/SemanticView';\n\nvar Conversation = function (_Component) {\n    _inherits(Conversation, _Component);\n\n    function Conversation() {\n        var _ref;\n\n        var _temp, _this, _ret;\n\n        _classCallCheck(this, Conversation);\n\n        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n            args[_key] = arguments[_key];\n        }\n\n        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Conversation.__proto__ || Object.getPrototypeOf(Conversation)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {\n            return _react2.default.createElement(\n                'div',\n                { className: 'innerConversation' },\n                _react2.default.createElement(_Title2.default, { text: _this.props.title, args: _this.props.args, id: _this.props.id }),\n                _this.props.messages.map(function (message) {\n                    var content = void 0;\n                    console.log('INCOMING', message.text);\n                    if (_typeof(message.text) === 'object' && message.text.type === 'image') {\n                        content = _react2.default.createElement(_VisualMessage2.default, { key: message.id, origin: message.origin, content: message.text.value, hidden: _this.props.hidden });\n                    } else if (_typeof(message.text) === 'object' && message.text.type === 'data') {\n                        content = _react2.default.createElement(_DataMessage2.default, { key: message.id, origin: message.origin, text: message.text.value, hidden: _this.props.hidden });\n                    } else if (_typeof(message.text) === 'object' && message.text.type === 'explain') {\n                        content = _react2.default.createElement(_ExplainMessage2.default, { key: message.id, origin: message.origin, text: message.text.value, hidden: _this.props.hidden });\n                    } else if (_typeof(message.text) === 'object' && message.text.type === 'file_pick') {\n                        content = _react2.default.createElement(_FilePickMessage2.default, { key: message.id, active: _this.props.active, origin: message.origin, text: message.text.value, hidden: _this.props.hidden });\n                    } else if (_typeof(message.text) === 'object' && message.text.type === 'code') {\n                        content = _react2.default.createElement(_CodeMessage2.default, { key: message.id, origin: message.origin, text: message.text.value, hidden: _this.props.hidden });\n                    } else if (_typeof(message.text) === 'object' && message.text.type === 'collection') {\n                        content = _react2.default.createElement(_CollectionMessage2.default, { key: message.id, origin: message.origin, text: message.text.value, hidden: _this.props.hidden });\n                    } else if (_typeof(message.text) === 'object' && message.text.type === 'collection_select') {\n                        content = _react2.default.createElement(_TableSelectMessage2.default, { key: message.id, onlyOne: false, active: _this.props.active, origin: message.origin, text: message.text.value, hidden: _this.props.hidden });\n                    } else if (_typeof(message.text) === 'object' && message.text.type === 'collection_select_one') {\n                        content = _react2.default.createElement(_TableSelectMessage2.default, { key: message.id, onlyOne: true, active: _this.props.active, origin: message.origin, text: message.text.value, hidden: _this.props.hidden });\n                    } else if (_typeof(message.text) === 'object' && message.text.type === 'vega') {\n                        content = _react2.default.createElement(_VegaMessage2.default, { key: message.id, origin: message.origin, spec: message.text.spec, data: message.text.data, hidden: _this.props.hidden });\n                    } else {\n                        content = _react2.default.createElement(_Message2.default, { key: message.id, origin: message.origin, text: message.text, hidden: _this.props.hidden });\n                    }\n                    return content;\n                })\n            );\n        }, _temp), _possibleConstructorReturn(_this, _ret);\n    }\n\n    return Conversation;\n}(_react.Component);\n\nConversation.propTypes = {\n    messages: proptypes.messagesType,\n    title: _react.PropTypes.any,\n    args: _react.PropTypes.any,\n    id: _react.PropTypes.int,\n    hidden: _react.PropTypes.bool,\n    active: _react.PropTypes.bool\n};\n\nexports.default = Conversation;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9Db252ZXJzYXRpb24uanM/Yjg5NiJdLCJuYW1lcyI6WyJwcm9wdHlwZXMiLCJDb252ZXJzYXRpb24iLCJyZW5kZXIiLCJwcm9wcyIsInRpdGxlIiwiYXJncyIsImlkIiwibWVzc2FnZXMiLCJtYXAiLCJjb250ZW50IiwiY29uc29sZSIsImxvZyIsIm1lc3NhZ2UiLCJ0ZXh0IiwidHlwZSIsIm9yaWdpbiIsInZhbHVlIiwiaGlkZGVuIiwiYWN0aXZlIiwic3BlYyIsImRhdGEiLCJwcm9wVHlwZXMiLCJtZXNzYWdlc1R5cGUiLCJhbnkiLCJpbnQiLCJib29sIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7SUFBWUEsUzs7Ozs7Ozs7Ozs7O0FBRVo7O0lBRU1DLFk7Ozs7Ozs7Ozs7Ozs7O3NNQUVGQyxNLEdBQVM7QUFBQSxtQkFDTDtBQUFBO0FBQUEsa0JBQUssV0FBVSxtQkFBZjtBQUNJLGlFQUFPLE1BQU0sTUFBS0MsS0FBTCxDQUFXQyxLQUF4QixFQUErQixNQUFNLE1BQUtELEtBQUwsQ0FBV0UsSUFBaEQsRUFBc0QsSUFBSSxNQUFLRixLQUFMLENBQVdHLEVBQXJFLEdBREo7QUFFSyxzQkFBS0gsS0FBTCxDQUFXSSxRQUFYLENBQW9CQyxHQUFwQixDQUF3QixtQkFBVztBQUNoQyx3QkFBSUMsZ0JBQUo7QUFDQUMsNEJBQVFDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCQyxRQUFRQyxJQUFoQztBQUNBLHdCQUFHLFFBQU9ELFFBQVFDLElBQWYsTUFBd0IsUUFBeEIsSUFBb0NELFFBQVFDLElBQVIsQ0FBYUMsSUFBYixLQUFzQixPQUE3RCxFQUFzRTtBQUNsRUwsa0NBQVUseURBQWUsS0FBS0csUUFBUU4sRUFBNUIsRUFBZ0MsUUFBUU0sUUFBUUcsTUFB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QUExSCxFQUFpSSxRQUFRLE1BQUtiLEtBQUwsQ0FBV2MsTUFBcEosR0FBVjtBQUNQLHFCQUZNLE1BRUEsSUFBSSxRQUFPTCxRQUFRQyxJQUFmLE1BQXdCLFFBQXhCLElBQW9DRCxRQUFRQyxJQUFSLENBQWFDLElBQWIsS0FBc0IsTUFBOUQsRUFBc0U7QUFDckVMLGtDQUFVLHVEQUFhLEtBQUtHLFFBQVFOLEVBQTFCLEVBQThCLFFBQVFNLFFBQVFHLE1BQTlDLEVBQXNELE1BQU1ILFFBQVFDLElBQVIsQ0FBYU0sSUFBekUsRUFBK0UsTUFBTVAsUUFBUUMsSUFBUixDQUFhTyxJQUFsRyxFQUF3RyxRQUFRLE1BQUtqQixLQUFMLENBQVdjLE1BQTNILEdBQVY7QUFDUCxxQkFGTSxNQUVBO0FBQ0hSLGtDQUFVLG1EQUFTLEtBQUtHLFFBQVFOLEVBQXRCLEVBQTBCLFFBQVFNLFFBQVFHLE1BQTFDLEVBQWtELE1BQU1ILFFBQVFDLElBQWhFLEVBQXNFLFFBQVEsTUFBS1YsS0FBTCxDQUFXYyxNQUF6RixHQUFWO0FBQ0g7QUFDRCwyQkFBT1IsT0FBUDtBQUNILGlCQXpCQTtBQUZMLGFBREs7QUFBQSxTOzs7Ozs7QUFnQ2JSLGFBQWFvQixTQUFiLEdBQXlCO0FBQ3JCZCxjQUFVUCxVQUFVc0IsWUFEQztBQUVyQmxCLFdBQU8saUJBQVVtQixHQUZJO0FBR3JCbEIsVUFBTSxpQkFBVWtCLEdBSEs7QUFJckJqQixRQUFJLGlCQUFVa0IsR0FKTztBQUtyQlAsWUFBUSxpQkFBVVEsSUFMRztBQU1yQlAsWUFBUSxpQkFBVU87QUFORyxDQUF6Qjs7a0JBU2V4QixZIiwiZmlsZSI6IjQzMy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMsIENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBNZXNzYWdlIGZyb20gJy4vTWVzc2FnZSc7XG5pbXBvcnQgVmlzdWFsTWVzc2FnZSBmcm9tICcuL1Zpc3VhbE1lc3NhZ2UnO1xuaW1wb3J0IERhdGFNZXNzYWdlIGZyb20gJy4vRGF0YU1lc3NhZ2UnO1xuaW1wb3J0IENvZGVNZXNzYWdlIGZyb20gJy4vQ29kZU1lc3NhZ2UnO1xuaW1wb3J0IEV4cGxhaW5NZXNzYWdlIGZyb20gJy4vRXhwbGFpbk1lc3NhZ2UnO1xuaW1wb3J0IEZpbGVQaWNrTWVzc2FnZSBmcm9tICcuL0ZpbGVQaWNrTWVzc2FnZSc7XG5pbXBvcnQgQ29sbGVjdGlvbk1lc3NhZ2UgZnJvbSAnLi9Db2xsZWN0aW9uTWVzc2FnZSc7XG5pbXBvcnQgVGFibGVTZWxlY3RNZXNzYWdlIGZyb20gJy4vVGFibGVTZWxlY3RNZXNzYWdlJztcbmltcG9ydCBWZWdhTWVzc2FnZSBmcm9tICcuL1ZlZ2FNZXNzYWdlJztcbmltcG9ydCBUaXRsZSBmcm9tICcuL1RpdGxlJztcbmltcG9ydCAqIGFzIHByb3B0eXBlcyBmcm9tICcuLi9wcm9wdHlwZXMvdHlwZXMnO1xuXG4vLyBpbXBvcnQgU2VtYW50aWNWaWV3IGZyb20gJy4uL2NvbXBvbmVudHMvU2VtYW50aWNWaWV3JztcblxuY2xhc3MgQ29udmVyc2F0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAgIHJlbmRlciA9ICgpID0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5uZXJDb252ZXJzYXRpb25cIj5cbiAgICAgICAgICAgIDxUaXRsZSB0ZXh0PXt0aGlzLnByb3BzLnRpdGxlfSBhcmdzPXt0aGlzLnByb3BzLmFyZ3N9IGlkPXt0aGlzLnByb3BzLmlkfS8+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5tZXNzYWdlcy5tYXAobWVzc2FnZSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0lOQ09NSU5HJywgbWVzc2FnZS50ZXh0KTtcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgbWVzc2FnZS50ZXh0ID09PSAnb2JqZWN0JyAmJiBtZXNzYWdlLnRleHQudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gPFZpc3VhbE1lc3NhZ2Uga2V5PXttZXNzYWdlLmlkfSBvcmlnaW49e21lc3NhZ2Uub3JpZ2lufSBjb250ZW50PXttZXNzYWdlLnRleHQudmFsdWV9IGhpZGRlbj17dGhpcy5wcm9wcy5oaWRkZW59Lz47XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWVzc2FnZS50ZXh0ID09PSAnb2JqZWN0JyAmJiBtZXNzYWdlLnRleHQudHlwZSA9PT0gJ2RhdGEnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSA8RGF0YU1lc3NhZ2Uga2V5PXttZXNzYWdlLmlkfSBvcmlnaW49e21lc3NhZ2Uub3JpZ2lufSB0ZXh0PXttZXNzYWdlLnRleHQudmFsdWV9IGhpZGRlbj17dGhpcy5wcm9wcy5oaWRkZW59Lz47XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWVzc2FnZS50ZXh0ID09PSAnb2JqZWN0JyAmJiBtZXNzYWdlLnRleHQudHlwZSA9PT0gJ2V4cGxhaW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSA8RXhwbGFpbk1lc3NhZ2Uga2V5PXttZXNzYWdlLmlkfSBvcmlnaW49e21lc3NhZ2Uub3JpZ2lufSB0ZXh0PXttZXNzYWdlLnRleHQudmFsdWV9IGhpZGRlbj17dGhpcy5wcm9wcy5oaWRkZW59Lz47XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWVzc2FnZS50ZXh0ID09PSAnb2JqZWN0JyAmJiBtZXNzYWdlLnRleHQudHlwZSA9PT0gJ2ZpbGVfcGljaycpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IDxGaWxlUGlja01lc3NhZ2Uga2V5PXttZXNzYWdlLmlkfSBhY3RpdmU9e3RoaXMucHJvcHMuYWN0aXZlfSBvcmlnaW49e21lc3NhZ2Uub3JpZ2lufSB0ZXh0PXttZXNzYWdlLnRleHQudmFsdWV9IGhpZGRlbj17dGhpcy5wcm9wcy5oaWRkZW59Lz47XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWVzc2FnZS50ZXh0ID09PSAnb2JqZWN0JyAmJiBtZXNzYWdlLnRleHQudHlwZSA9PT0gJ2NvZGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSA8Q29kZU1lc3NhZ2Uga2V5PXttZXNzYWdlLmlkfSBvcmlnaW49e21lc3NhZ2Uub3JpZ2lufSB0ZXh0PXttZXNzYWdlLnRleHQudmFsdWV9IGhpZGRlbj17dGhpcy5wcm9wcy5oaWRkZW59Lz47XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWVzc2FnZS50ZXh0ID09PSAnb2JqZWN0JyAmJiBtZXNzYWdlLnRleHQudHlwZSA9PT0gJ2NvbGxlY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gPENvbGxlY3Rpb25NZXNzYWdlIGtleT17bWVzc2FnZS5pZH0gb3JpZ2luPXttZXNzYWdlLm9yaWdpbn0gdGV4dD17bWVzc2FnZS50ZXh0LnZhbHVlfSBoaWRkZW49e3RoaXMucHJvcHMuaGlkZGVufS8+O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1lc3NhZ2UudGV4dCA9PT0gJ29iamVjdCcgJiYgbWVzc2FnZS50ZXh0LnR5cGUgPT09ICdjb2xsZWN0aW9uX3NlbGVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSA8VGFibGVTZWxlY3RNZXNzYWdlIGtleT17bWVzc2FnZS5pZH0gb25seU9uZT17ZmFsc2V9IGFjdGl2ZT17dGhpcy5wcm9wcy5hY3RpdmV9IG9yaWdpbj17bWVzc2FnZS5vcmlnaW59IHRleHQ9e21lc3NhZ2UudGV4dC52YWx1ZX0gaGlkZGVuPXt0aGlzLnByb3BzLmhpZGRlbn0vPjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBtZXNzYWdlLnRleHQgPT09ICdvYmplY3QnICYmIG1lc3NhZ2UudGV4dC50eXBlID09PSAnY29sbGVjdGlvbl9zZWxlY3Rfb25lJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IDxUYWJsZVNlbGVjdE1lc3NhZ2Uga2V5PXttZXNzYWdlLmlkfSBvbmx5T25lPXt0cnVlfSBhY3RpdmU9e3RoaXMucHJvcHMuYWN0aXZlfSBvcmlnaW49e21lc3NhZ2Uub3JpZ2lufSB0ZXh0PXttZXNzYWdlLnRleHQudmFsdWV9IGhpZGRlbj17dGhpcy5wcm9wcy5oaWRkZW59Lz47XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWVzc2FnZS50ZXh0ID09PSAnb2JqZWN0JyAmJiBtZXNzYWdlLnRleHQudHlwZSA9PT0gJ3ZlZ2EnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gPFZlZ2FNZXNzYWdlIGtleT17bWVzc2FnZS5pZH0gb3JpZ2luPXttZXNzYWdlLm9yaWdpbn0gc3BlYz17bWVzc2FnZS50ZXh0LnNwZWN9IGRhdGE9e21lc3NhZ2UudGV4dC5kYXRhfSBoaWRkZW49e3RoaXMucHJvcHMuaGlkZGVufS8+O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSA8TWVzc2FnZSBrZXk9e21lc3NhZ2UuaWR9IG9yaWdpbj17bWVzc2FnZS5vcmlnaW59IHRleHQ9e21lc3NhZ2UudGV4dH0gaGlkZGVuPXt0aGlzLnByb3BzLmhpZGRlbn0vPjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+O1xufVxuXG5Db252ZXJzYXRpb24ucHJvcFR5cGVzID0ge1xuICAgIG1lc3NhZ2VzOiBwcm9wdHlwZXMubWVzc2FnZXNUeXBlLFxuICAgIHRpdGxlOiBQcm9wVHlwZXMuYW55LFxuICAgIGFyZ3M6IFByb3BUeXBlcy5hbnksXG4gICAgaWQ6IFByb3BUeXBlcy5pbnQsXG4gICAgaGlkZGVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBhY3RpdmU6IFByb3BUeXBlcy5ib29sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb252ZXJzYXRpb247XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvY29tcG9uZW50cy9Db252ZXJzYXRpb24uanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ }),

/***/ 1419:
/***/ (function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(2);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactVegaLite = __webpack_require__(1377);\n\nvar _reactVegaLite2 = _interopRequireDefault(_reactVegaLite);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar spec = {\n  \"description\": \"A simple bar chart with embedded data.\",\n  \"mark\": \"bar\",\n  \"encoding\": {\n    \"x\": { \"field\": \"a\", \"type\": \"ordinal\" },\n    \"y\": { \"field\": \"b\", \"type\": \"quantitative\" }\n  }\n};\n\nvar barData = {\n  \"values\": [{ \"a\": \"A\", \"b\": 20 }, { \"a\": \"B\", \"b\": 34 }, { \"a\": \"C\", \"b\": 55 }, { \"a\": \"D\", \"b\": 19 }, { \"a\": \"E\", \"b\": 40 }, { \"a\": \"F\", \"b\": 34 }, { \"a\": \"G\", \"b\": 91 }, { \"a\": \"H\", \"b\": 78 }, { \"a\": \"I\", \"b\": 25 }]\n};\n\nvar VegaMessage = function VegaMessage(_ref) {\n  var origin = _ref.origin,\n      spec = _ref.spec,\n      data = _ref.data;\n  return _react2.default.createElement(\n    'div',\n    { className: origin === 'iris' ? 'message left' : 'message right' },\n    _react2.default.createElement(_reactVegaLite2.default, { spec: spec, data: barData })\n  );\n};\n\nexports.default = VegaMessage;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9WZWdhTWVzc2FnZS5qcz82Y2FhIl0sIm5hbWVzIjpbInNwZWMiLCJiYXJEYXRhIiwiVmVnYU1lc3NhZ2UiLCJvcmlnaW4iLCJkYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxPQUFPO0FBQ1gsaUJBQWUsd0NBREo7QUFFWCxVQUFRLEtBRkc7QUFHWCxjQUFZO0FBQ1YsU0FBSyxFQUFDLFNBQVMsR0FBVixFQUFlLFFBQVEsU0FBdkIsRUFESztBQUVWLFNBQUssRUFBQyxTQUFTLEdBQVYsRUFBZSxRQUFRLGNBQXZCO0FBRks7QUFIRCxDQUFiOztBQVNBLElBQU1DLFVBQVU7QUFDZCxZQUFVLENBQ1IsRUFBQyxLQUFLLEdBQU4sRUFBVSxLQUFLLEVBQWYsRUFEUSxFQUNZLEVBQUMsS0FBSyxHQUFOLEVBQVUsS0FBSyxFQUFmLEVBRFosRUFDZ0MsRUFBQyxLQUFLLEdBQU4sRUFBVSxLQUFLLEVBQWYsRUFEaEMsRUFFUixFQUFDLEtBQUssR0FBTixFQUFVLEtBQUssRUFBZixFQUZRLEVBRVksRUFBQyxLQUFLLEdBQU4sRUFBVSxLQUFLLEVBQWYsRUFGWixFQUVnQyxFQUFDLEtBQUssR0FBTixFQUFVLEtBQUssRUFBZixFQUZoQyxFQUdSLEVBQUMsS0FBSyxHQUFOLEVBQVUsS0FBSyxFQUFmLEVBSFEsRUFHWSxFQUFDLEtBQUssR0FBTixFQUFVLEtBQUssRUFBZixFQUhaLEVBR2dDLEVBQUMsS0FBSyxHQUFOLEVBQVUsS0FBSyxFQUFmLEVBSGhDO0FBREksQ0FBaEI7O0FBUUEsSUFBTUMsY0FBYyxTQUFkQSxXQUFjO0FBQUEsTUFBR0MsTUFBSCxRQUFHQSxNQUFIO0FBQUEsTUFBV0gsSUFBWCxRQUFXQSxJQUFYO0FBQUEsTUFBaUJJLElBQWpCLFFBQWlCQSxJQUFqQjtBQUFBLFNBQ2hCO0FBQUE7QUFBQSxNQUFLLFdBQWFELFdBQVcsTUFBWCxHQUFvQixjQUFwQixHQUFxQyxlQUF2RDtBQUNJLDZEQUFVLE1BQU1ILElBQWhCLEVBQXNCLE1BQU1DLE9BQTVCO0FBREosR0FEZ0I7QUFBQSxDQUFwQjs7a0JBTWVDLFciLCJmaWxlIjoiMTQxOS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVmVnYUxpdGUgZnJvbSAncmVhY3QtdmVnYS1saXRlJztcblxuY29uc3Qgc3BlYyA9IHtcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkEgc2ltcGxlIGJhciBjaGFydCB3aXRoIGVtYmVkZGVkIGRhdGEuXCIsXG4gIFwibWFya1wiOiBcImJhclwiLFxuICBcImVuY29kaW5nXCI6IHtcbiAgICBcInhcIjoge1wiZmllbGRcIjogXCJhXCIsIFwidHlwZVwiOiBcIm9yZGluYWxcIn0sXG4gICAgXCJ5XCI6IHtcImZpZWxkXCI6IFwiYlwiLCBcInR5cGVcIjogXCJxdWFudGl0YXRpdmVcIn1cbiAgfVxufTtcblxuY29uc3QgYmFyRGF0YSA9IHtcbiAgXCJ2YWx1ZXNcIjogW1xuICAgIHtcImFcIjogXCJBXCIsXCJiXCI6IDIwfSwge1wiYVwiOiBcIkJcIixcImJcIjogMzR9LCB7XCJhXCI6IFwiQ1wiLFwiYlwiOiA1NX0sXG4gICAge1wiYVwiOiBcIkRcIixcImJcIjogMTl9LCB7XCJhXCI6IFwiRVwiLFwiYlwiOiA0MH0sIHtcImFcIjogXCJGXCIsXCJiXCI6IDM0fSxcbiAgICB7XCJhXCI6IFwiR1wiLFwiYlwiOiA5MX0sIHtcImFcIjogXCJIXCIsXCJiXCI6IDc4fSwge1wiYVwiOiBcIklcIixcImJcIjogMjV9XG4gIF1cbn07XG5cbmNvbnN0IFZlZ2FNZXNzYWdlID0gKHsgb3JpZ2luLCBzcGVjLCBkYXRhIH0pID0+XG4gICAgPGRpdiBjbGFzc05hbWUgPSB7b3JpZ2luID09PSAnaXJpcycgPyAnbWVzc2FnZSBsZWZ0JyA6ICdtZXNzYWdlIHJpZ2h0J30+XG4gICAgICAgIDxWZWdhTGl0ZSBzcGVjPXtzcGVjfSBkYXRhPXtiYXJEYXRhfSAvPlxuICAgIDwvZGl2PjtcblxuXG5leHBvcnQgZGVmYXVsdCBWZWdhTWVzc2FnZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9jb21wb25lbnRzL1ZlZ2FNZXNzYWdlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ })

})