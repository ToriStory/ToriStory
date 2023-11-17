import { Button } from '@mui/material';
import { AddSquareButton } from 'components/atoms/iconButtons/AddSquareButton';
import { orange300 } from 'constants/color';
import { atom, useAtom } from 'jotai';
import { useRef } from 'react';
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
  selectPhoto?: boolean;
}

export const fileAtom = atom<File | null>(null);
export const selectedImageAtom = atom<string>('');

const ImageUpload = ({ buttonProps, optionProps = {} }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useAtom(fileAtom);
  const [selectedImage, setSelectedImage] = useAtom(selectedImageAtom);
  const { title, onClick } = buttonProps;
  const { selectPhoto = false } = optionProps;

  const handleTakePhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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

  return (
    <div className={cls('h-full flex flex-col justify-center items-center relative')}>
      {selectedImage ? (
        <img
          src={selectedImage}
          alt='Selected Image'
          onClick={handleTakePhoto}
          className={cls('max-w-full max-h-[400px]')}
        />
      ) : (
        <div>
          <AddSquareButton
            size={100}
            color={orange300}
            onClick={handleTakePhoto}
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
        {...(selectPhoto ? {} : { capture: 'environment' })}
        ref={fileInputRef}
        className={cls('hidden')}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUpload;
