import React from 'react';

const IrisImage = ({ origin, content }) =>
    <div className = {origin === 'iris' ? 'message left' : 'message right'}>
        <img width="500px" alt="Embedded Image" src={'data:image/png;base64,' + content} />
    </div>;

export default IrisImage;
