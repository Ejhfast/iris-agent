import React from 'react';

const Upload = () =>
    <form action="http://localhost:8000/upload_react" method="post" acceptCharset="utf-8" encType="multipart/form-data">
        <label htmlFor="csv">CSV file</label>
        <input type="file" id="csv" name="csv" accept=".csv" />
        <input type="submit" value="submit"/>
    </form>;

export default Upload;
