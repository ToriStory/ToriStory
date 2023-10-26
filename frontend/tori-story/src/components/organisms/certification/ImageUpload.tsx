import { Button } from '@mui/material';
import { AddSquareButton } from 'components/atoms/iconButtons/AddSquareButton';
import { orange300 } from 'constants/color';
import { useRef, useState } from 'react';
import { cls } from 'utils/cls';

interface ImageUploadProps {
  buttonTitle: string;
  takePhotoOption: boolean;
  selectPhotoOption: boolean;
}

const ImageUpload = ({ buttonTitle, takePhotoOption, selectPhotoOption }: ImageUploadProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  let stream: MediaStream | null = null;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const [photoURL, setPhotoURL] = useState<string | null>('');

  const startCamera = async () => {
    try {
      if (!stream) {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
      }

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.log(selectPhotoOption);
      console.error('카메라 액세스 오류:', error);
    }
  };

  const takePhoto = () => {
    if (!canvasRef.current || !videoRef.current) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const photoDataURL = canvas.toDataURL('image/jpeg');
    setPhotoURL(photoDataURL); // 이미지 URL을 상태로 설정

    if (imageRef.current) {
      imageRef.current.src = photoDataURL; // 이미지 요소에 URL 설정
    }
  };

  const handleTakePhoto = () => {
    // 파일 입력 요소 클릭
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // 선택된 파일을 업로드 또는 처리할 수 있습니다.
      console.log('Selected file:', file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div className={cls('flex flex-col justify-center items-center')}>
      <AddSquareButton
        size={100}
        color={orange300}
        onClick={startCamera}
        className={cls('flex justify-center items-center')}
      />
      <Button
        fullWidth
        variant='contained'
        sx={{ mt: 3, mb: 2, fontWeight: 'bold', color: 'white', fontSize: 20 }}
      >
        {buttonTitle}
      </Button>

      {/* <button onClick={startCamera}>Start Camera</button> */}
      {takePhotoOption && (
        <>
          <button onClick={takePhoto}>Take Photo</button>
          {photoURL && <img ref={imageRef} src={photoURL} alt='Taken Photo' className='mt-4' />}
        </>
      )}
      <video ref={videoRef} autoPlay={takePhotoOption} className='mt-4' />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <button onClick={handleTakePhoto}>사진 찍기</button>
      <input
        type='file'
        accept='image/*'
        capture='environment'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {selectedImage && (
        <img
          src={selectedImage}
          alt='Selected Image'
          style={{ maxWidth: '100%', maxHeight: '400px' }}
        />
      )}
    </div>
  );
};

export default ImageUpload;
