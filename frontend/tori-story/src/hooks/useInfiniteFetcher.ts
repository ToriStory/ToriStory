import axios from 'apis';
import useSWRInfinite from 'swr/infinite';
import { FetchParams, customChallengeListProps } from 'types/challenge';

export default function useInfiniteFetcher(params: FetchParams) {
  const urlApi = `/challenge/custom/all`;
  const getKey = (pageIndex: number, previousPageData: customChallengeListProps) => {
    // 끝에 도달
    if (previousPageData && !previousPageData.totalCustomChallengeList) {
      return null;
    }

    if (previousPageData && !previousPageData.hasNext) return null;

    // 첫 페이지, `previousPageData`가 없음
    if (pageIndex === 0) return { cursor: 0, page: 0, limit: 10, ...params };

    if (!previousPageData.hasNext) return null;

    // API의 엔드포인트에 커서를 추가
    return {
      cursor: previousPageData.nextCursor,
      page: previousPageData.nextPage,
      limit: 10,
      ...params,
    };
  };

  const { data, error, isLoading, isValidating, mutate, size, setSize } = useSWRInfinite(
    getKey,
    (url) => axios.get(`${urlApi}`, { params: url }).then((res) => res.data.data)
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
