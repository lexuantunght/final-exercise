import React from 'react';
import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import PageWrapper from '../../common/components/PageWrapper';
import { BasePageProps } from '../../common/models';
import OverviewItem from './components/OverviewItem';
import useFetchHomeData from '../../hooks/useHomeData';
import LoadingMask from '../../common/components/LoadingMask';
import { useHistory } from 'react-router-dom';

const DashboardPage: React.FC<BasePageProps> = (props) => {
  const { t } = props;
  const { data, isLoading } = useFetchHomeData();
  const history = useHistory();
  if (isLoading) {
    return <LoadingMask />;
  }
  return (
    <PageWrapper>
      <Panel header={t('overview')} className="mb-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
          <OverviewItem
            title={t('projects')}
            value={data?.projectCount}
            onClick={() => history.push('project-list')}
          />
          <OverviewItem
            title={t('members')}
            value={data?.memberCount}
            icon="pi-users"
            variant="success"
          />
          <OverviewItem
            title={t('groups')}
            value={data?.groupCount}
            icon="pi-sitemap"
            variant="help"
          />
        </div>
        <DataTable
          value={data?.statusesWithProjects}
          responsiveLayout="scroll"
          rowHover
          showGridlines
        >
          <Column field="code" header={t('statusCode')}></Column>
          <Column field="name" header={t('statusName')}></Column>
          <Column
            field="projects"
            header={t('numberOfProjects')}
            body={(rowData) => rowData?.projects.length}
          ></Column>
          <Column header={t('options')}>View</Column>
        </DataTable>
      </Panel>
      <Panel header={t('recentProjects')}></Panel>
    </PageWrapper>
  );
};

export default DashboardPage;
