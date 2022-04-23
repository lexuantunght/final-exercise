import React from 'react';
import Expand from 'react-expand-animated';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { AutoComplete } from 'primereact/autocomplete';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { TFunction } from 'react-i18next';
import { Member } from '../../../models/Member';
import { Status } from '../../../models/Status';
import { useFormik } from 'formik';
import _get from 'lodash/get';
import moment from 'moment';

const ProjectFilter: React.FC<{
  t: TFunction;
  isAdvanced?: boolean;
  onCheckAdvanced?: CallableFunction;
  members?: Member[];
  statuses?: Status[];
  onSearchDataChange?: CallableFunction;
  searchData?: Record<string, number | any>;
}> = ({
  t,
  members,
  statuses,
  onSearchDataChange,
  isAdvanced,
  onCheckAdvanced,
  searchData,
}) => {
  const [filteredMembers, setFilteredMembers] = React.useState<
    Member[] | undefined
  >([]);

  const formik = useFormik({
    initialValues: Object.assign(searchData, {
      startDate: searchData?.startDate.map((d: string) => new Date(d)) || [],
      endDate: searchData?.endDate.map((d: string) => new Date(d)) || [],
      containMember:
        members?.find((m) => m.visa === searchData?.containMember) || '',
    }),
    onSubmit: (values) => {
      onSearchDataChange?.(
        Object.assign(values, {
          containMember: _get(values.containMember, 'visa', ''),
          startDate: values.startDate.map((d: Date) =>
            moment(d).format('yyyy-MM-DD')
          ),
          endDate: values.endDate.map((d: Date) =>
            moment(d).format('yyyy-MM-DD')
          ),
        })
      );
    },
  });

  const onResetForm = () => {
    const resetValue = {
      keyword: '',
      status: '',
      startDate: [],
      endDate: [],
      containMember: '',
    };
    formik.setValues(resetValue);
    onSearchDataChange?.(resetValue);
  };

  const searchMember = (event: { query: string }) => {
    setTimeout(() => {
      let _filteredMembers;
      if (!event.query.trim().length) {
        _filteredMembers = [...(members ?? [])];
      } else {
        _filteredMembers = members?.filter((member) => {
          return (
            member.name.toLowerCase().startsWith(event.query.toLowerCase()) ||
            member.visa.toLowerCase().startsWith(event.query.toLowerCase())
          );
        });
      }

      setFilteredMembers(_filteredMembers);
    }, 250);
  };

  return (
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <Expand open={isAdvanced} duration={300}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="startDate"
              className="text-sm mb-1 p-text-secondary"
            >
              {t('startDate')}
            </label>
            <Calendar
              id="startDate"
              inputId="startDate"
              name="startDate"
              placeholder={t('selectRange')}
              value={formik.values.startDate}
              onChange={formik.handleChange}
              selectionMode="range"
              readOnlyInput
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="endDate" className="text-sm mb-1 p-text-secondary">
              {t('endDate')}
            </label>
            <Calendar
              id="endDate"
              inputId="endDate"
              name="endDate"
              placeholder={t('selectRange')}
              value={formik.values.endDate}
              onChange={formik.handleChange}
              selectionMode="range"
              readOnlyInput
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="containMember"
              className="text-sm mb-1 p-text-secondary"
            >
              {t('containMember')}
            </label>
            <AutoComplete
              name="containMember"
              inputClassName="w-full"
              inputId="containMember"
              placeholder={t('enterVisa')}
              value={formik.values.containMember}
              suggestions={filteredMembers}
              completeMethod={searchMember}
              field="name"
              onChange={formik.handleChange}
            />
          </div>
        </div>
      </Expand>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4 mb-8">
        <div className="flex flex-col">
          <label htmlFor="keyword" className="text-sm mb-1 p-text-secondary">
            {t('relatedName')}
          </label>
          <InputText
            id="keyword"
            name="keyword"
            value={formik.values.keyword}
            placeholder={t('baseSearchInfo')}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="status" className="text-sm mb-1 p-text-secondary">
            {t('projectStatus')}
          </label>
          <Dropdown
            inputId="status"
            name="status"
            options={statuses}
            value={formik.values.status}
            optionLabel="name"
            optionValue="name"
            placeholder={t('projectStatus')}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex items-end">
          <Button
            type="submit"
            icon="pi pi-search"
            label={t('searchProject')}
            className="w-max lg:w-full"
          />
        </div>
        <div className="flex items-end">
          <Button
            type="button"
            icon="pi pi-times"
            className="p-button-outlined p-button-secondary md:w-max"
            label={t('resetSearch')}
            onClick={onResetForm}
          />
        </div>
        <div className="flex items-end">
          <div className="h-12 flex items-center space-x-2">
            <Checkbox
              inputId="advanced"
              checked={isAdvanced}
              onChange={(e) => onCheckAdvanced?.(e.checked)}
            />
            <label htmlFor="advanced">{t('useAdvanced')}</label>
          </div>
        </div>
      </div>
    </form>
  );
};

export default React.memo(ProjectFilter);
