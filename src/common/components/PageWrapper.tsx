import React from 'react';

const PageWrapper: React.FC<{ children: React.ReactNode }> = (props) => {
    return <div className="w-full pt-4">{props.children}</div>;
};

export default React.memo(PageWrapper);
