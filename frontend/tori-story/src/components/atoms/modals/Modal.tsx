import React from 'react';

interface ModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

export default function Modal({ setIsModalOpen, children }: ModalProps) {
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation(); // 모달 내부 클릭은 모달 닫힘 이벤트를 중지시킵니다.
  };

  return (
    <div
      onClick={handleClose}
      className='h-screen w-screen fixed left-0 top-0 flex justify-center items-center bg-gray-600 bg-opacity-30 z-[10000]'
    >
      <div onClick={stopPropagation} className='w-full mx-4 bg-white p-4  rounded-[8px] z-40'>
        {children}
      </div>
    </div>
  );
}
