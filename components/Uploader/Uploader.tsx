'use client'

import React, { useState, type FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Uploader.module.scss';
import { ActionButton } from '../Button';
import { Close } from '@/public/svg';
import Link from 'next/link';
import { useDropzone } from 'react-dropzone';
import { uploadImg } from '@/utils/uploadImg';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
const cn = classNames.bind(styles)

interface Props {
  handleModal: () => void
}

export const Uploader: FC<Props> = ({ handleModal }) => {
  const [uploading, setUploading] = useState(false);

  const {
    acceptedFiles: droppedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.png']
    },
    maxFiles: 1
  });
  const files = droppedFiles.map(file => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  const handleUpload = async () => {
    if (droppedFiles.length > 0) {
      setUploading(true);
      const fileToUpload = droppedFiles[0];
      const formData = new FormData();
      formData.append('file', fileToUpload);

      try {
        const response = await uploadImg(formData);
        console.log('Upload successful', response);
      } catch (error) {
        console.error('Upload error', error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className={cn('modalContent')}>
      <div className={cn('backButton')}>
        <ActionButton onClick={handleModal} type='nav' text={<Close/>}/>
      </div>
      <h1 className={cn('modalTitle')}>Upload a .jpg or .png Cat Image</h1>
      <p className={cn('modalText')}>
        Any uploads must comply with the{' '}
        <Link
          href="https://thecatapi.com/privacy"
          className={cn('modalLink')}
        >
          upload guidelines
        </Link>{' '}
        or face deletion.
      </p>

      <section className={cn('modalDropZone', 'modalText')}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragAccept && (<p>All files will be accepted</p>)}
          {isDragReject && (<p>Some files will be rejected</p>)}
          {!isDragActive && (<p><b>Drag here </b>your file or </p>)}
          <p><b>Click here </b>to upload</p>
        </div>
      </section>

      {droppedFiles.length > 0 && (<div className={cn('modalFileName')}>Image File Name: {files}</div>)}
      {droppedFiles.length === 0 && <p className={cn('modalText')}> No file selected</p>}
        {uploading && <LoadingSpinner/>}
        {!uploading && droppedFiles.length > 0 && (
          <ActionButton onClick={handleUpload}type='button' text='Upload'/>
        )}
    </div>
  );
}
