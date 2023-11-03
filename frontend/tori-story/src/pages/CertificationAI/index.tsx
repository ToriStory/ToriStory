import { useLocation } from 'react-router-dom';
import ImageUpload, {
  fileAtom,
  selectedImageAtom,
} from 'components/organisms/certification/ImageUpload';
import CertificationResultModal from 'components/organisms/certification/CerfiticationResultModal';
import { useEffect, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { certificationAIRandomApi, patchCompRandomChallengeApi } from 'apis/challengeApi';
import { toast } from 'react-toastify';
import { Typography } from '@mui/material';
import { orange200 } from 'constants/color';

const CertificationAI = () => {
  const [response, setResponse] = useState(null);
  const [result, setResult] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [file, setFile] = useAtom(fileAtom);
  const setSelectedImage = useSetAtom(selectedImageAtom);

  const {
    state: { id },
  } = useLocation();

  const sendRequest = async () => {
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('challengeId', id);

    const response = await toast.promise(certificationAIRandomApi(formData), {
      pending: '인증 처리 중입니다',
    });

    if (response.status === 200) {
      setResponse(response.data.data);
      setResult(response.data.data.result);
      setShowModal(true);
      if (response.data.data.result === true) {
        patchCompRandomChallengeApi();
      }
    } else {
      alert(
        `status: ${response.status} \nresponseCode:${response.data.code} \nmessage: ${response.data.message}`
      );
      console.log(`${response.status} 에러`);
    }
  };

  const handleNavigate = () => {
    setResponse(null);
    setShowModal(false);
    setFile(null);
    setSelectedImage('');
  };

  const handleRetry = () => {
    setResponse(null);
    setShowModal(true);
    setFile(null);
    setSelectedImage('');
  };

  useEffect(() => {
    setSelectedImage('');
    setFile(null);
  }, []);

  //optionProps={{ selectPhoto: true }}
  return (
    <div className='w-full h-full'>
      <Typography sx={{ display: 'flex', justifyContent: 'end', color: orange200 }}>
        *촬영한 사진은 따로 저장되지 않습니다.
      </Typography>
      <ImageUpload buttonProps={{ title: '인증하기', onClick: sendRequest }} />
      {showModal && response && (
        <CertificationResultModal
          result={result}
          handleNavigate={handleNavigate}
          handleRetry={handleRetry}
        />
      )}
    </div>
  );
};

export default CertificationAI;
