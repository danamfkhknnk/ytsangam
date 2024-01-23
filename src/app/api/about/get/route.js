import connectToDb from "@/database";
import { NextResponse } from "next/server";
import About from "@/models/About";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDb();
    const extractData = await About.fint({});

    if (extractData) {
      return NextResponse.json({
        success: true,
        data: extractData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong !Please try again",
      });
    }
  } catch (e) {
    console.log(e);

    return NextResponse.json({
      success: false,
      message: "Something went wrong !Please try again",
    });
  }
}
