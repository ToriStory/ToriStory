/* eslint-disable react-hooks/rules-of-hooks */
import { Id, Slide, TypeOptions, toast } from 'react-toastify';
export const updateToast = (
  id: Id,
  msg: string,
  type: TypeOptions | null | undefined,
  reload?: boolean
) => {
  toast.update(id, {
    render: msg,
    type: type,
    isLoading: false,
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    transition: Slide,
    style: { marginBottom: 16, fontFamily: 'jua' },
    onClose: () => {
      if (reload) {
        window.location.reload();
      }
    },
  });
};
