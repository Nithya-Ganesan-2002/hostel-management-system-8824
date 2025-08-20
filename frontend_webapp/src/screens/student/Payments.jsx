import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import { dataService } from "../../services/mock/dataService";

export default function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    dataService.list("payments").then(setPayments);
  }, []);

  const columns = [
    { key: "student", header: "Student" },
    { key: "amount", header: "Amount", render: (v) => `$${v}` },
    { key: "status", header: "Status" },
    { key: "date", header: "Date" },
  ];

  return (
    <Card>
      <CardHeader title="Payments" subtitle="Your payment history" />
      <CardBody>
        <Table columns={columns} data={payments} />
      </CardBody>
    </Card>
  );
}
