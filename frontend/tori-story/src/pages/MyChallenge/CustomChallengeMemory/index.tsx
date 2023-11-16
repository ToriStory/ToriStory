import { Typography } from '@mui/material';
import { patchCustomChallengeMemoryAPI } from 'apis/challengeApi';
import OnceDialog from 'components/molecules/modals/OnceDialog';
import ImageUpload, {
  fileAtom,
  selectedImageAtom,
} from 'components/organisms/certification/ImageUpload';
import { orange200 } from 'constants/color';
import { myChallengePage } from 'constants/pathname';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CustomChallengeMemory = () => {
  const navigate = useNavigate();
  const [openMemoryModal, setOpenMemoryModal] = useState<boolean>(false);
  const [file, setFile] = useAtom(fileAtom);
  const setSelectedImage = useSetAtom(selectedImageAtom);
  const {
    state: { customEntryId },
  } = useLocation();

  const handleUploadMemory = async () => {
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }
    const formData = new FormData();
    formData.append('image', file);
    const res = await toast.promise(patchCustomChallengeMemoryAPI(customEntryId, formData), {
      pending: '사진을 업로드 중 입니다',
    });
    if (res.status === 200) {
      setOpenMemoryModal(true);
    } else {
      toast.error('사진을 업로드하는데 실패하였습니다.');
    }

    initFile();
  };

  const handleNavigateMemory = () => {
    navigate(myChallengePage.path, { replace: true });
  };

  const initFile = () => {
    setSelectedImage('');
    setFile(null);
  };

  useEffect(() => {
    initFile();
  }, []);

  return (
    <div className='w-full h-full'>
      <Typography sx={{ display: 'flex', justifyContent: 'end', color: orange200 }}>
        *촬영한 사진은 삭제되지 않습니다.
      </Typography>
      <ImageUpload
        buttonProps={{ title: '등록하기', onClick: handleUploadMemory }}
        optionProps={{ selectPhoto: true }}
      />
      <OnceDialog
        content='사진이 등록되었습니다.'
        buttonTitle='확인'
        openModal={openMemoryModal}
        setIsModalOpen={setOpenMemoryModal}
        handleOnClick={handleNavigateMemory}
      />
    </div>
  );
};

export default CustomChallengeMemory;
