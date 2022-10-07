export interface IModal {
  open: boolean;
  title: JSX.Element;
  content: JSX.Element;
  actions: {
    confirmAction?: React.MouseEventHandler<HTMLButtonElement>;
    confirmLabel?: string | JSX.Element;
    cancelAction: any;
    cancelLabel: string | JSX.Element;
  };
}

export type ModalRef = {
  openModal: () => void;
  closeModal: () => void;
};
