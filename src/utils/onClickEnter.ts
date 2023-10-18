export const onClickEnter = (e: any, func: () => any) => {
  if (e.key === "Enter") func() as ()=> any;
};

export default onClickEnter;
