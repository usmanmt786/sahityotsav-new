import prisma from "@/data/prisma";
export interface ProgramResult {
  chNo: string;
  name: string;
  team: string;
  prize?: 1 | 2 | 3;
  grade?: string;
  points?: number;
}

export interface ExtractedProgramData {
  resultCount: number;
  category: string;
  program: string;
  firstPrize: ProgramResult[];
  secondPrize: ProgramResult[];
  thirdPrize: ProgramResult[];
  others: ProgramResult[];
}
export default class ResultModel {
  static async getResults(programId: number) {
    const resp = await prisma.program_participant.findMany({
      where: {
        programId,
      },
      select: {
        id: true,
        win_place: true,
        score: true,
        grade: true,
        participant: {
          select: {
            id: true,
            name: true,
            place: true,
            chest_no: true,
          },
        },
        program: {
          select: {
            name: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        win_place: "asc",
      },
    });

    const sortedResp = resp.sort((a, b) => {
      if (a.win_place === 0 && b.win_place !== 0) return 1;
      if (a.win_place !== 0 && b.win_place === 0) return -1;
      return a.win_place - b.win_place;
    });

    return sortedResp;
  }

  static async getWinResults(programId: number) {
    const resp = await prisma.program_participant.findMany({
      where: {
        programId,
        AND: {
          win_place: {
            gt: 0,
          },
        },
      },
      select: {
        id: true,
        win_place: true,
        score: true,
        grade: true,
        participant: {
          select: {
            id: true,
            name: true,
            team: {
              select: {
                name: true,
              },
            },
            chest_no: true,
          },
        },
        program: {
          select: {
            name: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        win_place: "asc",
      },
    });

    return resp;
  }
  static async updateResult(
    id: number,
    winPlace: number,
    score: number,
    grade?: string
  ) {
    try {
      await prisma.program_participant.update({
        where: {
          id,
        },
        data: {
          win_place: winPlace,
          score,
          grade,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
  static async updateResultAll(data: ExtractedProgramData): Promise<boolean> {
    try {
      // 1. Find the program with category
      const program = await prisma.program.findFirst({
        where: {
          name: data.program,
          category: { name: data.category },
        },
        select: { id: true },
      });

      if (!program) {
        throw new Error(
          `Program "${data.program}" in category "${data.category}" not found`
        );
      }

      // 2. Combine all results
      const resultMerged = [
        ...data.firstPrize.map((r) => ({ ...r, prize: 1 as const })),
        ...data.secondPrize.map((r) => ({ ...r, prize: 2 as const })),
        ...data.thirdPrize.map((r) => ({ ...r, prize: 3 as const })),
        ...data.others,
      ];

      for (let i = 0; i < resultMerged.length; i++) {
        try {
          await prisma.$transaction(async (prisma) => {
            for (const result of resultMerged) {
              await prisma.program_participant.updateMany({
                where: {
                  programId: program.id,
                  participant: { chest_no: result.chNo },
                },
                data: {
                  win_place: result.prize || 0,
                  score: result.points,
                  grade: result.grade ?? null,
                },
              });
            }
          });
        } catch (error) {
          console.error(error);
          throw error;
        }
      }

      return true;
    } catch (error) {
      console.error("Error updating results:", error);
      return false;
    }
  }
}
