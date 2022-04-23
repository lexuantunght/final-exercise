import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import {
  AutoComplete,
  AutoCompleteCompleteMethodParams,
} from 'primereact/autocomplete';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { TFunction } from 'react-i18next';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { Group } from '../../../models/Group';
import { Status } from '../../../models/Status';

const ProjectInputForm: React.FC<{
  t: TFunction;
  isEdit?: boolean;
  onSubmitProject: (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => Promise<void>;
  groups?: Group[];
  statuses?: Status[];
  filteredMembers: any[];
  searchMember: (e: AutoCompleteCompleteMethodParams) => void;
  onCancel: () => void;
  onShowErrorInput?: CallableFunction;
}> = ({
  t,
  onSubmitProject,
  groups,
  statuses,
  filteredMembers,
  searchMember,
  onCancel,
  onShowErrorInput,
  isEdit,
}) => {
  const formik = useFormik({
    initialValues: {
      number: '',
      name: '',
      group: '',
      customer: '',
      members: [],
      status: '',
      startDate: new Date(),
      endDate: new Date(),
    },
    validationSchema: Yup.object({
      number: Yup.number().min(0).max(9999).required(),
      name: Yup.string().required(),
      group: Yup.string().required(),
      customer: Yup.string().required(),
      members: Yup.array().min(1).required(),
      status: Yup.string().required(),
      endDate: Yup.date().nullable(true),
      startDate: Yup.date()
        .required()
        .test('startDate-valid', '', function (value) {
          if (!value || !this.parent.endDate) {
            return true;
          }
          return this.parent.endDate.getTime() >= value.getTime();
        }),
    }),
    onSubmit: onSubmitProject,
  });

  return (
    <form className="space-y-4" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col space-y-2">
        <label htmlFor="number">
          {t('projectNumber')}
          <span className="text-red-500"> *</span>
        </label>
        <InputText
          id="number"
          name="number"
          value={formik.values.number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.number && formik.errors.number
              ? 'p-invalid w-max'
              : 'w-max'
          }
          disabled={isEdit}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="name">
          {t('projectName')}
          <span className="text-red-500"> *</span>
        </label>
        <InputText
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.name && formik.errors.name ? 'p-invalid' : ''
          }
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="customer">
          {t('customer')}
          <span className="text-red-500"> *</span>
        </label>
        <InputText
          id="customer"
          name="customer"
          value={formik.values.customer}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.customer && formik.errors.customer ? 'p-invalid' : ''
          }
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="group">
          {t('group')}
          <span className="text-red-500"> *</span>
        </label>
        <Dropdown
          inputId="group"
          name="group"
          options={groups}
          value={formik.values.group}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          optionLabel="name"
          optionValue="name"
          className={
            formik.touched.group && formik.errors.group ? 'p-invalid' : ''
          }
        />
      </div>
      <div className="flex flex-col space-y-2 p-fluid">
        <label htmlFor="members">
          {t('members')}
          <span className="text-red-500"> *</span>
        </label>
        <AutoComplete
          name="members"
          inputId="members"
          value={formik.values.members}
          suggestions={filteredMembers}
          completeMethod={searchMember}
          field="name"
          multiple
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.members && formik.errors.members ? 'p-invalid' : ''
          }
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="status">
          {t('status')}
          <span className="text-red-500"> *</span>
        </label>
        <Dropdown
          inputId="status"
          name="status"
          options={statuses}
          value={formik.values.status}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          optionLabel="name"
          optionValue="name"
          className={
            formik.touched.status && formik.errors.status ? 'p-invalid' : ''
          }
        />
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:justify-between pb-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="startDate">
            {t('startDate')}
            <span className="text-red-500"> *</span>
          </label>
          <Calendar
            inputId="startDate"
            name="startDate"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            showIcon
            className={
              formik.touched.startDate && formik.errors.startDate
                ? 'p-invalid'
                : ''
            }
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="endDate">{t('endDate')}</label>
          <Calendar
            inputId="endDate"
            name="endDate"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            minDate={formik.values.startDate}
            showIcon
            className={
              formik.touched.endDate && formik.errors.endDate ? 'p-invalid' : ''
            }
          />
        </div>
      </div>
      <Divider />
      <br />
      <span>
        <span className="text-red-500">(*) </span>
        {t('mandatory')}
      </span>
      <div className="flex justify-end md:space-x-10 space-x-4 mb-4 pt-4">
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-danger"
          label={t('cancel')}
          onClick={onCancel}
          disabled={formik.isSubmitting}
        />
        <Button
          type="button"
          icon="pi pi-check"
          label={isEdit ? t('edit') : t('create')}
          onClick={() =>
            formik.validateForm().then((err) => {
              formik.submitForm();
              onShowErrorInput?.(Object.keys(err).length > 0);
            })
          }
          loading={formik.isSubmitting}
          disabled={!formik.isValid || formik.isSubmitting}
        />
      </div>
    </form>
  );
};

export default ProjectInputForm;
