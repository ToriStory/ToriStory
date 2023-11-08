import React from 'react';

interface ModalProps {
  hasModalImg?: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

export default function Modal({ hasModalImg, setIsModalOpen, children }: ModalProps) {
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleClose}
      className={`h-screen w-screen fixed left-0 top-0 flex justify-center items-center  bg-opacity-30 z-[10000] transition-opacity ${
        hasModalImg ? 'bg-black bg-opacity-25' : 'bg-gray-600'
      }`}
    >
      <div
        onClick={stopPropagation}
        className={`w-full rounded-[8px] z-20 transform scale-100 transition-transform ${
          hasModalImg ? '' : 'bg-white  mx-4 p-4'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
