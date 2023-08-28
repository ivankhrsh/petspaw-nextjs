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
import { type UploadResponse } from '@/types/uploadResponse';
const cn = classNames.bind(styles)

interface Props {
  handleModal: () => void
}

export const Uploader: FC<Props> = ({ handleModal }) => {
  const [uploading, setUploading] = useState(false);
  const [isSusses, setIsSusses] = useState<boolean>();

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
  const files = droppedFiles.map(file => (file.name));

  const handleUpload = async () => {
    if (droppedFiles.length > 0) {
      setUploading(true);
      const fileToUpload = droppedFiles[0];
      const formData = new FormData();
      formData.append('file', fileToUpload);

      try {
        const response: UploadResponse = await uploadImg(formData);
        response.approved === 1 ? setIsSusses(true) : setIsSusses(false);
      } catch (error) {
        setIsSusses(false);
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
      <p className={cn('modalText', 'modalDescription')}>
        Any uploads must comply with the{' '}
        <Link
          href="https://thecatapi.com/privacy"
          className={cn('modalLink')}
        >
          upload guidelines
        </Link>{' '}
        or face deletion.
      </p>

      <section className={cn('modalDropZone', 'modalText', { modalDropZoneError: isSusses === false })}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragAccept && (<p>File will be accepted</p>)}
          {isDragReject && (<p>File will be rejected</p>)}
          <div className={cn('modalDropZoneText')}>
          {!isDragActive && (
            <p>
              <span className={cn('modalBold')}>Drag here </span>
              your file or
            </p>
          )}
          <p>
            <span className={cn('modalBold')}>Click here </span>
            to upload
          </p>
          </div>
        </div>
      </section>

      {droppedFiles.length > 0 && (<div className={cn('modalFileName')}>Image File Name: {files}</div>)}
      {droppedFiles.length === 0 && <p className={cn('modalText')}> No file selected</p>}
        {uploading && <LoadingSpinner/>}
        {!uploading && droppedFiles.length > 0 && (
          <div className={cn('modalButton')}>
            <ActionButton onClick={handleUpload} type='button' text='Upload photo'/>
          </div>
        )}
      {isSusses && <p className={cn('modalWindow')}>✅ Thanks for the Upload - Cat found!</p>}
      {(isSusses === false && droppedFiles.length > 0) && <p className={cn('modalWindow')}>❌ No Cat found - try a different one</p>}
    </div>
  );
}
