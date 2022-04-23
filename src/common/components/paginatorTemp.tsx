import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { TFunction } from 'react-i18next';

const paginatorTemp = (t: TFunction) => ({
  layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
  FirstPageLink: undefined,
  PrevPageLink: undefined,
  PageLinks: undefined,
  NextPageLink: undefined,
  LastPageLink: undefined,
  JumpToPageInput: undefined,
  RowsPerPageDropdown: (options: any) => {
    const dropdownOptions = [
      { label: 5, value: 5 },
      { label: 10, value: 10 },
      { label: 20, value: 20 },
      { label: 50, value: 50 },
    ];

    return (
      <React.Fragment>
        <span
          className="mx-1"
          style={{ color: 'var(--text-color)', userSelect: 'none' }}
        >
          {`${t('itemsPerPage')} `}
        </span>
        <Dropdown
          value={options.value}
          options={dropdownOptions}
          onChange={options.onChange}
        />
      </React.Fragment>
    );
  },
  CurrentPageReport: (options: any) => {
    return (
      <span
        style={{
          color: 'var(--text-color)',
          userSelect: 'none',
          width: '120px',
          textAlign: 'center',
        }}
      >
        {options.first} - {options.last} of {options.totalRecords}
      </span>
    );
  },
});

export default paginatorTemp;
