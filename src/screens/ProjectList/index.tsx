import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Calendar, CalendarChangeParams } from 'primereact/calendar';
import { Button } from 'primereact/button';
import {
  AutoComplete,
  AutoCompleteChangeParams,
} from 'primereact/autocomplete';
import { Checkbox, CheckboxChangeParams } from 'primereact/checkbox';
import Expand from 'react-expand-animated';
import { Paginator, PaginatorPageState } from 'primereact/paginator';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../utils/redux/store';
import LoadingMask from '../../common/components/LoadingMask';
import PageWrapper from '../../common/components/PageWrapper';
import useFetchProjects from '../../hooks/useProjects';
import paginatorTemp from '../../common/components/paginatorTemp';
import { Project } from '../../models/Project';
import { DispatchType } from '../../common/constants';
import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';
import useFetchStatuses from '../../hooks/useStatuses';
import useFetchMemers from '../../hooks/useMembers';

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
    body: (rowData: Project) =>
      rowData.endDate ? moment(rowData.endDate).format('yyyy-MM-DD') : '',
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
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const page = useSelector((state: RootState) => state.list_proj.page);
  const limit = useSelector((state: RootState) => state.list_proj.limit);
  const isAdvanced = useSelector(
    (state: RootState) => state.list_proj.isAdvanced
  );
  const startDate = useSelector(
    (state: RootState) => state.list_proj.startDate
  );
  const endDate = useSelector((state: RootState) => state.list_proj.endDate);
  const containMember = useSelector(
    (state: RootState) => state.list_proj.containMember
  );
  const filteredMembers = useSelector(
    (state: RootState) => state.list_proj.filteredMembers
  );
  const { data, isLoading } = useFetchProjects({ page, limit });
  const { data: statuses, isLoading: isStatusLoading } = useFetchStatuses();
  const { data: members, isLoading: isMembersLoading } = useFetchMemers();

  const onChangePage = (e: PaginatorPageState) => {
    dispatch({ type: DispatchType.LIST_PROJ.PAGE, data: e.page });
    dispatch({ type: DispatchType.LIST_PROJ.LIMIT, data: e.rows });
  };

  const onCheckAdvanced = (e: CheckboxChangeParams) => {
    dispatch({ type: DispatchType.LIST_PROJ.ADVANCED, data: e.checked });
  };

  const onChangeStartDate = (e: CalendarChangeParams) => {
    dispatch({ type: DispatchType.LIST_PROJ.START_DATE, data: e.value });
  };

  const onChangeEndDate = (e: CalendarChangeParams) => {
    dispatch({ type: DispatchType.LIST_PROJ.END_DATE, data: e.value });
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
        type: DispatchType.LIST_PROJ.FILTERED_MEMBERS,
        data: _filteredMembers,
      });
    }, 250);
  };

  const onChangeContainMembers = (e: AutoCompleteChangeParams) => {
    dispatch({ type: DispatchType.LIST_PROJ.CONTAIN_MEMBERS, data: e.value });
  };

  if (isLoading || isStatusLoading || isMembersLoading) {
    return <LoadingMask />;
  }

  return (
    <PageWrapper>
      <Card className="flex-1">
        <Expand open={isAdvanced} duration={300}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="startDate"
                className="text-sm mb-1 p-text-secondary"
              >
                {t('startDate')}
              </label>
              <Calendar
                id="startDate"
                inputId="startDate"
                name="startDate"
                placeholder={t('selectRange')}
                value={startDate}
                onChange={onChangeStartDate}
                selectionMode="range"
                readOnlyInput
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="endDate"
                className="text-sm mb-1 p-text-secondary"
              >
                {t('endDate')}
              </label>
              <Calendar
                id="endDate"
                inputId="endDate"
                name="endDate"
                placeholder={t('selectRange')}
                value={endDate}
                onChange={onChangeEndDate}
                selectionMode="range"
                readOnlyInput
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="containMember"
                className="text-sm mb-1 p-text-secondary"
              >
                {t('containMember')}
              </label>
              <AutoComplete
                name="containMember"
                inputId="containMember"
                placeholder={t('enterVisa')}
                value={containMember}
                suggestions={filteredMembers}
                completeMethod={searchMember}
                field="name"
                onChange={onChangeContainMembers}
              />
            </div>
          </div>
        </Expand>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4 mb-8">
          <InputText placeholder={t('baseSearchInfo')} />
          <Dropdown
            options={statuses}
            optionLabel="name"
            optionValue="name"
            placeholder={t('projectStatus')}
          />
          <Button
            icon="pi pi-search"
            label={t('searchProject')}
            className="md:w-max"
          />
          <Button
            icon="pi pi-times"
            className="p-button-outlined p-button-secondary md:w-max"
            label={t('resetSearch')}
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              inputId="advanced"
              checked={isAdvanced}
              onChange={onCheckAdvanced}
            />
            <label htmlFor="advanced">{t('useAdvanced')}</label>
          </div>
        </div>
        <DataTable
          value={data?.projects}
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
        {data && data.projects && (
          <Paginator
            className="mt-3"
            template={paginatorTemp}
            rows={limit}
            first={page * limit}
            totalRecords={data?.totalRecords}
            onPageChange={onChangePage}
          />
        )}
      </Card>
    </PageWrapper>
  );
};

export default ProjectList;
