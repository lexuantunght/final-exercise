import React from 'react';
import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import PageWrapper from '../../common/components/PageWrapper';
import { BasePageProps } from '../../common/models';
import OverviewItem from './components/OverviewItem';

const DashboardPage: React.FC<BasePageProps> = (props) => {
    const { t } = props;
    return (
        <PageWrapper>
            <Panel header={t('overview')} className="mb-4">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                    <OverviewItem title={t('projects')} value={1000} />
                    <OverviewItem
                        title={t('members')}
                        value={1000}
                        icon="pi-users"
                        variant="success"
                    />
                    <OverviewItem
                        title={t('groups')}
                        value={10}
                        icon="pi-sitemap"
                        variant="help"
                    />
                </div>
                <DataTable responsiveLayout="scroll" rowHover showGridlines>
                    <Column field="id" header={t('statusCode')}></Column>
                    <Column field="status" header={t('statusName')}></Column>
                    <Column
                        field="projects"
                        header={t('numberOfProjects')}
                    ></Column>
                    <Column header={t('options')}>View</Column>
                </DataTable>
            </Panel>
            <Panel header={t('recentProjects')}></Panel>
        </PageWrapper>
    );
};

export default DashboardPage;
