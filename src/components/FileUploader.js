import React, {useRef} from 'react'

export default function FileUploader({onFileSelectSuccess, onFileSelectError}) {
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
        // handle validations
        let validFileExtensions = ["jpg", "jpeg", "bmp", "gif", "png"]
        const file = e.target.files[0];
        if (!file || file.size === 0) {
            onFileSelectError({ error: "Image file cannot be blank" });
        } else {
            let extension = file.name.split('.')[1]
            if (validFileExtensions.includes(extension)) {
                onFileSelectSuccess(file);
            } else {
                onFileSelectError({ error: "Uploaded file must be an image" });
            }
        }
    }

    const handleClick = () => {
        fileInput.current?.click()
    }



    return (
        <div className="file-uploader">
            <button type="button" onClick={handleClick} className="btn btn-outline-info btn-lg">
                Browse for your image
            </button>
            <input type="file" onChange={handleFileInput} ref={fileInput} className='file-input'/>
        </div>
    )
}