import { orange300 } from 'constants/color';
import { BadgeCheck } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import BottomButton from 'components/atoms/challenge/BottomButton';
import Label from 'components/atoms/challenge/Label';
import { cls } from 'utils/cls';
import CommonChallengeInfo from 'components/molecules/commonChallenge/CommonChallengeInfo';
import GuageDetail from 'components/molecules/commonChallenge/GuageDetail';

interface CommonChallengeResponse {
  commonChallengeId: number;
  content: string;
  imgUrlList: ImgUrl[];
}

interface ImgUrl {
  imgUrl: string;
}

const CommonChallengeDetail = () => {
  // const [response, setResponse] = useState<RandomChallengeResponse>();

  const response: CommonChallengeResponse = {
    commonChallengeId: 1,
    content: '산책하기',
    imgUrlList: [
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl: 'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl: 'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl: 'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
    ],
  };

  const handleCertification = () => {};

  const handleAttend = () => {};

  const {
    state: { attendFlag, compFlag, attendCnt, compCnt, maxCnt, unit },
  } = useLocation();

  return (
    <div className={cls('font-omyu flex flex-col items-center w-full h-full overflowX-hidden')}>
      <CommonChallengeInfo attendCnt={attendCnt} content={response.content} />
      {compFlag ? (
        <BadgeCheck color={orange300} />
      ) : attendFlag ? (
        <BottomButton title={'인증'} onClick={handleCertification} />
      ) : (
        <BottomButton title={'참여'} onClick={handleAttend} />
      )}
      <GuageDetail compCnt={compCnt} maxCnt={maxCnt} unit={unit} />
      <div className={cls('mt-14 mb-2')}>
        <Label title='완료한 사람들' />
      </div>
      <div className={cls('pb-12 grid grid-cols-3 md:grid-cols-6 gap-2')}>
        {response.imgUrlList.map((item: ImgUrl) => (
          <div className={cls('aspect-square')}>
            <img
              srcSet={`${item.imgUrl}?w=164&h=164&fit=crop&auto=format`}
              src={`${item.imgUrl}?w=164&h=164&fit=crop&auto=format`}
              alt={item.imgUrl}
              loading='lazy'
              className={cls('h-full object-cover rounded-xl')}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonChallengeDetail;
