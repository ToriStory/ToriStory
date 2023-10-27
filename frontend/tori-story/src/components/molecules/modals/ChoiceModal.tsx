import Modal from 'components/atoms/modals/Modal';
import ChoiceButtons from '../buttons/ChoiceButtons';

interface ModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
  cancelButtonLabel: string;
  cancelButtonAction: () => void;
  okayButtonLabel: string;
  okayButtonAction: () => void;
  children: React.ReactNode;
}

const ChoiceModal = ({
  setIsModalOpen,
  cancelButtonLabel,
  cancelButtonAction,
  okayButtonLabel,
  okayButtonAction,
  children,
}: ModalProps) => {
  return (
    <Modal setIsModalOpen={setIsModalOpen}>
      <div>{children}</div>
      <ChoiceButtons
        cancelButtonLabel={cancelButtonLabel}
        cancelButtonAction={cancelButtonAction}
        okayButtonLabel={okayButtonLabel}
        okayButtonAction={okayButtonAction}
      />
    </Modal>
  );
};

export default ChoiceModal;
