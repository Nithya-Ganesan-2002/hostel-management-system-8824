import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardFooter } from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { dataService } from "../../services/mock/dataService";
import { useUI } from "../../modules/ui/UIContext";

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [text, setText] = useState("");
  const { showToast } = useUI();

  const refresh = () => dataService.list("complaints").then(setComplaints);
  useEffect(() => { refresh(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await dataService.create("complaints", {
      message: text,
      status: "Submitted",
      date: new Date().toISOString().slice(0, 10),
    });
    setText("");
    showToast("Complaint submitted");
    refresh();
  };

  const columns = [
    { key: "message", header: "Complaint" },
    { key: "status", header: "Status" },
    { key: "date", header: "Date" },
  ];

  return (
    <Card>
      <CardHeader title="Complaints" subtitle="Submit and track your complaints" />
      <CardBody>
        <Table columns={columns} data={complaints} />
      </CardBody>
      <CardFooter>
        <form onSubmit={submit} className="flex gap-2">
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Describe your issue..." className="flex-1" />
          <Button type="submit">Submit</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
