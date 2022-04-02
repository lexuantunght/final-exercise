import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import useFetchProjects from '../../hooks/useProjects';
import paginatorTemp from '../../common/components/paginatorTemp';
import { Project } from '../../models/Project';
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
    body: (rowData: Project) => moment(rowData.startDate).format('yyyy-MM-DD'),
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    body: (rowData: Project) => moment(rowData.endDate).format('yyyy-MM-DD'),
  },
  {
    field: 'group',
    headerName: 'Group',
  },
  {
    field: 'members',
    headerName: 'Members',
    body: (rowData: Project) => rowData.members.map((m) => m.name).join(', '),
  },
  {
    field: 'status',
    headerName: 'Status',
  },
];

const ProjectList: React.FC = () => {
  const { data, isLoading } = useFetchProjects();

  if (isLoading) {
    return <LoadingMask />;
  }

  return (
    <PageWrapper>
      <Card className="flex-1">
        <DataTable
          value={data}
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
              body={col.body}
            ></Column>
          ))}
        </DataTable>
      </Card>
    </PageWrapper>
  );
};

export default ProjectList;
