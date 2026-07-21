import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TypeId } from "@/data/types";
import { TYPE_IDS } from "@/data/types";

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

export interface TypeRun {
  typeId: TypeId;
  status: "not_started" | "in_progress" | "completed";
  party: PartyMember[];
  note?: string;
  completedAt?: string;
  updatedAt: number;
}

interface RunStore {
  runs: Record<TypeId, TypeRun>;
  setRunStatus: (typeId: TypeId, status: TypeRun["status"]) => void;
  addPartyMember: (typeId: TypeId, member?: Partial<PartyMember>) => string;
  updatePartyMember: (typeId: TypeId, memberId: string, patch: Partial<PartyMember>) => void;
  removePartyMember: (typeId: TypeId, memberId: string) => void;
  setRunNote: (typeId: TypeId, note: string) => void;
  setCompletedAt: (typeId: TypeId, date: string) => void;
  clearRun: (typeId: TypeId) => void;
  resetAll: () => void;
}

function emptyRun(typeId: TypeId): TypeRun {
  return {
    typeId,
    status: "not_started",
    party: [],
    updatedAt: Date.now(),
  };
}

function defaultRuns(): Record<TypeId, TypeRun> {
  return TYPE_IDS.reduce(
    (acc, id) => {
      acc[id] = emptyRun(id);
      return acc;
    },
    {} as Record<TypeId, TypeRun>,
  );
}

function genId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export const useRunStore = create<RunStore>()(
  persist(
    (set) => ({
      runs: defaultRuns(),

      setRunStatus: (typeId, status) =>
        set((s) => ({
          runs: {
            ...s.runs,
            [typeId]: { ...s.runs[typeId], status, updatedAt: Date.now() },
          },
        })),

      addPartyMember: (typeId, member) => {
        const id = genId();
        set((s) => {
          const run = s.runs[typeId];
          if (run.party.length >= 6) return s;
          const newMember: PartyMember = {
            id,
            name: member?.name ?? "",
            form: member?.form,
            chosenAbility: member?.chosenAbility ?? "",
            innateAbilities: member?.innateAbilities ?? ["", "", ""],
            moves: member?.moves ?? ["", "", "", ""],
            note: member?.note,
          };
          return {
            runs: {
              ...s.runs,
              [typeId]: {
                ...run,
                party: [...run.party, newMember],
                status: run.status === "not_started" ? "in_progress" : run.status,
                updatedAt: Date.now(),
              },
            },
          };
        });
        return id;
      },

      updatePartyMember: (typeId, memberId, patch) =>
        set((s) => {
          const run = s.runs[typeId];
          return {
            runs: {
              ...s.runs,
              [typeId]: {
                ...run,
                party: run.party.map((m) => (m.id === memberId ? { ...m, ...patch } : m)),
                updatedAt: Date.now(),
              },
            },
          };
        }),

      removePartyMember: (typeId, memberId) =>
        set((s) => {
          const run = s.runs[typeId];
          return {
            runs: {
              ...s.runs,
              [typeId]: {
                ...run,
                party: run.party.filter((m) => m.id !== memberId),
                updatedAt: Date.now(),
              },
            },
          };
        }),

      setRunNote: (typeId, note) =>
        set((s) => ({
          runs: {
            ...s.runs,
            [typeId]: { ...s.runs[typeId], note, updatedAt: Date.now() },
          },
        })),

      setCompletedAt: (typeId, date) =>
        set((s) => ({
          runs: {
            ...s.runs,
            [typeId]: { ...s.runs[typeId], completedAt: date, updatedAt: Date.now() },
          },
        })),

      clearRun: (typeId) =>
        set((s) => ({
          runs: {
            ...s.runs,
            [typeId]: emptyRun(typeId),
          },
        })),

      resetAll: () => set({ runs: defaultRuns() }),
    }),
    {
      name: "er-hell-runs-v2",
      version: 2,
      migrate: (persistedState: any, version) => {
        if (version < 2) {
          // 从 v1 迁移：abilities[0..2] -> innateAbilities, abilities[3] -> chosenAbility
          const oldRuns = (persistedState as any)?.runs ?? {};
          const newRuns: Record<string, TypeRun> = {};
          for (const [key, run] of Object.entries(oldRuns) as [string, any][]) {
            const party = (run.party ?? []).map((m: any) => ({
              id: m.id,
              name: m.name,
              form: m.form,
              innateAbilities: [
                m.abilities?.[0] ?? "",
                m.abilities?.[1] ?? "",
                m.abilities?.[2] ?? "",
              ] as [string, string, string],
              chosenAbility: m.abilities?.[3] ?? "",
              abilityPool: ["", "", ""] as [string, string, string],
              moves: m.moves ?? ["", "", "", ""],
              note: m.note,
            }));
            newRuns[key] = { ...run, party };
          }
          return { runs: newRuns };
        }
        return persistedState;
      },
    },
  ),
);

export function useStats() {
  const runs = useRunStore((s) => s.runs);
  const all = Object.values(runs);
  const completed = all.filter((r) => r.status === "completed").length;
  const inProgress = all.filter((r) => r.status === "in_progress").length;
  const notStarted = all.filter((r) => r.status === "not_started").length;
  const totalMembers = all.reduce((sum, r) => sum + r.party.length, 0);
  const progress = Math.round((completed / TYPE_IDS.length) * 100);
  return { completed, inProgress, notStarted, totalMembers, progress, total: TYPE_IDS.length };
}
