import prisma from "@/data/prisma";


export default class ResultModel {

    static async getResults(programId: number) {

        const resp = await prisma.program_participant.findMany({
            where: {
                programId
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
                                name: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                win_place: 'asc'
            }
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
                        gt: 0
                    }
                }
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
                                name: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                win_place: 'asc'
            }
        });

        
        return resp;
    }
    static async updateResult(id: number, winPlace: number, score: number, grade?: string) {
        try {
            await prisma.program_participant.update({
                where: {
                    id
                },
                data: {
                    win_place: winPlace,
                    score,
                    grade
                }
            });
            return true;


        } catch (error) {
            return false;
        }
    }

}