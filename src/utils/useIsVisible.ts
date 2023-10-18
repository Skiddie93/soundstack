import { useState, useEffect, useSyncExternalStore, useRef } from "react";
import { clickTarget } from "./_partials/_clickTarget";
export const isVisible = () => {
  const [visible, setVisible] = useState(false);
  const element: any = useRef(null);

  const clickedTarget = useSyncExternalStore(
    clickTarget.subscribe,
    clickTarget.getSnapshot
  );
  useEffect(() => {
    if (clickedTarget && clickedTarget.getAttribute("data-ignore")) return;

    if (
      element.current &&
      clickTarget &&
      !element.current.contains(clickedTarget) &&
      visible
    ) {
      setVisible(false);
    }
  }, [clickedTarget]);

  return { element, visible, setVisible };
};

export default isVisible;
