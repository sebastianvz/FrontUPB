import React, { useState } from "react";
import PropTypes from 'prop-types';

import Table from "../Table/Table.js";
import './customUpload.css';

const FileUpload = ({
  id,
  defaultImage,
  multiple,
  onRemove = () => { },
  onChange = () => { },
}) => {
  const [nameOfFIle, setNameOfFIle] = useState('');

  const handlers = {
    change: (e) => {
      e.preventDefault();

      let fileName = '';
      if (e.target.files && e.target.files.length > 1)
        fileName = (e.target.getAttribute('data-multiple-caption') || '').replace('{count}', e.target.files.length);
      else
        fileName = e.target.value.split('\\').pop();

      if (fileName)
        setNameOfFIle(fileName);

      onChange(e.target.files[0]);
    },   
  };

  return (
    <div class="box">
      <input
        type="file"
        name={id}
        id={id}
        onChange={handlers.change}
        class="inputfile inputfile-6"
        data-multiple-caption="{count} files selected"
        multiple={multiple}
      />
      <label for={id}>
        <span>{nameOfFIle}</span>
        <strong>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
            <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg> Choose a file&hellip;
        </strong>
      </label>
    </div>
  );
}

FileUpload.propTypes = {};

export default FileUpload;