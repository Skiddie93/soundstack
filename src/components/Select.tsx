import { Dispatch } from "react";
import isVisible from "@/utils/useIsVisible";
import { FaCaretDown } from "react-icons/fa";

interface Props {
  data: Record<string, string | number>[];
  setSelected: Dispatch<any>;
  current: string | number;
}

const Select = ({ data, setSelected, current }: Props) => {
  const visibility = isVisible();

  return (
    <div
      ref={visibility.element}
      className={
        visibility.visible ? "select-component open" : "select-component"
      }
    >
      <div className="data-wrapper">
        <div onClick={() => visibility.setVisible(true)} className="default">
          <div className="default-wrapper">{current}</div>
          <FaCaretDown />
        </div>
        <div className={visibility.visible ? "options" : "hide options"}>
          {data.map((item) => {
            return (
              <div
                onClick={() => {
                  setSelected(item.value);
                  visibility.setVisible(false);
                }}
                key={item.id}
                className="option"
              >
                {item.value}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Select;
