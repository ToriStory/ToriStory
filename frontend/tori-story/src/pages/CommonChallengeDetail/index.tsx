import { useLocation } from 'react-router-dom';
import Label from 'components/atoms/challenge/Label';
import { cls } from 'utils/cls';
import CommonChallengeInfo from 'components/molecules/commonChallenge/CommonChallengeInfo';
import GaugeDetail from 'components/molecules/commonChallenge/GaugeDetail';
import CommonButton from 'components/molecules/commonChallenge/CommonButton';
import { useEffect, useState } from 'react';
import { getCommonChallengeDetailAPI } from 'apis/challengeApi';
import { Typography } from '@mui/material';
import { gray600 } from 'constants/color';
import { useAtomValue } from 'jotai';
import { maxCntAtom, unitAtom } from 'stores/challengeStore';
import NoBottomXModal from 'components/molecules/modals/NoBottomXModal';

interface CommonChallengeResponse {
  commonChallengeId: number;
  content: string;
  imgUrlList: ImgUrl[];
}

interface ImgUrl {
  imgUrl: string;
}

const CommonChallengeDetail = () => {
  const [response, setResponse] = useState<CommonChallengeResponse>();
  const [showImgModal, setShowImgModal] = useState<boolean>(false);
  const [selectImg, setSelectImg] = useState<string>('');
  const maxCnt = useAtomValue(maxCntAtom);
  const unit = useAtomValue(unitAtom);

  const {
    state: { commonChallengeId },
  } = useLocation();

  useEffect(() => {
    getCommonChallengeDetail();
  }, []);

  const getCommonChallengeDetail = async () => {
    const res = await getCommonChallengeDetailAPI(commonChallengeId);
    if (res.status === 200) {
      setResponse(res.data.data);
    }
  };

  const handleSelectImg = (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    if (target && target.src) {
      setSelectImg(target.src);
      setShowImgModal(true);
    }
  };

  return (
    <div className={cls('font-omyu flex flex-col items-center w-full h-full overflowX-hidden')}>
      <CommonChallengeInfo maxCnt={maxCnt} content={response ? response.content : 'Loading...'} />
      <CommonButton commonChallengeId={commonChallengeId} />
      <GaugeDetail maxCnt={maxCnt} unit={unit} />
      <div className={cls('mt-16 mb-2')}>
        <Label title='함께한 사람들' />
      </div>
      {response && response?.imgUrlList.length > 0 ? (
        <div className={cls('pb-12 grid grid-cols-3 md:grid-cols-6 gap-2')}>
          {response.imgUrlList.map((item: ImgUrl, index: number) => (
            <div key={index} className={cls('aspect-square ')}>
              <img
                srcSet={`${item}`}
                src={`${item}`}
                alt={`${item}`}
                loading='lazy'
                className={cls('h-full w-full object-cover rounded-xl')}
                onClick={handleSelectImg}
              />
            </div>
          ))}
        </div>
      ) : (
        <Typography color={gray600}>아직 공유된 사진이 없습니다.</Typography>
      )}
      <NoBottomXModal
        openModal={showImgModal}
        setIsModalOpen={setShowImgModal}
        child={<img srcSet={selectImg} src={selectImg} alt={selectImg} loading='lazy' />}
      />
    </div>
  );
};

export default CommonChallengeDetail;
