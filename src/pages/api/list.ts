import type { NextApiRequest, NextApiResponse } from "next";

import { Data } from "@/utils/types";

type Response = {
  [key: string]: Data;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  const response: Response = {};
  const number = (await import("../../../public/projects/info.json")).num;
  const list = [];
  for(let i = 1; i <= number; i++) {
    list.push(i);
  }
  for(const dir of list) {
    const info = await import(`../../../public/projects/${dir}/info.json`);
    const dirList = [];
    for(let i = 0; i <= info.num; i++) {
      dirList.push(`${i}.${info.extension}`);
    }
    response[dir] = {
      info: info,
      images: dirList
    };
  }

  res.status(200).json(response);
};

export default handler;