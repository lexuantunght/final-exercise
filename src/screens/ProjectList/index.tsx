import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import useProjects from '../../hooks/useProjects';
import paginatorTemp from '../../common/components/paginatorTemp';
import { IProject } from '../../models/IProject';
import moment from 'moment';
import LoadingMask from '../../common/components/LoadingMask';
import PageWrapper from '../../common/components/PageWrapper';

const columns = [
    {
        field: 'number',
        headerName: 'Number',
    },
    {
        field: 'name',
        headerName: 'Name',
    },
    {
        field: 'customer',
        headerName: 'Customer',
    },
    {
        field: 'startDate',
        headerName: 'Start Date',
    },
    {
        field: 'endDate',
        headerName: 'End Date',
    },
    {
        field: 'group',
        headerName: 'Group',
    },
    {
        field: 'members',
        headerName: 'Members',
    },
    {
        field: 'status',
        headerName: 'Status',
    },
];

const ProjectList: React.FC = () => {
    const { data, isLoading } = useProjects();

    const mapDisplayDate = (project: IProject) =>
        Object.assign(project, {
            startDate: moment(project.startDate).format('yyyy-MM-DD'),
            endDate: moment(project.endDate).format('yyyy-MM-DD'),
        });

    if (isLoading) {
        return <LoadingMask />;
    }

    return (
        <PageWrapper>
            <Card>
                <DataTable
                    value={data?.map(mapDisplayDate)}
                    paginator
                    paginatorTemplate={paginatorTemp}
                    first={0}
                    rows={10}
                    onPage={() => {}}
                    paginatorClassName="justify-content-end"
                    responsiveLayout="scroll"
                    rowHover
                    showGridlines
                >
                    {columns.map((col, key) => (
                        <Column
                            field={col.field}
                            header={col.headerName}
                            key={key}
                        ></Column>
                    ))}
                </DataTable>
            </Card>
        </PageWrapper>
    );
};

export default ProjectList;
