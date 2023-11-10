import { SearchInput } from 'components/molecules/search/SearchInput';
import useInfiniteFetcher from 'hooks/useInfiniteFetcher';
import { ArrowDownUp, Siren, User } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cls } from 'utils/cls';
import { FetchParams, CustomChallengeProps } from 'types/challenge';
import { IconButton, Skeleton } from '@mui/material';
import HeaderLeft from 'components/molecules/challenge/HeaderLeft';
import BottomButton from 'components/atoms/challenge/BottomButton';
import Challenge from './Challenge';
import { TogetherModal } from 'components/molecules/challenge/TogetherModal';
import ErrorMushRoom from 'assets/images/ErrorMushroom.png';
import { ReportModal } from 'components/molecules/challenge/ReportModal';
import { LoginModal } from 'components/molecules/modals/LoginModal';

const TogetherCustomChallengeList = () => {
  const observeTarget = useRef(null);
  const [searchText, setSearchText] = useState<string>('');
  const [param, setParam] = useState<FetchParams>({ sort: 1 });
  const [sortValue, setSortValue] = useState<number>(0); // 0: 최신순, 1: 스크랩순
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [clickButtonValue, setClickButtonValue] = useState<ClickButtonType>('로그인');
  const [clickResult, setClickResultValue] = useState<CustomChallengeProps>();
  const accessToken = localStorage.getItem('accessToken');

  type ClickButtonType = '신고' | '도전' | '로그인';

  const { data: searchResults, isLoading, error, setSize } = useInfiniteFetcher(param);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  //도전 값 검색 set
  const handleSearchChallenge = (searchText: string) => {
    setSearchText(searchText);
  };

  // 도전 정렬하기
  const toggleSortValue = () => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      // 스크롤 위치를 상단으로 이동
      scrollContainer.scrollTop = 0;
    }
    setSortValue(sortValue === 0 ? 1 : 0);
  };

  // 나도! 버튼 클릭 시
  const handleTogetherButton = (result: CustomChallengeProps) => {
    if (accessToken) setClickButtonValue('도전');
    setOpenModal(true);
    setClickResultValue(result);
  };

  // 신고 버튼 클릭시
  const handleReportButton = (result: CustomChallengeProps) => {
    if (accessToken) setClickButtonValue('신고');
    setOpenModal(true);
    setClickResultValue(result);
  };

  useEffect(() => {
    if (searchText === '') {
      setParam({ sort: sortValue });
    } else {
      setParam({ sort: sortValue, keyword: searchText });
    }
  }, [searchText, sortValue]);

  const onIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        setSize((prev) => prev + 1);
      }
    },
    [setSize]
  );

  useEffect(() => {
    if (!observeTarget.current) return;
    const observer = new IntersectionObserver(onIntersect, {
      threshold: 1,
    });

    observer.observe(observeTarget.current);
    return () => observer && observer.disconnect();
  }, [observeTarget, onIntersect]);

  return (
    <>
      <div className={cls('w-full h-full')}>
        <div>
          <SearchInput onSearch={handleSearchChallenge} />
        </div>
        <div className={cls('flex items-center justify-end py-2')}>
          <div className={cls('flex items-center bg-white rounded-lg px-2 bg-opacity-60')}>
            <ArrowDownUp size={14} />
            <span className={cls('ml-1')} onClick={toggleSortValue}>
              {sortValue === 0 ? '최신순' : '스크랩순'}
            </span>
          </div>
        </div>
        <div
          className={cls('max-h-[calc(100%-56px)] overflow-y-auto pb-12')}
          ref={scrollContainerRef}
        >
          {isLoading && (
            <Skeleton
              variant='rounded'
              width='100%'
              height={150}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                marginTop: '16px',
              }}
            />
          )}
          {error && (
            <div
              className={cls(
                'bg-white w-full h- py-10 rounded-lg bg-opacity-90 flex flex-col items-center justify-center text-lg'
              )}
            >
              <img src={ErrorMushRoom} alt='에러 이미지' />
              <div className={cls('mt-4')}>데이터를 불러오는 중 오류가 생겼어요..</div>
            </div>
          )}
          {searchResults && searchResults[0].totalCustomChallengeList.length > 0 ? (
            searchResults?.map((searchResultItem) =>
              searchResultItem?.totalCustomChallengeList.map((result: CustomChallengeProps) => (
                <div key={result.id}>
                  <Challenge
                    headerLeft={<HeaderLeft challengeCategory='자유' />}
                    headerRight={
                      <IconButton onClick={() => handleReportButton(result)}>
                        <Siren size={20} className={cls('text-gray-400')} />
                      </IconButton>
                    }
                    bottomLeft={
                      <div className={cls('flex items-center text-orange-700')}>
                        <div className='mr-2'>
                          <User size={16} />
                        </div>
                        <div>{result.scrapCnt}</div>
                      </div>
                    }
                    bottomRight={
                      <BottomButton title='나도!' onClick={() => handleTogetherButton(result)} />
                    }
                    content={result.content}
                  />
                </div>
              ))
            )
          ) : (
            <div
              className={cls(
                'bg-white w-full h- py-10 rounded-lg bg-opacity-90 flex flex-col items-center justify-center text-lg'
              )}
            >
              <img src={ErrorMushRoom} alt='에러 이미지' />
              <div className={cls('mt-8')}>생성된 도전이 없어요</div>
              <div>도전을 만들어 봐요!</div>
            </div>
          )}

          <div ref={observeTarget}></div>
        </div>
        {(openModal && clickButtonValue === '도전' && (
          <TogetherModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            customChallenge={clickResult}
          />
        )) ||
          (clickButtonValue === '신고' && (
            <ReportModal
              openModal={openModal}
              setOpenModal={setOpenModal}
              customChallenge={clickResult}
            />
          )) ||
          (clickButtonValue === '로그인' && (
            <LoginModal openModal={openModal} setOpenModal={setOpenModal} />
          ))}
      </div>
    </>
  );
};

export default TogetherCustomChallengeList;
