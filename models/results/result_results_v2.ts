import prisma from "@/data/prisma";
import { connect } from "http2";

export interface Result {
  resultCount: number;
  category: string;
  program: string;
  winners: string;
  advertisement?: number;
}

export default class ResultModelV2 {
  static async getResults() {
    try {
      const result = await prisma.result.findMany({
        select: {
          id: true,
          count: true,
          program: {
            select: {
              id: true,
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
          count: "asc",
        },
      });
      return result.map((item) => ({
        id: item.id,
        programId: item.program.id,
        program: item.program.name,
        category: item.program.category.name,
        count: item.count,
      }));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  static async getResultByProgram(programId: number) {
    try {
      const result = await prisma.result.findFirst({
        where: {
          programId,
          isPublished: true,
        },
        select: {
          id: true,
          count: true,
          winners: true,
          advertisement: {
            select: {
              image: true,
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
      });

      if (result) {
        return {
          ...result,
          program: result.program.name,
          category: result.program.category.name,
          advertisement: result.advertisement?.image || null,
        };
      }

      throw new Error("Result not published");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async createResult(data: Result) {
    try {
      const program = await prisma.program.findFirst({
        where: {
          name: data.program,
          category: { name: data.category },
        },
        select: {
          id: true,
        },
      });
      if (!program)
        throw new Error(
          `Program "${data.program}" in category "${data.category}" not found`
        );
      console.log(data);

      const result = await prisma.result.upsert({
        where: {
          count: data.resultCount,
        },
        update: {
          winners: data.winners,
          isPublished: true,
          advertisementId: data.advertisement ? data.advertisement : null,
          programId: program.id,
        },
        create: {
          programId: program.id,
          count: data.resultCount,
          winners: data.winners,
          isPublished: true,
          advertisementId: data.advertisement,
        },
      });
      return !!result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  static async deleteResult(id: number) {
    try {
      const result = await prisma.result.delete({
        where: {
          id,
        },
      });
      return !!result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
