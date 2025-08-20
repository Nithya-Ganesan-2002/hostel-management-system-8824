import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { dataService } from "../../services/mock/dataService";
import { useUI } from "../../modules/ui/UIContext";

export default function ComplaintsAdmin() {
  const [complaints, setComplaints] = useState([]);
  const { showToast } = useUI();

  const refresh = () => dataService.list("complaints").then(setComplaints);
  useEffect(() => { refresh(); }, []);

  const resolve = async (row) => {
    await dataService.update("complaints", row.id, { status: "Resolved" });
    showToast("Complaint resolved");
    refresh();
  };

  const columns = [
    { key: "message", header: "Complaint" },
    { key: "status", header: "Status" },
    { key: "date", header: "Date" },
  ];

  return (
    <Card>
      <CardHeader title="Complaints" subtitle="Review and resolve complaints" />
      <CardBody>
        <Table
          columns={columns}
          data={complaints}
          actions={(row) => (
            <Button size="sm" onClick={() => resolve(row)} disabled={row.status === "Resolved"}>
              {row.status === "Resolved" ? "Resolved" : "Mark Resolved"}
            </Button>
          )}
        />
      </CardBody>
    </Card>
  );
}
