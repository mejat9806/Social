import { toast } from "react-toastify";

export enum ToastType {
  success,
  error,
  warning,
}

interface Toast {
  type: ToastType;
  message: string;
}

export const toastAlert = ({ type, message }: Toast) => {
  switch (type) {
    case ToastType.success:
      toast.success(message);
      break;
    case ToastType.error:
      toast.error(message);
      break;
    case ToastType.warning:
      toast.warning(message);
      break;
  }
};
