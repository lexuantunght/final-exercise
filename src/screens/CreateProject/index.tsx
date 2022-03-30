import React from 'react';
import * as Yup from 'yup';
import PageWrapper from '../../common/components/PageWrapper';
import { BasePageProps } from '../../common/models';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { AutoComplete } from 'primereact/autocomplete';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { FormikHelpers, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../utils/redux/store';
import { DispatchType } from '../../common/constants';
import useFetchGroups from '../../hooks/useGroups';
import LoadingMask from '../../common/components/LoadingMask';
import useFetchStatuses from '../../hooks/useStatuses';
import useFetchMembers from '../../hooks/useMembers';
import { useHistory } from 'react-router-dom';
import useAddProject from '../../hooks/useAddProject';
import { useQueryClient } from 'react-query';
import { GET_ALL_PROJECT_KEY } from '../../common/QueryKeys';
const CreateProjectPage: React.FC<BasePageProps> = (props) => {
  const { t } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const pushInfo = React.useRef<any>(null);
  const queryClient = useQueryClient();
  const { data: groups, isLoading: isGroupsLoading } = useFetchGroups();
  const { data: statuses, isLoading: isStatusesLoading } = useFetchStatuses();
  const { data: members, isLoading: isMembersLoading } = useFetchMembers();
  const filteredMembers = useSelector(
    (state: RootState) => state.create_proj.filteredMembers
  );
  const { mutateAsync } = useAddProject();

  const onAddProject = async (
    values: any,
    { resetForm }: FormikHelpers<any>
  ) => {
    await mutateAsync(values);
    queryClient.invalidateQueries(GET_ALL_PROJECT_KEY);
    resetForm();
    showAddSuccess();
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

      dispatch({
        type: DispatchType.CREATE_PROJ.FILTERED_MEMS,
        data: _filteredMembers,
      });
    }, 250);
  };

  const showErrorInput = (isShow: boolean) => {
    if (isShow && pushInfo.current) {
      pushInfo.current.show({
        severity: 'error',
        summary: t('errorInput'),
        detail: t('pleaseInput'),
        life: 3000,
      });
    }
  };

  const showAddSuccess = () => {
    if (pushInfo.current) {
      pushInfo.current.show({
        severity: 'success',
        summary: t('success'),
        detail: t('addProjectSuccess'),
        life: 3000,
      });
    }
  };

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
    onSubmit: onAddProject,
  });

  if (isGroupsLoading || isStatusesLoading || isMembersLoading) {
    return <LoadingMask />;
  }

  return (
    <PageWrapper>
      <Card>
        <div className="flex justify-center">
          <div className="w-full md:w-3/5 xl:w-1/2">
            <div className="font-bold md:text-lg">{t('newProject')}</div>
            <Divider />
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div className="flex flex-col space-y-2">
                <label htmlFor="number">{t('projectNumber')}</label>
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
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="name">{t('projectName')}</label>
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
                <label htmlFor="customer">{t('customer')}</label>
                <InputText
                  id="customer"
                  name="customer"
                  value={formik.values.customer}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.customer && formik.errors.customer
                      ? 'p-invalid'
                      : ''
                  }
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="group">{t('group')}</label>
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
                    formik.touched.group && formik.errors.group
                      ? 'p-invalid'
                      : ''
                  }
                />
              </div>
              <div className="flex flex-col space-y-2 p-fluid">
                <label htmlFor="members">{t('members')}</label>
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
                    formik.touched.members && formik.errors.members
                      ? 'p-invalid'
                      : ''
                  }
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="status">{t('status')}</label>
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
                    formik.touched.status && formik.errors.status
                      ? 'p-invalid'
                      : ''
                  }
                />
              </div>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:justify-between pb-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="startDate">{t('startDate')}</label>
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
                      formik.touched.endDate && formik.errors.endDate
                        ? 'p-invalid'
                        : ''
                    }
                  />
                </div>
              </div>
              <Divider />
              <div className="flex justify-end md:space-x-10 space-x-4 mb-4 pt-4">
                <Button
                  type="button"
                  icon="pi pi-times"
                  className="p-button-danger"
                  label={t('cancel')}
                  onClick={() => history.push('/project-list')}
                  disabled={formik.isSubmitting}
                />
                <Button
                  type="submit"
                  icon="pi pi-check"
                  label={t('create')}
                  onClick={() =>
                    formik
                      .validateForm()
                      .then((err) =>
                        showErrorInput(Object.keys(err).length > 0)
                      )
                  }
                  loading={formik.isSubmitting}
                  disabled={!formik.isValid || formik.isSubmitting}
                />
              </div>
            </form>
          </div>
        </div>
      </Card>
      <Toast ref={pushInfo} position="top-right" />
    </PageWrapper>
  );
};

export default CreateProjectPage;
