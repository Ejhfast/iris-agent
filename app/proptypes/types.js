import { PropTypes } from 'react';

export const messageType = {
    text: PropTypes.string,
    origin: PropTypes.string,
    hidden: PropTypes.bool
};

export const visualMessageType = {
    content: PropTypes.string,
    origin: PropTypes.string,
    hidden: PropTypes.bool
};

// const messageTypeArray = PropTypes.shape({
//     text: PropTypes.string,
//     origin: PropTypes.string,
// });

export const messagesType = PropTypes.arrayOf(PropTypes.any);
