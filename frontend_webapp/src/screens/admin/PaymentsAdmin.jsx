import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import { dataService } from "../../services/mock/dataService";
import { useUI } from "../../modules/ui/UIContext";

export default function PaymentsAdmin() {
  const [payments, setPayments] = useState([]);
  const [editing, setEditing] = useState(null);
  const { showToast } = useUI();

  const refresh = () => dataService.list("payments").then(setPayments);
  useEffect(() => { refresh(); }, []);

  const onSave = async (e) => {
    e.preventDefault();
    if (editing.id) {
      await dataService.update("payments", editing.id, editing);
      showToast("Payment updated");
    } else {
      await dataService.create("payments", editing);
      showToast("Payment added");
    }
    setEditing(null);
    refresh();
  };

  const onDelete = async (row) => {
    await dataService.remove("payments", row.id);
    showToast("Payment deleted");
    refresh();
  };

  const columns = [
    { key: "student", header: "Student" },
    { key: "amount", header: "Amount", render: (v) => `$${v}` },
    { key: "status", header: "Status" },
    { key: "date", header: "Date" },
  ];

  return (
    <>
      <Card>
        <CardHeader
          title="Payments"
          subtitle="Track and manage payments"
          actions={<Button onClick={() => setEditing({ student: "", amount: 0, status: "Pending", date: new Date().toISOString().slice(0,10) })}>Add Payment</Button>}
        />
        <CardBody>
          <Table
            columns={columns}
            data={payments}
            actions={(row) => (
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => setEditing(row)}>Edit</Button>
                <Button size="sm" variant="danger" onClick={() => onDelete(row)}>Delete</Button>
              </div>
            )}
          />
        </CardBody>
      </Card>

      <Modal
        open={!!editing}
        title={editing?.id ? "Edit Payment" : "Add Payment"}
        onClose={() => setEditing(null)}
        actions={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={onSave}>{editing?.id ? "Save" : "Create"}</Button>
          </div>
        }
      >
        {editing && (
          <form className="grid gap-3" onSubmit={onSave}>
            <Input label="Student" value={editing.student} onChange={(e) => setEditing((r) => ({ ...r, student: e.target.value }))} required />
            <Input label="Amount" type="number" value={editing.amount} onChange={(e) => setEditing((r) => ({ ...r, amount: Number(e.target.value) }))} required />
            <Input label="Status" value={editing.status} onChange={(e) => setEditing((r) => ({ ...r, status: e.target.value }))} required />
            <Input label="Date" type="date" value={editing.date} onChange={(e) => setEditing((r) => ({ ...r, date: e.target.value }))} required />
          </form>
        )}
      </Modal>
    </>
  );
}
