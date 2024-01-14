import React, { useState } from 'react'
import imageCompression from 'browser-image-compression';

const Main = () => {

    const [state, setState] = useState({
        originalImageSrc: 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg',
        compressedImageSrc: 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg',
        downloadLink: '',
        uploadedFile: null,
        compressedFile: null,
        uploaded: false,
        compressed: false
    })

    const handleUpload = (e) => {
        setState({ ...state, ['originalImageSrc']: URL.createObjectURL(e.target.files[0]), ['uploadedFile']: e.target.files[0], ['uploaded']: true })
    }

    const handleCompress = async () => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1080,
            useWebWorker: true,
        }

        const output = await imageCompression(state.uploadedFile, options);
        setState({ ...state, ['compressedFile']: output, ['compressedImageSrc']: URL.createObjectURL(output), ['compressed']: true })
    }

    const handleDownload = () => {
        const downloadBtn = document.getElementById('downloadBtn')
        setState({ ...state, ['downloadLink']: URL.createObjectURL(state.compressedFile) })
        downloadBtn.download = 'compressed ' + state.uploadedFile.name;
    }

    return (
        <div className='main'>
            <div className="left">
                <img src={state.originalImageSrc} alt="" id='originalImage' className='image' />
                <input type="file" onChange={handleUpload} />
            </div>
            <div className="center">
                <button onClick={handleCompress} disabled={state.uploaded?false:true}>Compress &rarr;</button>
            </div>
            <div className="right">
                <img src={state.compressedImageSrc} alt="" id='compressedImage' className='image' />
                <a href={state.downloadLink} onClick={handleDownload} id='downloadBtn'>Download</a>
            </div>
        </div>
    )
}

export default Main
