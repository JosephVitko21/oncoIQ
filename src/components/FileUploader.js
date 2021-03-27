import React, {useRef} from 'react'

export const FileUploader = ({onFileSelectSuccess, onFileSelectError}) => {
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        if (file.size > 1024)
            onFileSelectError({ error: "File size cannot exceed more than 1MB" });
        else onFileSelectSuccess(file);
    }

    const handleClick = () => {
        fileInput.current?.click()
    }



    return (
        <div className="file-uploader">
            <button type="button" onClick={handleClick} className="btn btn-outline-primary btn-lg">
                Browse for your image
            </button>
            <input type="file" onChange={handleFileInput} ref={fileInput} className='file-input'/>
        </div>
    )
}