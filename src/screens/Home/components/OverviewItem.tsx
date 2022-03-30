import React from 'react';
import { Button } from 'primereact/button';

const OverviewItem: React.FC<{
  title: string;
  variant?: string;
  value?: string | number;
  icon?: string;
  onClick?: () => void;
}> = ({ title, variant = 'info', value = 0, icon = 'pi-book', onClick }) => {
  return (
    <Button className={`p-button-${variant}`} onClick={onClick}>
      <div className="flex flex-col space-y-3 py-4">
        <div className="md:text-lg uppercase">
          <i className={`pi ${icon} mr-2`}></i>
          {title}
        </div>
        <div className="text-xl md:text-3xl text-left">
          {value.toLocaleString()}
        </div>
      </div>
    </Button>
  );
};

export default OverviewItem;
