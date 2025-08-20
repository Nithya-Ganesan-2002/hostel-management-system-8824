import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import { dataService } from "../../services/mock/dataService";
import { useUI } from "../../modules/ui/UIContext";

export default function RoomsAdmin() {
  const [rooms, setRooms] = useState([]);
  const [editing, setEditing] = useState(null);
  const { showToast } = useUI();

  const refresh = () => dataService.list("rooms").then(setRooms);
  useEffect(() => { refresh(); }, []);

  const onSave = async (e) => {
    e.preventDefault();
    if (editing.id) {
      await dataService.update("rooms", editing.id, editing);
      showToast("Room updated");
    } else {
      await dataService.create("rooms", editing);
      showToast("Room added");
    }
    setEditing(null);
    refresh();
  };

  const onDelete = async (row) => {
    await dataService.remove("rooms", row.id);
    showToast("Room deleted");
    refresh();
  };

  const columns = [
    { key: "number", header: "Room" },
    { key: "type", header: "Type" },
    { key: "capacity", header: "Capacity" },
    { key: "occupied", header: "Occupied" },
  ];

  return (
    <>
      <Card>
        <CardHeader
          title="Manage Rooms"
          subtitle="Add, edit or remove rooms"
          actions={<Button onClick={() => setEditing({ number: "", type: "Single", capacity: 1, occupied: 0 })}>Add Room</Button>}
        />
        <CardBody>
          <Table
            columns={columns}
            data={rooms}
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
        title={editing?.id ? "Edit Room" : "Add Room"}
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
            <Input label="Room Number" value={editing.number} onChange={(e) => setEditing((r) => ({ ...r, number: e.target.value }))} required />
            <Input label="Type" value={editing.type} onChange={(e) => setEditing((r) => ({ ...r, type: e.target.value }))} required />
            <Input label="Capacity" type="number" value={editing.capacity} onChange={(e) => setEditing((r) => ({ ...r, capacity: Number(e.target.value) }))} required />
            <Input label="Occupied" type="number" value={editing.occupied} onChange={(e) => setEditing((r) => ({ ...r, occupied: Number(e.target.value) }))} required />
          </form>
        )}
      </Modal>
    </>
  );
}
