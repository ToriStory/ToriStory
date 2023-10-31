export interface CustomChallengeProps {
  id: number;
  content: string;
  scrapCnt: number;
  reportCnt: number;
  regDtm: number;
}

export interface CustomChallengeListProps {
  totalCustomChallengeList: CustomChallengeProps[];
  hasNext: boolean;
  nextCursor: number;
  nextPage: number;
}

export interface CustomChallengeCreateProps {
  content: string;
  endDt: string | null;
  displayFlag: boolean;
}

export interface CustomChallengeScrapProps {
  endDt: string | null;
}

/* AI 인증 */
export interface CertificationResponse {
  result: boolean;
}

export interface FetchParams {
  sort: number | null;
  keyword?: string | null;
}

export interface ReportCustomChallenge {
  customChallengeId: number;
  reason: number;
}
