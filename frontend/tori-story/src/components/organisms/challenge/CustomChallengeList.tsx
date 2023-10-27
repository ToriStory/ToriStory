import CustomChallenge, { CustomChallengeProps } from './CustomChallenge';
import SuccessChallenge from './SuccessChallenge';
import { useState } from 'react';

export interface CustomChallengeListResponse {
  data: CustomChallengeProps[];
}

const CustumChallengeList = () => {
  const response: CustomChallengeListResponse = {
    data: [
      {
        id: 2,
        content: '바나나 우유 1000개 맛있게 마시기',
        startDt: '2022-10-17',
        endDt: '2022-10-18',
        compFlag: false,
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        id: 3,
        content: '낙엽 5개 밟기2',
        startDt: '2022-10-17',
        endDt: '2022-10-18',
        compFlag: false,
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        id: 4,
        content: '낙엽 5개 밟기3',
        startDt: '2022-10-17',
        endDt: '2022-10-18',
        compFlag: false,
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        id: 5,
        content: '낙엽 5개 밟기4',
        startDt: '2022-10-17',
        endDt: '2022-10-18',
        compFlag: false,
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
      {
        id: 6,
        content: '낙엽 5개 밟기5',
        startDt: '2022-10-17',
        endDt: '2022-10-18',
        compFlag: false,
        imgUrl:
          'https://images.mypetlife.co.kr/content/uploads/2021/10/22152410/IMG_2087-scaled-e1634883900174.jpg',
      },
    ],
  };

  const [data, setData] = useState([...response.data]);
  let isEmpty: boolean = true;

  const handleDelete = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const handleCompleted = (id: number) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, compFlag: true };
      }
      return item;
    });
    console.log(updatedData);
    setData(updatedData);
  };

  return (
    <div>
      {data.map((item) => {
        if (item.compFlag === false) {
          isEmpty = false; // 달성되지 않은 도전과제만 표시함
        }
        return (
          <CustomChallenge
            key={item.id}
            props={item}
            deleteChallenge={handleDelete}
            completeChallenge={handleCompleted}
          />
        );
      })}
      {isEmpty ? (
        <SuccessChallenge title='새로운 도전과제를 만들어보세요!'></SuccessChallenge>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CustumChallengeList;
