import React from 'react';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { useHistory, useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import PageWrapper from '../../common/components/PageWrapper';
import { BasePageProps } from '../../common/models';
import ProjectInputForm from '../CreateProject/components/ProjectInputForm';
import useFetchGroups from '../../hooks/useGroups';
import useFetchStatuses from '../../hooks/useStatuses';
import useFetchMemers from '../../hooks/useMembers';
import LoadingMask from '../../common/components/LoadingMask';
import { RootState } from '../../utils/redux/store';
import { GET_ALL_PROJECT_KEY } from '../../common/QueryKeys';
import { DispatchType } from '../../common/constants';
import useGetProject from '../../hooks/useGetProject';
import useEditProject from '../../hooks/useEditProject';

const EditProjectPage: React.FC<BasePageProps> = (props) => {
  const { t } = props;
  const pushInfo = React.useRef<any>(null);
  const { projectNumber } = useParams<{ projectNumber?: string }>();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const history = useHistory();
  const { data: groups, isLoading: isGroupsLoading } = useFetchGroups();
  const { data: statuses, isLoading: isStatusesLoading } = useFetchStatuses();
  const { data: members, isLoading: isMembersLoading } = useFetchMemers();
  const { data: project, isLoading } = useGetProject(Number(projectNumber));
  const filteredMembers = useSelector(
    (state: RootState) => state.create_proj.filteredMembers
  );
  const { mutateAsync } = useEditProject();

  const onEditProject = async (values: any) => {
    const res = await mutateAsync({ projectNumber, data: values });
    if (res.status === 'success') {
      queryClient.invalidateQueries(GET_ALL_PROJECT_KEY);
      history.push('/project-list');
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

  if (isLoading || isGroupsLoading || isStatusesLoading || isMembersLoading) {
    return <LoadingMask />;
  }

  return (
    <PageWrapper>
      <Card>
        <div className="flex justify-center">
          <div className="w-full md:w-3/5 xl:w-1/2">
            <div className="font-bold md:text-lg">{t('editProject')}</div>
            <Divider />
            <ProjectInputForm
              t={t}
              isEdit
              statuses={statuses}
              groups={groups}
              onSubmitProject={onEditProject}
              filteredMembers={filteredMembers}
              searchMember={searchMember}
              onCancel={() => history.push('/project-list')}
              onShowErrorInput={showErrorInput}
              project={project}
            />
          </div>
        </div>
      </Card>
      <Toast ref={pushInfo} position="top-right" />
    </PageWrapper>
  );
};

export default EditProjectPage;
