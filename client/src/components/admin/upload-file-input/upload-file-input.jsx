import React from 'react';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './upload-file-input.css';

class UploadFileCmp extends React.Component {
  render() {
    const { type, fileChangedHandler } = this.props;

    return (
      <div>
        <input
          style={{ display: 'none' }}
          type={type}
          onChange={fileChangedHandler}
          ref={(fileInput) => this.fileInput = fileInput}
        />
        <div className="upload-file-container">
          <FontAwesomeIcon
            className="upload-file-icon"
            type="submit"
            onClick={() => this.fileInput.click()}
            icon={faFileUpload}
          />
        </div>
      </div>
    );
  }
}

export default UploadFileCmp;
