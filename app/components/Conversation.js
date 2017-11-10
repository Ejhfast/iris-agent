import React, { PropTypes, Component } from 'react';
import Message from './Message';
import TitleMessage from './TitleMessage';
import DataMessage from './DataMessage';
import CodeMessage from './CodeMessage';
import ExplainMessage from './ExplainMessage';
import FilePickMessage from './FilePickMessage';
import IrisImage from './IrisImage';
import CollectionMessage from './CollectionMessage';
import TableSelectMessage from './TableSelectMessage';
import VegaMessage from './VegaMessage';
import Title from './Title';
import * as proptypes from '../proptypes/types';


class Conversation extends Component {

    render = () => {
        // this is somewhat cludgy, but basically we only want only one SelectMessage component to be visually fuctional within a conversation
        let lastSelectMessageIndex = null;
        let i;
        for (i = 0; i < this.props.messages.length; i++){
          if (typeof this.props.messages[i].text === 'object' && (this.props.messages[i].text.type === 'collection_select' || this.props.messages[i].text.type === 'collection_select_one')){
            lastSelectMessageIndex = i;
          }
        }
        // TODO: is there a way to clean this up, maybe via switch?
        return (<div className="innerConversation">
            <Title text={this.props.title} args={this.props.args} id={this.props.id}/>
            {this.props.messages.map((message,i) => {
                let content;
                if (typeof message.text === 'object' && message.text.type === 'data') {
                    content = <DataMessage key={message.id} origin={message.origin} text={message.text.value} hidden={this.props.hidden}/>;
                } else if (typeof message.text === 'object' && message.text.type === 'image') {
                      content = <IrisImage key={message.id} origin={message.origin} content={message.text.value} hidden={this.props.hidden}/>;
                } else if (typeof message.text === 'object' && message.text.type === 'explain') {
                    content = <ExplainMessage key={message.id} origin={message.origin} text={message.text.value} hidden={this.props.hidden}/>;
                } else if (typeof message.text === 'object' && message.text.type === 'file_pick') {
                    content = <FilePickMessage key={message.id} active={this.props.active} origin={message.origin} text={message.text.value} hidden={this.props.hidden}/>;
                } else if (typeof message.text === 'object' && message.text.type === 'code') {
                    content = <CodeMessage key={message.id} origin={message.origin} text={message.text.value} hidden={this.props.hidden}/>;
                } else if (typeof message.text === 'object' && message.text.type === 'collection') {
                        content = <CollectionMessage key={message.id} origin={message.origin} text={message.text.value} hidden={this.props.hidden}/>;
                } else if (typeof message.text === 'object' && message.text.type === 'collection_select') {
                        content = <TableSelectMessage key={message.id} onlyOne={false} active={this.props.active && i === lastSelectMessageIndex} origin={message.origin} text={message.text.value} hidden={this.props.hidden}/>;
                } else if (typeof message.text === 'object' && message.text.type === 'collection_select_one') {
                        console.log(message.text.value);
                        content = <TableSelectMessage key={message.id} onlyOne={true} active={this.props.active && i === lastSelectMessageIndex} origin={message.origin} text={message.text.value} hidden={this.props.hidden}/>;
                } else if (typeof message.text === 'object' && message.text.type === 'vega') {
                        console.log("vega", message.text);
                        content = <VegaMessage key={message.id} origin={message.origin} spec={message.text.spec} data={message.text.data} hidden={this.props.hidden}/>;
                } else if (typeof message.text === 'object' && message.text.type === 'title'){
                      content = <TitleMessage key={message.id} origin={message.origin} text={message.text.text} title={message.text.title} titlehidden={this.props.hidden}/>;
                }
                else{
                      content = <Message key={message.id} origin={message.origin} text={message.text} hidden={this.props.hidden}/>;
                }
                return content;
            })}
        </div>);
      }
}

export default Conversation;
