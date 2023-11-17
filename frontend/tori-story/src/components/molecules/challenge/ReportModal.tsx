import { ReportCustomChallenge, CustomChallengeProps } from 'types/challenge';
import ChoiceModal from '../modals/ChoiceModal';
import { cls } from 'utils/cls';
import { Chip, Stack } from '@mui/material';
import { REPORTTYPE } from 'constants/reportType';
import { useState } from 'react';
import { reportCustomChallengeAPI } from 'apis/challengeApi';
import { toast } from 'react-toastify';

interface TogetherModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  customChallenge: CustomChallengeProps | undefined;
}

export const ReportModal = ({ openModal, setOpenModal, customChallenge }: TogetherModalProps) => {
  const [selectedReport, setSelectedReport] = useState<number>(1);

  const handleReportClick = (ReportValue: number) => {
    setSelectedReport(ReportValue);
  };

  // 모달 - 닫히는 부분
  const handleCancelButton = () => {
    setOpenModal(false);
  };

  // 모달 - 신고하기 버튼 누르는 부분
  const handleReportButton = async () => {
    // TODO: 신고하기 api 연결
    if (customChallenge && selectedReport) {
      const requestData: ReportCustomChallenge = {
        customChallengeId: customChallenge.id,
        reason: selectedReport,
      };
      const result = await toast.promise(reportCustomChallengeAPI(requestData), {
        pending: '도전을 신고 중입니다',
      });
      if (result.data.code === 201) {
        toast.success('도전이 신고되었습니다!');
      } else if (result.data.code === 400) {
        toast.error(result.data.data + '입니다!');
      }
    }

    setOpenModal(false);
  };

  return (
    <>
      {openModal && (
        <ChoiceModal
          cancelButtonLabel={'취소하기'}
          cancelButtonAction={() => handleCancelButton()}
          okayButtonLabel={'신고하기'}
          okayButtonAction={() => handleReportButton()}
          setIsModalOpen={setOpenModal}
        >
          <div className={cls('my-4 text-left')}>
            <div>
              <div className={cls('font-bold text-xl text-gray-800')}>나도도전 신고하기</div>
              <div className={cls('text-gray-500 text-xs')}>
                * 허위신고일 경우, 신고자의 서비스 활동이 제한될 수 있으니 신중하게 신고해주세요.
              </div>
              <div className={cls('text-base text-gray-800')}>
                도전명: {customChallenge?.content}
              </div>
            </div>
            <div className={cls('bg-gray-200 rounded-lg p-2 pb-1')}>
              <Stack direction='column'>
                {REPORTTYPE.map((reportItem) => (
                  <Chip
                    key={reportItem.value}
                    label={reportItem.content}
                    sx={{
                      marginBottom: '4px',
                      borderRadius: '8px',
                      border: `2px solid ${
                        selectedReport === reportItem.value ? '#FF762E' : 'transparent'
                      }`,
                      '&:focus': {
                        color: '#FF762E',
                        backgroundColor: '#FFF1EA',
                      },
                      backgroundColor: selectedReport === reportItem.value ? '#FFF1EA' : 'white',
                    }}
                    onClick={() => handleReportClick(reportItem.value)}
                  />
                ))}
              </Stack>
            </div>
          </div>
        </ChoiceModal>
      )}
    </>
  );
};
