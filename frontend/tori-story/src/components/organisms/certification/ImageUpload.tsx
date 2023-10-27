import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { AddSquareButton } from 'components/atoms/iconButtons/AddSquareButton';
import { orange300 } from 'constants/color';
import { atom, useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { cls } from 'utils/cls';

interface ImageUploadProps {
  buttonProps: ButtonProps;
  optionProps?: PhotoOptionProps;
}

export interface ButtonProps {
  title: string;
  onClick: (image: File) => void;
}

export interface PhotoOptionProps {
  takePhoto?: boolean;
  selectPhoto?: boolean;
}

export const fileAtom = atom<File | null>(null);
export const selectedImageAtom = atom<string>('');

const ImageUpload = ({ buttonProps, optionProps = {} }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useAtom(fileAtom);
  const [selectedImage, setSelectedImage] = useAtom(selectedImageAtom);
  const [usingModal, setUsingModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { title, onClick } = buttonProps;
  const { takePhoto = true, selectPhoto = false } = optionProps;

  useEffect(() => {
    if (takePhoto && selectPhoto) {
      setUsingModal(true);
    }
  }, []);

  const handleTakePhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    handleCloseModal();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFile = files[0];
      const imageUrl = URL.createObjectURL(newFile);
      setFile(newFile);
      setSelectedImage(imageUrl);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className={cls('h-full flex flex-col justify-center items-center relative')}>
      {selectedImage ? (
        <img
          src={selectedImage}
          alt='Selected Image'
          onClick={usingModal ? handleOpenModal : handleTakePhoto}
          className={cls('max-w-full max-h-[400px]')}
        />
      ) : (
        <div>
          <AddSquareButton
            size={100}
            color={orange300}
            onClick={usingModal ? handleOpenModal : handleTakePhoto}
            className={cls('flex justify-center items-center')}
          />
        </div>
      )}
      <Button
        fullWidth
        variant='contained'
        sx={{
          fontWeight: 'bold',
          color: 'white',
          fontSize: 20,
          position: 'absolute',
          bottom: 0,
        }}
        disabled={!selectedImage || !file}
        onClick={() => {
          if (file) {
            onClick(file);
          }
        }}
      >
        {title}
      </Button>
      <input
        type='file'
        accept='image/*'
        capture='environment'
        ref={fileInputRef}
        className={cls('hidden')}
        onChange={handleFileChange}
      />

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>사진 선택 옵션</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <DialogContentText></DialogContentText>
          {takePhoto && <Button onClick={handleTakePhoto}>사진 촬영하기</Button>}
          {selectPhoto && <Button onClick={handleCloseModal}>앨범에서 선택하기</Button>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color='primary'>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImageUpload;
