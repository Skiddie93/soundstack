import { useContext, useEffect } from "react";
import { BiSolidError } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
interface ToastOptions {
  id: number;
  message: string;
  type: "success" | "error" | "warning";
}

interface ToastProps {
  toasts: ToastOptions[] | [];
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

const Toast = ({ toasts }: ToastProps) => {
  return (
    <div className="toast-notification">
      {toasts.map((toast) => {
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
