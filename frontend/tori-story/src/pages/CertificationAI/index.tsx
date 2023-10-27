// import { Button, Stack } from '@mui/material';
// import { AddSquareButton } from 'components/atoms/iconButtons/AddSquareButton';
// import { useLocation } from 'react-router-dom';
// import { cls } from 'utils/cls';

import ImageUpload from 'components/organisms/certification/ImageUpload';

const CertificationAI = () => {
  //   const navigate = useNavigate();
  //   const {
  //     state: { id, type },
  //   } = useLocation();

  return (
    <div>
      <ImageUpload buttonTitle='인증하기' takePhotoOption={true} selectPhotoOption={true} />
    </div>
  );
};

export default CertificationAI;
