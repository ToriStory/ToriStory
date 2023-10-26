import { SearchInput } from 'components/molecules/search/SearchInput';
import useInfiniteFetcher from 'hooks/useInfiniteFetcher';
import { ArrowDownUp } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cls } from 'utils/cls';
import CustomChallengeList from 'components/organisms/challenge/CustomChallengeList';
import { customChallengeProps } from 'types/challenge';

const OtherCustomChallengeList = () => {
  const observeTarget = useRef(null);
  const [searchText, setSearchText] = useState<string>('');
  const [param, setParam] = useState<string>('');
  const [sortValue, setSortValue] = useState<number>(0); // 0: 최신순, 1: 스크랩순

  const { data: searchResults, isLoading, setSize } = useInfiniteFetcher(param);

  useEffect(() => {
    setParam(`?keyword=${searchText}&sort=${sortValue}`);
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

  const handleSearchChallenge = (searchText: string) => {
    setSearchText(searchText);
  };

  const toggleSortValue = () => {
    setSortValue(sortValue === 0 ? 1 : 0);
  };

  return (
    <div className={cls('w-full h-full')}>
      <div>
        <SearchInput onSearch={handleSearchChallenge} />
      </div>
      <div className={cls('flex items-center justify-end py-2')}>
        <div className={cls('flex items-center')}>
          <ArrowDownUp size={14} />
          <span className={cls('ml-1')} onClick={toggleSortValue}>
            {sortValue === 0 ? '최신순' : '스크랩순'}
          </span>
        </div>
      </div>
      <div className={cls('max-h-[calc(100%-56px)] overflow-y-auto pb-12')}>
        <CustomChallengeList />
        {isLoading && <div>로딩중..</div>}
        {searchResults &&
          searchResults.map((searchResultItem) =>
            searchResultItem?.totalCustomChallenge.map((result: customChallengeProps) => (
              <div key={result.id}>하윙</div>
            ))
          )}
        <div ref={observeTarget}></div>
      </div>
    </div>
  );
};

export default OtherCustomChallengeList;
