import axios from 'axios';
import useSWRInfinite from 'swr/infinite';
import { customChallengeListProps } from 'types/challenge';

export default function useInfiniteFetcher(params: string = '') {
  const getKey = (pageIndex: number, previousPageData: customChallengeListProps) => {
    // 끝에 도달
    if (previousPageData && !previousPageData.totalCustomChallenge) {
      return null;
    }
    // 첫 페이지, `previousPageData`가 없음
    if (pageIndex === 0) return `/challenge/custom/all${params}&cursor=0&page=0&limit=10`;

    if (!previousPageData.hasNext) return null;

    // API의 엔드포인트에 커서를 추가
    return `/challenge/custom/all${params}&cursor=${previousPageData.nextCursor}&page=${
      previousPageData.nextPage + 1
    }&limit=10`;
  };

  const { data, error, isLoading, isValidating, mutate, size, setSize } = useSWRInfinite(
    getKey,
    (url) => axios.get(url).then((res) => res.data)
    // TODO: api 호출
    // (url) =>
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
    size,
    setSize,
  };
}
