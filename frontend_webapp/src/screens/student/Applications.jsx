import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import { dataService } from "../../services/mock/dataService";

export default function Applications() {
  const [applications, setApplications] = useState([]);

  const refresh = () => dataService.list("applications").then(setApplications);

  useEffect(() => {
    refresh();
  }, []);

  const columns = [
    { key: "room", header: "Room" },
    { key: "status", header: "Status" },
    { key: "date", header: "Date" },
  ];

  return (
    <Card>
      <CardHeader title="My Applications" subtitle="Track your room applications" />
      <CardBody>
        <Table columns={columns} data={applications} />
      </CardBody>
    </Card>
  );
}
