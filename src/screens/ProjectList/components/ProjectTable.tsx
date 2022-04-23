import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { TFunction } from 'react-i18next';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Column } from 'primereact/column';
import { Paginator, PaginatorPageState } from 'primereact/paginator';
import { confirmDialog } from 'primereact/confirmdialog';
import { Project } from '../../../models/Project';
import paginatorTemp from '../../../common/components/paginatorTemp';

const ProjectTable: React.FC<{
  t: TFunction;
  data: any;
  limit: number;
  page: number;
  onChangePage: (e: PaginatorPageState) => void;
  selectedProjects: Project[];
  onSelectProject: CallableFunction;
  onUnselectProject: CallableFunction;
  onDelete?: CallableFunction;
}> = ({
  data,
  limit,
  page,
  onChangePage,
  t,
  selectedProjects,
  onSelectProject,
  onUnselectProject,
  onDelete,
}) => {
  const onClickDelete = (projects: Project[]) => {
    const notNewProjects = projects
      .filter((p) => p.status !== 'New')
      .map((p) => p.name);
    const newProject = projects
      .filter((p) => p.status === 'New')
      .map((p) => p.name);
    confirmDialog({
      message: (
        <>
          <span>{`${t('confirmMsg')} ${newProject.join(', ')}?`}</span>
          {notNewProjects.length > 0 && (
            <>
              <br />
              <span className="text-yellow-500">{`Project which status isn't New can't be deleted (${notNewProjects.join(
                ', '
              )})`}</span>
            </>
          )}
        </>
      ),
      header: t('confirmation'),
      icon: 'pi pi-exclamation-triangle',
      accept: () =>
        onDelete?.(
          projects.filter((p) => p.status === 'New').map((p) => p.number)
        ),
      className: 'w-5/6 md:w-1/2 xl:w-1/3',
    });
  };
  const columns = [
    {
      field: 'select',
      body: (rowData: Project) => (
        <Checkbox
          checked={selectedProjects.some((p) => p.number === rowData.number)}
          onChange={(e) => {
            if (e.checked) {
              onSelectProject(rowData);
              return;
            }
            onUnselectProject(rowData.number);
          }}
        />
      ),
    },
    {
      field: 'number',
      headerName: t('number'),
      body: (rowData: Project) => (
        <Link to={`/edit-project/${rowData.number}`} className="text-blue-500">
          {rowData.number}
        </Link>
      ),
    },
    {
      field: 'name',
      headerName: t('name'),
    },
    {
      field: 'customer',
      headerName: t('customer'),
    },
    {
      field: 'startDate',
      headerName: t('startDate'),
      body: (rowData: Project) =>
        moment(rowData.startDate).format('yyyy-MM-DD'),
    },
    {
      field: 'endDate',
      headerName: t('endDate'),
      body: (rowData: Project) =>
        rowData.endDate ? moment(rowData.endDate).format('yyyy-MM-DD') : '',
    },
    {
      field: 'group',
      headerName: t('group'),
    },
    {
      field: 'members',
      headerName: t('members'),
      body: (rowData: Project) => rowData.members.map((m) => m.name).join(', '),
    },
    {
      field: 'status',
      headerName: t('status'),
    },
    {
      field: 'delete',
      headerName: t('delete'),
      body: (rowData: Project) =>
        rowData.status === 'New' && (
          <Button
            icon="pi pi-trash"
            className="p-button-danger p-button-text"
            onClick={() => onClickDelete([rowData])}
          />
        ),
    },
  ];
  return (
    <>
      <DataTable
        value={data?.projects}
        responsiveLayout="scroll"
        rowHover
        showGridlines
        removableSort
        footer={
          selectedProjects.length > 0 && (
            <div className="flex justify-between items-center">
              <div className="text-blue-500">
                {`${selectedProjects.length} ` +
                  (selectedProjects.length > 1
                    ? t('itemsSelected')
                    : t('itemSelected'))}
              </div>
              <Button
                icon="pi pi-trash font-bold"
                iconPos="right"
                className="p-button-text p-button-danger"
                label={
                  selectedProjects.length > 1
                    ? t('deleteSelectedItems')
                    : t('deleteSelectedItem')
                }
                disabled={!selectedProjects.some((p) => p.status === 'New')}
                onClick={() => onClickDelete(selectedProjects)}
              />
            </div>
          )
        }
      >
        {columns.map((col, key) => (
          <Column
            field={col.field}
            header={col.headerName}
            key={key}
            body={col.body}
            sortable={
              col.field !== 'members' &&
              col.field !== 'delete' &&
              col.field !== 'select'
            }
          ></Column>
        ))}
      </DataTable>
      {data && data.projects.length > 0 && (
        <Paginator
          className="mt-3"
          template={paginatorTemp}
          rows={limit}
          first={page * limit}
          totalRecords={data?.totalRecords}
          onPageChange={onChangePage}
        />
      )}
    </>
  );
};

export default React.memo(ProjectTable);
