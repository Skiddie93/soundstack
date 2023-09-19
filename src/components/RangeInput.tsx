import { useEffect, useState } from "react";

interface Props {
  className?: string;
  onChange?: (...args: any[]) => void;
  max: number;
  value: number;
  step?: number;
}

const RangeInput = ({ className, onChange, max, value, step }: Props) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const percent = Math.min((value / max) * 100 - 100, 0);

    setOffset(percent);
  }, [value]);

  return (
    <div className={className ? `${className} input-range` : "input-range"}>
      <div
        style={{ transform: `translate(${offset}%,-50%)` }}
        className="input-overlay"
      ></div>
      <input
        className={className}
        onChange={onChange}
        max={max}
        value={value}
        step={step}
        type="range"
      />
    </div>
  );
};

export default RangeInput;
