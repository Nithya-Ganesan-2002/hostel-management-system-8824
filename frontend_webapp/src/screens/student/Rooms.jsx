import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { dataService } from "../../services/mock/dataService";
import { useUI } from "../../modules/ui/UIContext";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const { showToast } = useUI();

  useEffect(() => {
    dataService.list("rooms").then(setRooms);
  }, []);

  const apply = async (room) => {
    await dataService.create("applications", {
      roomId: room.id,
      room: room.number,
      status: "Pending",
      date: new Date().toISOString().slice(0, 10),
    });
    showToast("Application submitted");
  };

  const columns = [
    { key: "number", header: "Room" },
    { key: "type", header: "Type" },
    { key: "capacity", header: "Capacity" },
    { key: "occupied", header: "Occupied" },
  ];

  return (
    <Card>
      <CardHeader title="Room Availability" subtitle="Apply for a room" />
      <CardBody>
        <Table
          columns={columns}
          data={rooms}
          actions={(row) => (
            <Button size="sm" onClick={() => apply(row)} disabled={row.occupied >= row.capacity}>
              {row.occupied >= row.capacity ? "Full" : "Apply"}
            </Button>
          )}
        />
      </CardBody>
    </Card>
  );
}
