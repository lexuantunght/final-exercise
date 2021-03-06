import React from 'react';
import PageWrapper from '../../common/components/PageWrapper';
import { BasePageProps } from '../../common/models';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { FormikHelpers } from 'formik';
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
import ProjectInputForm from './components/ProjectInputForm';
import { Toast } from 'primereact/toast';

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
    const res = await mutateAsync(values);
    if (res.status === 'success') {
      queryClient.invalidateQueries(GET_ALL_PROJECT_KEY);
      resetForm();
      showAddSuccess();
    }
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
            <ProjectInputForm
              t={t}
              statuses={statuses}
              groups={groups}
              onSubmitProject={onAddProject}
              filteredMembers={filteredMembers}
              searchMember={searchMember}
              onCancel={() => history.push('/project-list')}
              onShowErrorInput={showErrorInput}
            />
          </div>
        </div>
      </Card>
      <Toast ref={pushInfo} position="top-right" />
    </PageWrapper>
  );
};

export default CreateProjectPage;
