import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Conversation from '../components/Conversation';
import { PredictionStrip } from '../components/PredictionStrip';
import { input, InputBox } from './InputBox';
import { postMessages, getVariables, getHistory, setHistory, updateHint } from '../api_calls/python';

// const flatten = list => list.reduce(
//     (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
// );

// const flattenMessages = (history, convo) => {
//     const pastMessages = history.map(m => { return m.messages; });
//     console.log('stuff');
//     console.log(history);
//     console.log(pastMessages);
//     console.log(flatten(pastMessages).concat(convo.messages));
//     return flatten(pastMessages).concat(convo.messages);
// };

let messageDOM;

class ConversationPane extends Component {

    componentDidMount() {
        console.log('hello');
        getVariables();
        // get history from the server on load
        getHistory();

    }

    componentDidUpdate() {
        // Notify Iris when the message list is updated
        // moved this out of the reducer
        messageDOM.scrollTop = messageDOM.scrollHeight;
        updateHint(input.value);


        const { messages, state, conversation } = this.props;
        // console.log(messages);
        if (messages.length > 0 && messages[messages.length - 1].origin !== 'iris') {
            postMessages(messages, state, conversation);
        }
        if (messages.length === 0 || messages[messages.length - 1].origin === 'iris') {
            // we're going to save message history on the server whenever iris sends a message back
            setHistory(messages, state, conversation);
        }
    }

    render = () =>
        <div className="left_pane">
            <div className="content_box" id="message_pane" ref={(node) => { messageDOM = node; }}>
                { this.props.history.map(convo => {
                    return <Conversation key={convo.id} active={false} messages={convo.messages} title={convo.title} args={convo.args} id={convo.id} hidden={convo.hidden} />;
                })}
                <Conversation key={this.props.convo.id} active={true} messages={this.props.messages} title={this.props.convo.title} args={this.props.args} id={this.props.convo.id} hidden={this.props.convo.hidden} />
            </div>
            <PredictionStrip />
            <InputBox />
        </div>;
}

// ConversationPane.propTypes = {
//     convo: PropTypes.any,
//     conversation: PropTypes.any,
//     messages: PropTypes.any,
//     state: PropTypes.string,
//     history: PropTypes.arrayOf(PropTypes.any),
//     args: PropTypes.any
// };

const mapStateToProps = (state) => ({
    convo: state.conversation.currentConvo,
    messages: state.conversation.currentConvo.messages,
    conversation: state.conversation,
    history: state.conversation.history,
    state: state.conversation.state,
    args: state.conversation.currentConvo.args
});

ConversationPane = connect(mapStateToProps)(ConversationPane);

export default ConversationPane;
