import React from 'react';
import { Card } from 'primereact/card';
import { PaginatorPageState } from 'primereact/paginator';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient } from 'react-query';
import { GET_ALL_PROJECT_KEY, GET_HOME_DATA_KEY } from '../../common/QueryKeys';
import { RootState } from '../../utils/redux/store';
import LoadingMask from '../../common/components/LoadingMask';
import PageWrapper from '../../common/components/PageWrapper';
import useFetchProjects from '../../hooks/useProjects';
import { DispatchType } from '../../common/constants';
import { useTranslation } from 'react-i18next';
import useFetchStatuses from '../../hooks/useStatuses';
import useFetchMemers from '../../hooks/useMembers';
import ProjectTable from './components/ProjectTable';
import ProjectFilter from './components/ProjectFilter';
import { Project } from '../../models/Project';
import useDeleteProject from '../../hooks/useDeleteProject';

const ProjectList: React.FC = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const page = useSelector((state: RootState) => state.list_proj.page);
  const limit = useSelector((state: RootState) => state.list_proj.limit);
  const searchData = useSelector(
    (state: RootState) => state.list_proj.searchData
  );
  const isAdvanced = useSelector(
    (state: RootState) => state.list_proj.isAdvanced
  );
  const selectedProjects = useSelector(
    (state: RootState) => state.list_proj.selectedProjects
  );
  const { data, isLoading } = useFetchProjects({
    page,
    limit,
    ...searchData,
  });
  const { data: statuses, isLoading: isStatusLoading } = useFetchStatuses();
  const { data: members, isLoading: isMembersLoading } = useFetchMemers();
  const { mutateAsync: deleteProject } = useDeleteProject();

  const onCheckAdvanced = (checked: boolean) => {
    dispatch({ type: DispatchType.LIST_PROJ.ADVANCED, data: checked });
  };

  const onChangePage = (e: PaginatorPageState) => {
    dispatch({ type: DispatchType.LIST_PROJ.PAGE, data: e.page });
    dispatch({ type: DispatchType.LIST_PROJ.LIMIT, data: e.rows });
  };

  const onSearchDataChange = (values: any) => {
    dispatch({ type: DispatchType.LIST_PROJ.SEARCH, data: values });
    dispatch({ type: DispatchType.LIST_PROJ.PAGE, data: 0 });
  };

  const onSelectProject = (project: Project) => {
    const temp = [...selectedProjects];
    temp.push(project);
    dispatch({ type: DispatchType.LIST_PROJ.SELECTED, data: temp });
  };

  const onUnselectProject = (projectNumber: number) => {
    const temp = [...selectedProjects];
    temp.splice(
      temp.findIndex((p) => p.number === projectNumber),
      1
    );
    dispatch({ type: DispatchType.LIST_PROJ.SELECTED, data: temp });
  };

  const onDeleteProject = (projectNumbers: number[]) => {
    deleteProject(projectNumbers).then((res) => {
      if (res.status === 'success') {
        dispatch({ type: DispatchType.LIST_PROJ.SELECTED, data: [] });
        queryClient.invalidateQueries(GET_ALL_PROJECT_KEY);
      }
    });
  };

  if (isLoading || isStatusLoading || isMembersLoading) {
    return <LoadingMask />;
  }

  return (
    <PageWrapper>
      <Card className="flex-1">
        <ProjectFilter
          t={t}
          statuses={statuses}
          members={members}
          isAdvanced={isAdvanced}
          searchData={searchData}
          onSearchDataChange={onSearchDataChange}
          onCheckAdvanced={onCheckAdvanced}
        />
        <ProjectTable
          t={t}
          data={data}
          page={page}
          limit={limit}
          onChangePage={onChangePage}
          selectedProjects={selectedProjects}
          onSelectProject={onSelectProject}
          onUnselectProject={onUnselectProject}
          onDelete={onDeleteProject}
        />
      </Card>
    </PageWrapper>
  );
};

export default ProjectList;
