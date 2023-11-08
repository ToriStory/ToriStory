import { useLocation } from 'react-router-dom';
import Label from 'components/atoms/challenge/Label';
import { cls } from 'utils/cls';
import CommonChallengeInfo from 'components/molecules/commonChallenge/CommonChallengeInfo';
import GaugeDetail from 'components/molecules/commonChallenge/GaugeDetail';
import CommonButton from 'components/molecules/commonChallenge/CommonButton';

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
    ],
  };

  const {
    state: { maxCnt, unit },
  } = useLocation();

  return (
    <div className={cls('font-omyu flex flex-col items-center w-full h-full overflowX-hidden')}>
      <CommonChallengeInfo maxCnt={maxCnt} content={response.content} />
      <CommonButton />
      <GaugeDetail maxCnt={maxCnt} unit={unit} />
      <div className={cls('mt-14 mb-2')}>
        <Label title='완료한 사람들' />
      </div>
      <div className={cls('pb-12 grid grid-cols-3 md:grid-cols-6 gap-2')}>
        {response.imgUrlList.map((item: ImgUrl, index: number) => (
          <div key={index} className={cls('aspect-square')}>
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
