import React from 'react';
import { Button } from 'primereact/button';

const OverviewItem: React.FC<{
    title: string;
    variant?: string;
    value?: string | number;
    icon?: string;
}> = ({ title, variant = 'info', value = 0, icon = 'pi-book' }) => {
    return (
        <Button className={`p-button-${variant}`}>
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
