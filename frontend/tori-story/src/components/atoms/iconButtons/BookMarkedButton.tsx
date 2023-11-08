import { BookMarked, X } from 'lucide-react';
import { useState } from 'react';
import { cls } from 'utils/cls';
import Modal from '../modals/Modal';
import OldPaperScroll from 'assets/images/old_paper_scroll.png';
import 'animate.css';
import { ToriCollectionList } from 'components/molecules/collections/ToriCollectionList';

export const BookMarkedButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div onClick={handleModalOpen}>
        <button className={cls('rounded-lg p-1 text-white bg-orange-300 w-fit')}>
          <BookMarked size={30} />
        </button>
      </div>
      {isModalOpen && (
        <Modal hasModalImg={true} setIsModalOpen={setIsModalOpen}>
          <div
            className={cls(
              'fixed inset-0 flex items-center justify-center animate__animated animate__fadeInDown'
            )}
          >
            <div className={cls('w-fit h-fit')}>
              <div className={cls('w-1/3 mx-auto')}>
                <h2
                  className={cls(
                    'text-center underline decoration-orange-400/60 font-bold text-2xl text-orange-900 p-1 rounded-xl -mt-5 bg-white bg-opacity-80'
                  )}
                >
                  토리 도감
                </h2>
              </div>

              <div
                className={cls(
                  'w-auto h-auto text-gray-700 relative flex items-center justify-center'
                )}
              >
                <img src={OldPaperScroll} alt='도감 페이지' />

                <div className={cls('absolute top-4 right-8 text-orange-800 font-black z-40')}>
                  <X onClick={handleModalOpen} fontSize={30} strokeWidth={6} />
                </div>
                <div
                  className={cls(
                    'absolute h-5/6 w-2/3 overflow-y-scroll top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                  )}
                >
                  <ToriCollectionList />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
