export interface customChallengeProps {
  id: number;
  content: string;
  scrapCnt: number;
  reportCnt: number;
  regDtm: number;
}

export interface customChallengeListProps {
  totalCustomChallengeList: customChallengeProps[];
  hasNext: boolean;
  nextCursor: number;
  nextPage: number;
}

export interface customChallengeCreateProps {
  content: string;
  endDt: string | null;
  displayFlag: boolean;
}

export interface customChallengeScrapProps {
  endDt: string | null;
}

/* AI 인증 */
export interface CertificationResponse {
  result: boolean;
}
