const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const KEY = "hms_mock_data";

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    rooms: [
      { id: "r1", number: "101", type: "Single", capacity: 1, occupied: 1 },
      { id: "r2", number: "102", type: "Double", capacity: 2, occupied: 1 },
      { id: "r3", number: "201", type: "Double", capacity: 2, occupied: 2 },
    ],
    applications: [],
    complaints: [],
    payments: [
      { id: "p1", student: "Student User", amount: 1200, status: "Paid", date: "2024-09-12" },
      { id: "p2", student: "Student User", amount: 1200, status: "Pending", date: "2025-01-12" },
    ],
  };
}
function save(db) {
  localStorage.setItem(KEY, JSON.stringify(db));
}
function uid() {
  return String(Date.now() + Math.random());
}

// PUBLIC_INTERFACE
export const dataService = {
  /** Generic getter for entity arrays */
  async list(entity) {
    await delay(200);
    const db = load();
    return db[entity] || [];
  },
  // PUBLIC_INTERFACE
  async create(entity, record) {
    await delay(250);
    const db = load();
    const rec = { id: uid(), ...record };
    db[entity] = [...(db[entity] || []), rec];
    save(db);
    return rec;
  },
  // PUBLIC_INTERFACE
  async update(entity, id, patch) {
    await delay(250);
    const db = load();
    db[entity] = (db[entity] || []).map((r) => (r.id === id ? { ...r, ...patch } : r));
    save(db);
    return db[entity].find((r) => r.id === id);
  },
  // PUBLIC_INTERFACE
  async remove(entity, id) {
    await delay(200);
    const db = load();
    db[entity] = (db[entity] || []).filter((r) => r.id !== id);
    save(db);
    return true;
  },
  // PUBLIC_INTERFACE
  async getStats() {
    await delay(150);
    const db = load();
    const totalRooms = db.rooms.length;
    const occupied = db.rooms.reduce((acc, r) => acc + r.occupied, 0);
    const capacity = db.rooms.reduce((acc, r) => acc + r.capacity, 0);
    const occupancyRate = capacity ? Math.round((occupied / capacity) * 100) : 0;
    const paid = db.payments.filter((p) => p.status === "Paid").length;
    const pending = db.payments.filter((p) => p.status !== "Paid").length;
    return { totalRooms, capacity, occupied, occupancyRate, payments: { paid, pending } };
  },
};
