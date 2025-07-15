"use server";

import TeamPointModelV2, { Team } from "@/models/teams/teampoint_model_v2";
import { revalidatePath } from "next/cache";

export async function updateTeamPoint(
  after: number,
  teams: Team[],
  isFinal: boolean
) {
  const points = JSON.stringify(teams);
  const resp = await TeamPointModelV2.updateTeamPoint(after, points, isFinal);

  if (resp) {
    revalidatePath("/admin/teampoint");
  }
  return resp;
}
export async function getTeamPoint() {
  const resp = await TeamPointModelV2.getTeamPoint();
  if (!resp) return null;
  const points: Team[] = JSON.parse(resp?.points || "[]");

  return { ...resp, points: points };
}

export async function deleteTeamPoint(id: number) {
  const resp = await TeamPointModelV2.deleteTeamPoint(id);
  if (resp) {
    revalidatePath("/admin/teampoint");
  }
  return resp;
}
