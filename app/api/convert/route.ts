import { read, utils } from "xlsx";
import { NextRequest, NextResponse } from "next/server";
import {
  extractFlowProgram,
  extractFlowTeam,
  validateFile,
} from "@/functions/utils/extractFlows";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const type = formData.get("type")?.toString();

  if (!type)
    return NextResponse.json({ success: false, message: "Type is required" });
  if (["program", "team"].includes(type) === false)
    return NextResponse.json({ success: false, message: "Invalid type" });
  // Get all files from the form data
  const files = formData.getAll("file") as File[];

  if (files.length === 0) {
    return NextResponse.json({
      success: false,
      message: "No files uploaded",
    });
  }
  if (
    files[0].type !== "application/vnd.ms-excel" &&
    files[0].type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return NextResponse.json({
      success: false,
      message: "Invalid file type",
    });
  }

  try {
    // Read the uploaded file as a buffer
    const fileBuffer = Buffer.from(await files[0].arrayBuffer());

    // Read the Excel workbook from the buffer
    const workbook = read(fileBuffer, { type: "buffer" });

    // Convert the first sheet to CSV
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const csvData = utils.sheet_to_csv(worksheet);

    // Process CSV Data
    const lines = csvData
      .split("\n")
      .map((line: any) => line.replace(/"/g, ""));
    const data = lines.map((line: any) => line.split(","));
    if (!validateFile(data, type as "program" | "team"))
      return NextResponse.json({
        success: false,
        message: "File data is not valid",
      });

    const structuredData =
      type === "program" ? extractFlowProgram(data) : extractFlowTeam(data);

    // Return the processed data as JSON
    return NextResponse.json({
      success: true,
      message: "File uploaded and converted successfully",
      data: structuredData,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: "File processing failed",
      error: error.message,
    });
  }
}
