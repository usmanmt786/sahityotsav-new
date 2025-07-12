import { COMMON_CATEGORIES, COMMON_PROGRAMS } from "@/data/prefill";
import prisma from "@/data/prisma";
import { ConfigsModel } from "../configs/configs_model";
import { XMLParser } from "fast-xml-parser";
interface Category {
  id: number;
  name: string;
}

interface Item {
  id: number;
  name: string;
  categoryId: number;
}

interface Team {
  id: number;
  name: string;
}

interface Participant {
  id: number;
  chest_no: string;
  name: string;
  teamId: number;
}

interface AssignItem {
  id: number;
  ChestNo: string;
  programId: number;
}

// --- Step 2: Define the structure for the final JSON response ---

export interface ParsedParticipantData {
  categories: Category[];
  items: Item[];
  teams: Team[];
  participants: Participant[];
  assignedItems: AssignItem[];
}

export default class InstallModel {
  static async isInstalled(): Promise<boolean> {
    const resp = await prisma.config.findFirst({
      where: {
        name: "is_installed",
      },
    });
    return resp?.value === "true";
  }

  static async install(xmlData: string) {
    try {
      const isDone = await this.isInstalled();
      if (!isDone) {
        const InstallData = await this.getInstallationData(xmlData);

        // Create teams
        await prisma.team.createMany({
          data: InstallData.teams,
        });

        // Create categories
        await prisma.category.createMany({
          data: InstallData.categories,
        });

        // Create programs
        await prisma.program.createMany({
          data: InstallData.items,
        });

        // Create participants
        await prisma.participant.createMany({
          data: InstallData.participants,
        });

        // Create participant lookup map
        const participants = await prisma.participant.findMany({
          select: { id: true, chest_no: true },
        });
        const participantMap = new Map(
          participants.map((p) => [p.chest_no, p.id])
        );

        // Create program participants in batches
        const batchSize = 1000;
        for (let i = 0; i < InstallData.assignedItems.length; i += batchSize) {
          const batch = InstallData.assignedItems.slice(i, i + batchSize);
          await prisma.program_participant.createMany({
            data: batch.map((item) => ({
              id: item.id,
              programId: item.programId,
              participantId: participantMap.get(item.ChestNo) ?? 0,
            })),
          });
        }

        await ConfigsModel.updateConfig("is_installed", "true");

        return { code: 0, message: "Software installed" };
      } else {
        return { code: 1, message: "Software is already installed" };
      }
    } catch (error) {
      console.error(error);
      await this.uninstall();
      return { code: 1, message: "Error installing software" };
    }
  }

  static async uninstall() {
    await prisma.$transaction(async (prisma) => {
      await prisma.config.updateMany({
        data: {
          value: "false",
        },
        where: {
          name: "is_installed",
        },
      });
      await prisma.advertisement.deleteMany();
      await prisma.result.deleteMany();
      await prisma.team_point_v2.deleteMany();
      await prisma.program_participant.deleteMany();
      await prisma.participant.deleteMany();
      await prisma.program.deleteMany();
      await prisma.category.deleteMany();
      await prisma.config.deleteMany();
      await prisma.team.deleteMany();
      await prisma.user.deleteMany();
      
    });

    return { code: 0, message: "Software uninstalled" };
  }
  static async getInstallationData(
    xmlData: string
  ): Promise<ParsedParticipantData> {
    try {
      const parser = new XMLParser();
      const parsedJson = parser.parse(xmlData);

      const onlineData = parsedJson.OnlineData;

      if (!onlineData) {
        throw new Error("XML Data is not valid");
      }

      const ensureArray = (item: any) => {
        if (!item) return [];
        return Array.isArray(item) ? item : [item];
      };

      // Extract each "table" into a separate variable
      const extractedData: ParsedParticipantData = {
        categories: ensureArray(
          onlineData.M_Category.map((cat: any) => ({
            id: cat.CategoryNo,
            name: cat.CategoryName,
          }))
        ),
        items: ensureArray(
          onlineData.M_Item.map((item: any) => ({
            id: item.ItemCode,
            name: item.ItemName,
            categoryId: item.CategoryNo,
          }))
        ),
        teams: ensureArray(
          onlineData.M_Team.map((team: any) => ({
            id: team.TeamNo,
            name: team.TeamName,
          }))
        ),
        participants: ensureArray(
          onlineData.M_Participant.map((participant: any) => ({
            id: participant.pid,
            chest_no: participant.ChestNo.toString(),
            name: participant.Participant,
            teamId: participant.TeamNo,
          }))
        ),
        assignedItems: ensureArray(
          onlineData.M_AssignItem.map((assignItem: any) => ({
            id: assignItem.pid,
            ChestNo: assignItem.ChestNo.toString(),
            programId: assignItem.ItemCode,
          }))
        ),
      };
      return extractedData;
    } catch (error) {
      throw error;
    }
  }
}
