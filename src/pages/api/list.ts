// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { readFileSync, readdirSync } from "fs";

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
  // const list = readdirSync"./public/projects").sort();
  // console.log(list);
  const number = 22;
  const list = [];
  for(let i = 1; i <= number; i++) {
    list.push(i);
  }
  for(const dir of list) {
    // const dirList = readdirSync(`./public/projects/${dir}`).sort();
    // dirList.splice(dirList.indexOf("info.json"), 1);
    const info = await import(`../../../public/projects/${dir}/info.json`);
    const dirList = [];
    for(let i = 0; i <= info.num; i++) {
      dirList.push(`${i}.${info.extension}`);
    }
    returnData[dir] = {
      info: "",
      images: []
    };
    returnData[dir].info = info;
    returnData[dir].images = dirList;
  }

  res.status(200).json(returnData);
};

export default handler;