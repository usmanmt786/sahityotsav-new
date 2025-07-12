import prisma from "@/data/prisma";

export default class AdvertisementModel {
  static async getAllAds() {
    const resp = await prisma.advertisement.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        subscription: true,
        results: {
          select: {
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
        },
      },
    });
    return resp.map((ad) => ({
      id: ad.id,
      name: ad.name,
      image: ad.image,
      subscription: ad.subscription,
      results: ad.results.map((result) => ({
        program: result.program.name,
        category: result.program.category.name,
      })),
    }));
  }

  static async getActiveAds() {
    const adsWithResults = await prisma.advertisement.findMany({
      include: {
        _count: {
          select: { results: true },
        },
      },
    });
    const resp = adsWithResults.filter(
      (ad) => ad._count.results < ad.subscription
    );
    return resp.map((ad) => ({
      id: ad.id,
      name: ad.name,
    }));
  }

  static async addAd(data: {
    name: string;
    image: string;
    subscription: number;
  }) {
    try {
      await prisma.advertisement.create({
        data,
      });
      return { code: 0, message: "Advertisement Created" };
    } catch (error) {
      console.error(error);
      return { code: 1, message: "Error Creating Advertisement" };
    }
  }
  static async updateAd(
    id: number,
    data: {
      name: string;
      image: string;
      subscription: number;
    }
  ) {
    try {
      await prisma.advertisement.update({
        where: {
          id,
        },
        data,
      });
      return { code: 0, message: "Advertisement updated" };
    } catch (error) {
      console.error(error);
      return { code: 1, message: "Error updating Advertisement" };
    }
  }

  static async deleteAd(id: number) {
    try {
      await prisma.advertisement.delete({
        where: {
          id,
        },
      });
      return { code: 0, message: "Advertisement deleted" };
    } catch (error) {
      console.error(error);
      return { code: 1, message: "Error deleting Advertisement" };
    }
  }
}
