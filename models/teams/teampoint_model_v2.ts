import prisma from "@/data/prisma";
export interface Team {
  team: string;
  points: number;
}
export interface TeamPoint {
  after: number;
  teams: Team[];
}
export default class TeamPointModelV2 {
  static async updateTeamPoint(
    after: number,
    points: string,
    isFinal: boolean
  ) {
    try {
      const resp = await prisma.team_point_v2.create({
        data: {
          after,
          points,
          isFinal,
        },
      });

      return !!resp;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getTeamPoint() {
    try {
      const resp = await prisma.team_point_v2.findFirst({
        select: {
          id: true,
          after: true,
          points: true,
          isFinal: true,
        },
        take: 1,
        orderBy: { id: "desc" },
      });

      return resp;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  static async deleteTeamPoint(id: number) {
    try {
      const resp = await prisma.team_point_v2.deleteMany({
        where: {
          id,
        },
      });
      return !!resp;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
