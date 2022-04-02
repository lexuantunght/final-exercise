import React from 'react';

const PageWrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  return <div className="flex flex-col flex-1 pt-4">{props.children}</div>;
};

export default React.memo(PageWrapper);
