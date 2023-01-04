import { writeFile } from 'fs/promises';
import rangeGetPage, { getPage } from '../api/rangeGetPage.js';
import { IListItem } from '../types/IGetRes.js';

const getIndex = async () => {
  const step = 20;
  const res = await getPage(1);
  const resAry: IListItem[] = [];
  console.log(Math.floor(res.totalPage / step));
  for (let i = 0; i <= Math.floor(res.totalPage / step); i += 1) {
    console.log(`${i} / ${Math.floor(res.totalPage / step)}`);
    if ((i + 1) * step > res.totalPage) {
      const rangeGetRes = await rangeGetPage(i * step + 1, res.totalPage, 1);
      console.log(rangeGetRes);
      resAry.push(...rangeGetRes);
      break;
    }

    const rangeGetRes = await rangeGetPage(i * step + 1, (i + 1) * step, 1);
    resAry.push(...rangeGetRes);
  }

  await writeFile('./data.json', JSON.stringify(resAry, null, 2));
};

export default getIndex;
