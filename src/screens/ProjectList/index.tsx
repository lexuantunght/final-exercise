import { LinearProgress } from "@material-ui/core";
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import useProjects from "../../hooks/useProjects";
import paginatorTemp from "../../common/paginatorTemp";
import { IProject } from "../../models/IProject";
import moment from "moment";

const columns = [
  {
    field: "number",
    headerName: "Number",
  },
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "customer",
    headerName: "Customer",
  },
  {
    field: "startDate",
    headerName: "Start Date",
  },
  {
    field: "endDate",
    headerName: "End Date",
  },
  {
    field: "group",
    headerName: "Group",
  },
  {
    field: "members",
    headerName: "Members",
  },
  {
    field: "status",
    headerName: "Status",
  },
];

const ProjectList: React.FC = () => {
  const { data, isLoading } = useProjects();

  const mapDisplayDate = (project: IProject) =>
    Object.assign(project, {
      startDate: moment(project.startDate).format("yyyy-MM-dd"),
      endDate: moment(project.endDate).format("yyyy-MM-dd"),
    });

  return isLoading ? (
    <LinearProgress />
  ) : (
    <div className="w-full pt-4">
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
    </div>
  );
};

export default ProjectList;
