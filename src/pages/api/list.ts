// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { readFileSync, readdirSync } from "fs";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  [key: string]: {
    info: string,
    images: string[]
  }
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const returnData: Data = {};
  const list = readdirSync("./public/projects").sort();
  console.log(list);

  for(const dir of list) {
    const dirList = readdirSync(`./public/projects/${dir}`).sort();
    dirList.splice(dirList.indexOf("info.json"), 1);
    returnData[dir] = {
      info: "",
      images: []
    };
    const info = readFileSync(`./public/projects/${dir}/info.json`, "utf-8");
    returnData[dir].info = JSON.parse(info);
    returnData[dir].images = dirList;
  }

  res.status(200).json(returnData);
};

export default handler;