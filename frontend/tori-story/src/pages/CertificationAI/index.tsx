import { useLocation } from 'react-router-dom';
import ImageUpload, {
  fileAtom,
  selectedImageAtom,
} from 'components/organisms/certification/ImageUpload';
import CertificationResultModal from 'components/organisms/certification/CerfiticationResultModal';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { CertificationResponse } from 'types/challenge';
import { certificationAIRandomApi } from 'apis/challengeApi';
import { toast } from 'react-toastify';

const CertificationAI = () => {
  const [response, setResponse] = useState<CertificationResponse | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [file] = useAtom(fileAtom);
  const [, setSelectedImage] = useAtom(selectedImageAtom);

  const {
    // state: { id, type },
    // 해당 부분 build 에러 나서 임시 주석 처리
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

    if (response) {
      setResponse(response);
      setShowModal(true);
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
          result={response.result}
          handleNavigate={handleNavigate}
          handleRetry={handleRetry}
        />
      )}
    </div>
  );
};

export default CertificationAI;
