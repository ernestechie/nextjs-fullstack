import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export const catchErrorAsync = (func) => {
  return (req: NextRequest, res: NextResponse, next: NextApiRequest) => {
    func(req, res, next).catch(next);
  };
};
