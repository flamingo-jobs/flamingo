// ./src/App.tsx

import React, { useState } from 'react';
import Path from 'path';
import uploadFileToBlob, { isStorageConfigured } from '../utils/azureFileUpload';

const storageConfigured = isStorageConfigured();

const Sample = () => {
    // all blobs in container
    const [uploaded, setUploaded] = useState(false);

    // current file to upload into container
    const [fileSelected, setFileSelected] = useState(null);

    // UI/form management
    const [uploading, setUploading] = useState(false);
    const [inputKey, setInputKey] = useState(Math.random().toString(36));

    const onFileChange = (event) => {
        // capture file into state
        setFileSelected(event.target.files[0]);
    };

    const onFileUpload = async () => {
        // prepare UI
        setUploading(true);

        // *** UPLOAD TO AZURE STORAGE ***
        const blobsInContainer = await uploadFileToBlob(fileSelected, "employee-profile-pictures");

        // prepare UI for results
        setUploaded(true);

        // reset state/form
        setFileSelected(null);
        setUploading(false);
        setInputKey(Math.random().toString(36));
    };

    // display form
    const DisplayForm = () => (
        <div>
            <input type="file" onChange={onFileChange} key={inputKey || ''} />
            <button type="submit" onClick={onFileUpload}>
                Upload!
            </button>
        </div>
    )

    return (
        <div>
            <h1>Upload file to Azure Blob Storage</h1>
            {storageConfigured && !uploading && DisplayForm()}
            {storageConfigured && uploading && <div>Uploading</div>}
            <hr />
            {storageConfigured && uploaded && <div>Uploaded succesfully image can be found at https://flamingofiles.blob.core.windows.net/employee-profile-pictures/image_name</div>}
            {!storageConfigured && <div>Storage is not configured.</div>}
        </div>
    );
};

export default Sample;


