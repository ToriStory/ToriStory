import { Typography } from '@mui/material';
import { patchCommonChallengeReviewAPI } from 'apis/challengeApi';
import OnceDialog from 'components/molecules/modals/OnceDialog';
import ImageUpload, {
  fileAtom,
  selectedImageAtom,
} from 'components/organisms/certification/ImageUpload';
import { orange200 } from 'constants/color';
import { commonChallengeDetailPage } from 'constants/pathname';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CommonChallengeReview = () => {
  const navigate = useNavigate();
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);
  const [file, setFile] = useAtom(fileAtom);
  const setSelectedImage = useSetAtom(selectedImageAtom);
  const {
    state: { commonChallengeId, beforePage },
  } = useLocation();

  const handleUpload = async () => {
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }
    const formData = new FormData();
    formData.append('image', file);
    const res = await toast.promise(patchCommonChallengeReviewAPI(commonChallengeId, formData), {
      pending: '사진을 업로드 중 입니다',
    });
    if (res.status === 200) {
      setOpenUploadModal(true);
    } else {
      toast.error('사진을 업로드하는데 실패하였습니다.');
    }
  };

  const initFile = () => {
    setSelectedImage('');
    setFile(null);
  };

  const handleNavigateDetail = () => {
    if (beforePage === commonChallengeDetailPage.path) {
      navigate(-1);
    } else {
      navigate(commonChallengeDetailPage.path, {
        state: { commonChallengeId: commonChallengeId },
        replace: true,
      });
    }

    initFile();
  };

  useEffect(() => {
    initFile();
  }, []);

  return (
    <div className='w-full h-full'>
      <Typography sx={{ display: 'flex', justifyContent: 'end', color: orange200 }}>
        *촬영한 사진은 저장, 수정, 삭제되지 않습니다.
      </Typography>
      <ImageUpload
        buttonProps={{ title: '업로드', onClick: handleUpload }}
        optionProps={{ selectPhoto: true }}
      />
      <OnceDialog
        content='사진이 업로드 되었습니다.'
        buttonTitle='확인'
        openModal={openUploadModal}
        setIsModalOpen={setOpenUploadModal}
        handleOnClick={handleNavigateDetail}
      />
    </div>
  );
};

export default CommonChallengeReview;
