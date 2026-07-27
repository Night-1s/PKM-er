import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PartyMember {
  id: string;
  name: string;
  form?: string;
  // ER 2.65 4 能力系统：
  //   1 个普通特性（ability，3 选 1，可随时切换）
  //   + 3 个天性（innate，固定不变，出生即有）
  chosenAbility: string; // 当前选用的普通特性（3 选 1）
  innateAbilities: [string, string, string]; // 3 个天性
  moves: string[]; // 4 招式
  note?: string;
}

export type Difficulty = "EASY" | "EXPERT" | "ELITE" | "HELL";
export type LevelLimit = "simple" | "advanced" | "elite";
export type RunStatus = "not_started" | "in_progress" | "completed";

export interface RunRecord {
  id: string;
  title: string;
  difficulty: Difficulty;
  levelLimit: LevelLimit;
  singleType?: TypeId;
  status: RunStatus;
  party: PartyMember[];
  note?: string;
  completedAt?: string;
  updatedAt: number;
}

interface RunStore {
  records: RunRecord[];
  addRecord: (record?: Partial<RunRecord>) => string;
  updateRecord: (recordId: string, patch: Partial<RunRecord>) => void;
  removeRecord: (recordId: string) => void;
  addPartyMember: (recordId: string, member?: Partial<PartyMember>) => string;
  updatePartyMember: (recordId: string, memberId: string, patch: Partial<PartyMember>) => void;
  removePartyMember: (recordId: string, memberId: string) => void;
  setRecordNote: (recordId: string, note: string) => void;
  setRecordStatus: (recordId: string, status: RunStatus) => void;
  setCompletedAt: (recordId: string, date: string) => void;
  clearRecord: (recordId: string) => void;
  resetAll: () => void;
}

const DIFFICULTY_CN: Record<Difficulty, string> = {
  EASY: "简单",
  EXPERT: "高手",
  ELITE: "精英",
  HELL: "地狱",
};

function genId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function newRecord(partial?: Partial<RunRecord>): RunRecord {
  const recordCount = useRunStore.getState().records.length;
  return {
    id: genId(),
    title: partial?.title ?? `通关存档 ${recordCount + 1}`,
    difficulty: partial?.difficulty ?? "HELL",
    levelLimit: partial?.levelLimit ?? "elite",
    singleType: partial?.singleType,
    status: partial?.status ?? "in_progress",
    party: partial?.party ?? [],
    note: partial?.note,
    completedAt: partial?.completedAt,
    updatedAt: Date.now(),
  };
}

export const useRunStore = create<RunStore>()(
  persist(
    (set, get) => ({
      records: [],

      addRecord: (partial) => {
        const rec = newRecord(partial);
        set((s) => ({ records: [...s.records, rec] }));
        return rec.id;
      },

      updateRecord: (recordId, patch) =>
        set((s) => ({
          records: s.records.map((r) =>
            r.id === recordId ? { ...r, ...patch, updatedAt: Date.now() } : r,
          ),
        })),

      removeRecord: (recordId) =>
        set((s) => ({ records: s.records.filter((r) => r.id !== recordId) })),

      addPartyMember: (recordId, member) => {
        const id = genId();
        set((s) => ({
          records: s.records.map((r) => {
            if (r.id !== recordId) return r;
            if (r.party.length >= 6) return r;
            const newMember: PartyMember = {
              id,
              name: member?.name ?? "",
              form: member?.form,
              chosenAbility: member?.chosenAbility ?? "",
              innateAbilities: member?.innateAbilities ?? ["", "", ""],
              moves: member?.moves ?? ["", "", "", ""],
              note: member?.note,
            };
            return { ...r, party: [...r.party, newMember], updatedAt: Date.now() };
          }),
        }));
        return id;
      },

      updatePartyMember: (recordId, memberId, patch) =>
        set((s) => ({
          records: s.records.map((r) =>
            r.id === recordId
              ? {
                  ...r,
                  party: r.party.map((m) => (m.id === memberId ? { ...m, ...patch } : m)),
                  updatedAt: Date.now(),
                }
              : r,
          ),
        })),

      removePartyMember: (recordId, memberId) =>
        set((s) => ({
          records: s.records.map((r) =>
            r.id === recordId
              ? { ...r, party: r.party.filter((m) => m.id !== memberId), updatedAt: Date.now() }
              : r,
          ),
        })),

      setRecordNote: (recordId, note) =>
        set((s) => ({
          records: s.records.map((r) =>
            r.id === recordId ? { ...r, note, updatedAt: Date.now() } : r,
          ),
        })),

      setRecordStatus: (recordId, status) =>
        set((s) => ({
          records: s.records.map((r) =>
            r.id === recordId ? { ...r, status, updatedAt: Date.now() } : r,
          ),
        })),

      setCompletedAt: (recordId, date) =>
        set((s) => ({
          records: s.records.map((r) =>
            r.id === recordId ? { ...r, completedAt: date, updatedAt: Date.now() } : r,
          ),
        })),

      clearRecord: (recordId) =>
        set((s) => ({
          records: s.records.map((r) =>
            r.id === recordId
              ? { ...r, party: [], note: undefined, completedAt: undefined, status: "not_started", updatedAt: Date.now() }
              : r,
          ),
        })),

      resetAll: () => set({ records: [] }),
    }),
    {
      name: "er-hell-runs-v3",
      version: 3,
      migrate: (persistedState: any, version) => {
        // v2 → v3：从 18 属性 runs 迁移为自由存档列表
        if (version < 3) {
          const oldRuns = (persistedState as any)?.runs ?? {};
          const oldDifficulty = (persistedState as any)?.difficulty ?? "HELL";
          const oldLevelLimit = (persistedState as any)?.levelLimit ?? "elite";
          const records: RunRecord[] = [];
          let idx = 1;
          for (const [, run] of Object.entries(oldRuns) as [string, any][]) {
            if (!run) continue;
            const party = (run.party ?? []).map((m: any) => ({
              id: m.id ?? genId(),
              name: m.name ?? "",
              form: m.form,
              chosenAbility: m.chosenAbility ?? m.abilities?.[3] ?? "",
              innateAbilities: [
                m.innateAbilities?.[0] ?? m.abilities?.[0] ?? "",
                m.innateAbilities?.[1] ?? m.abilities?.[1] ?? "",
                m.innateAbilities?.[2] ?? m.abilities?.[2] ?? "",
              ] as [string, string, string],
              moves: m.moves ?? ["", "", "", ""],
              note: m.note,
            }));
            if (party.length === 0 && !run.note) continue;
            records.push({
              id: genId(),
              title: `通关存档 ${idx++}`,
              difficulty: oldDifficulty,
              levelLimit: oldLevelLimit,
              status: run.status ?? "not_started",
              party,
              note: run.note,
              completedAt: run.completedAt,
              updatedAt: run.updatedAt ?? Date.now(),
            });
          }
          return { records };
        }
        return persistedState;
      },
    },
  ),
);

export const DIFFICULTY_LABELS = DIFFICULTY_CN;

export function useStats() {
  const records = useRunStore((s) => s.records);
  const total = records.length;
  const completed = records.filter((r) => r.status === "completed").length;
  const inProgress = records.filter((r) => r.status === "in_progress").length;
  const notStarted = records.filter((r) => r.status === "not_started").length;
  const totalMembers = records.reduce((sum, r) => sum + r.party.length, 0);
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, inProgress, notStarted, totalMembers, progress, total };
}
