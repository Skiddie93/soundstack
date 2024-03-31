import { useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
interface ToastOptions {
  id: number;
  message: string;
  type: "success" | "error" | "warning";
}

interface ToastProps {
  context: any;
}

const ToastIcon = ({ type }: any) => {
  let icon;

  switch (type) {
    case "success":
      icon = <FaCheck />;
      break;
    case "error":
      icon = <MdOutlineError />;
      break;
    case "warning":
      icon = <BiSolidError />;
      break;
    default:
      icon = <FaCheck />;
  }

  return icon;
};

const Toast = ({ context }: ToastProps) => {
  const [toastState, setToastState] = useState<ToastOptions[] | []>([]);

  const closeToast: any = (id: number) => {
    setToastState((prev: ToastOptions[] | []) => {
      const clone = [...prev];
      const updatedState = clone.filter(
        (toast: ToastOptions) => toast.id != id
      );
      return updatedState;
    });
  };

  const initToast = (
    message: string,
    type: "success" | "error" | "warning"
  ) => {
    const options: ToastOptions = {
      id: Date.now(),
      message: message,
      type: type,
    };

    setToastState((prev: ToastOptions[] | []) => {
      const updatedState = prev.length ? [...prev, options] : [options];
      return updatedState;
    });

    setTimeout(() => {
      closeToast(options.id);
    }, 5000);
  };

  useEffect(() => {
    context(() => initToast);
  }, []);
  return (
    <div className="toast-notification">
      {toastState.map((toast) => {
        return (
          <div key={toast.id} className={toast.type + " toast"}>
            <div className="icon">
              <ToastIcon type={toast.type} />
            </div>
            <div className="text">{toast.message}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
