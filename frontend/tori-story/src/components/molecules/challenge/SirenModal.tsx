import { customChallengeProps } from 'types/challenge';
import ChoiceModal from '../modals/ChoiceModal';
import { cls } from 'utils/cls';
import { Chip, Stack } from '@mui/material';
import { SIRENTYPE } from 'constants/sirenType';
import { useState } from 'react';

interface TogetherModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  customChallenge: customChallengeProps | undefined;
}

export const SirenModal = ({ openModal, setOpenModal, customChallenge }: TogetherModalProps) => {
  const [selectedSiren, setSelectedSiren] = useState<number | null>(null);

  const handleSirenClick = (sirenValue: number) => {
    setSelectedSiren(sirenValue);
  };

  // 모달 - 닫히는 부분
  const handleCancelButton = () => {
    setOpenModal(false);
  };

  // 모달 - 신고하기 버튼 누르는 부분
  const handleSirenButton = () => {
    // TODO: 신고하기 api 연결
    setOpenModal(false);
  };

  return (
    <>
      {openModal && (
        <ChoiceModal
          cancelButtonLabel={'취소하기'}
          cancelButtonAction={() => handleCancelButton()}
          okayButtonLabel={'신고하기'}
          okayButtonAction={() => handleSirenButton()}
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
                {SIRENTYPE.map((sirenItem) => (
                  <Chip
                    key={sirenItem.value}
                    label={sirenItem.content}
                    sx={{
                      marginBottom: '4px',
                      borderRadius: '8px',
                      border: `2px solid ${
                        selectedSiren === sirenItem.value ? '#FF762E' : 'transparent'
                      }`,
                      '&:focus': {
                        color: '#FF762E',
                        backgroundColor: '#FFF1EA',
                      },
                      backgroundColor: selectedSiren === sirenItem.value ? '#FFF1EA' : 'white',
                    }}
                    onClick={() => handleSirenClick(sirenItem.value)}
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
