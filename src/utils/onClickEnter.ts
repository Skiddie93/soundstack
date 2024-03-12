import React from "react";

export const onClickEnter = (e: React.KeyboardEvent, func: () => any) => {
  if (e.key === "Enter") func() as () => any;
};

export default onClickEnter;
