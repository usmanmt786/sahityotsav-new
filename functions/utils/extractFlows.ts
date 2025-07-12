// utils/extractFlow.ts
export interface TeamResult {
  team: string;
  points: number;
}

export interface ExtractedTeamData {
  after: number;
  teams: TeamResult[];
}
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

export function extractFlowTeam(data: any[][]): ExtractedTeamData {
  const result: ExtractedTeamData = {
    after: 0,
    teams: [],
  };

  // Extract results count (from the line that contains "results declared")
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (row && row.join("").includes("results declared")) {
      // Look for the number before "results declared" (like "118" in the sample)
      const countMatch = row.join(" ").match(/(\d+)\s+results declared/);
      if (countMatch) {
        result.after = Number(countMatch[1]);
        break;
      }
    }
  }

  // Extract team data (starting from row where "Team" is in first column)
  let teamDataStart = -1;
  for (let i = 0; i < data.length; i++) {
    if (data[i] && data[i][0] === "Team") {
      teamDataStart = i + 1;
      break;
    }
  }

  if (teamDataStart > 0) {
    for (let i = teamDataStart; i < data.length; i++) {
      const row = data[i];
      if (!row || !row[0] || row[0] === "") continue; // Skip empty rows

      const teamName = String(row[0]).trim();
      const points = Number(row[row.length - 1]); // Points are in last column

      if (
        teamName &&
        teamName !== "Team point status after" &&
        !isNaN(points)
      ) {
        result.teams.push({
          team: teamName,
          points: points,
        });
      }
    }
  }

  return {
    after: result.after,
    teams: result.teams.sort((a, b) => b.points - a.points),
  };
}

export function extractFlowProgram(data: any[][]): ExtractedProgramData {
  const result: ExtractedProgramData = {
    resultCount: 0,
    category: "",
    program: "",
    firstPrize: [],
    secondPrize: [],
    thirdPrize: [],
    others: [],
  };

  // Extract result count (from row 4, column 8)
  if (data[4] && data[4][8]) {
    result.resultCount = Number(data[4][8]) || 0;
  }

  // Extract category (from row 14, column 0)
  if (data[13]) {
    if (data[13][0]) {
      result.category = String(data[13][0]).trim();
    }
    // Extract program name (from row 14, column 8)
    if (data[13][8]) {
      result.program = String(data[13][8]).trim();
    }
  }

  // Process participants (starting from row 17)
  for (let i = 16; i < data.length; i++) {
    const row = data[i];
    if (!row || !row[1] || row[1] === "") continue; // Skip empty rows or rows without Ch No

    const participant: ProgramResult = {
      chNo: row[1].toString(),
      name: String(row[5] || "").trim(),
      team: String(row[9] || "").trim(),
    };

    // Extract grade and points if available
    if (row[17]) participant.grade = String(row[17]).trim();
    if (row[18]) participant.points = Number(row[18]);

    // Categorize by prize
    const prize = String(row[14] || "").trim();
    if (prize.includes("1st")) {
      participant.prize = 1;
      result.firstPrize.push(participant);
    } else if (prize.includes("2nd")) {
      participant.prize = 2;
      result.secondPrize.push(participant);
    } else if (prize.includes("3rd")) {
      participant.prize = 3;
      result.thirdPrize.push(participant);
    } else if (participant.points) {
      result.others.push(participant);
    }
  }

  return result;
}

export function validateFile(
  data: Array<Array<string | number>>,
  type: "program" | "team"
): boolean {
  if (type === "program") {
    // Check for "Result" and "46" in row 4
    if (typeof data[4]?.[4] !== "string" || data[4][4] !== "Result") {
      return false;
    }

    // Check for headers in row 16
    const expectedHeaders = [
      "",
      "Ch No",
      "CL",
      "",
      "",
      "Participant",
      "",
      "",
      "",
      "Team",
      "",
      "",
      "",
      "",
      "Prize",
      "",
      "",
      "Grade",
      "Point",
    ];
    if (!arraysEqual(data[15] as string[], expectedHeaders as string[])) {
      return false;
    }

    return true;
  } else if (type === "team") {
    // Check for "Team Points" in row 6, column 3
    if (data[6]?.[3] !== "Team Points") {
      return false;
    }

    // Check for headers in row 15
    const expectedHeaders = [
      "Team",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Total Point",
    ];
    if (!arraysEqual(data[15] as string[], expectedHeaders)) {
      false;
    }

    return true;
  }

  return false;
}

// Helper function to compare arrays
function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// Example usage:
// const programValidation = validateExcelFile(programData, 'program');
// const teamValidation = validateExcelFile(teamData, 'team');
