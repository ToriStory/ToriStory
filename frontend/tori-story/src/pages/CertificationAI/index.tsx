import { useLocation } from 'react-router-dom';
import ImageUpload, {
  fileAtom,
  selectedImageAtom,
} from 'components/organisms/certification/ImageUpload';
import CertificationResultModal from 'components/organisms/certification/CerfiticationResultModal';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { certificationAIRandomApi, patchCompRandomChallengeApi } from 'apis/challengeApi';
import { toast } from 'react-toastify';

const CertificationAI = () => {
  const [response, setResponse] = useState(null);
  const [result, setResult] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [file] = useAtom(fileAtom);
  const [, setSelectedImage] = useAtom(selectedImageAtom);

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
      console.log(`${response.status} 에러`);
    }
  };

  const handleNavigate = () => {
    setResponse(null);
    setShowModal(false);
    setSelectedImage('');
  };

  const handleRetry = () => {
    setResponse(null);
    setShowModal(true);
    setSelectedImage('');
  };

  return (
    <div className='w-full h-full'>
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
