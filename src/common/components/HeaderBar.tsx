import React from "react";
import { Menubar } from "primereact/menubar";
import { useHistory } from "react-router-dom";

const HeaderBar: React.FC = () => {
  const history = useHistory();
  const items = [
    {
      label: "HOME",
      icon: "pi pi-home",
      command: () => history.push("/home"),
    },
    {
      label: "PROJECT LIST",
      icon: "pi pi-list",
      command: () => history.push("/project-list"),
    },
  ];

  return <Menubar model={items} />;
};

export default React.memo(HeaderBar);
