import { writeFile } from 'fs/promises';
import rangeGetPage, { getPage } from '../api/rangeGetPage.js';
import { IListItem } from '../types/IGetRes.js';
import { readFile } from 'fs/promises';

const getIndex = async () => {
  let data: IListItem[] = [];
  try {
    const text = await readFile('./data.json', 'utf-8');
    data = JSON.parse(text);
  } catch (e) {}
  const lastDataId = (data[0] as IListItem | undefined)?.article_id;
  const step = 20;
  const res = await getPage(1);
  console.log(Math.floor(res.totalPage / step));
  for (let i = 0; i <= Math.floor(res.totalPage / step); i += 1) {
    console.log(`${i} / ${Math.floor(res.totalPage / step)}`);
    if ((i + 1) * step > res.totalPage) {
      const rangeGetRes = await rangeGetPage(i * step + 1, res.totalPage, 1);
      console.log(rangeGetRes);
      data.push(...rangeGetRes);
      break;
    }

    const rangeGetRes = await rangeGetPage(i * step + 1, (i + 1) * step, 1);
    const lastDataIdIndex = rangeGetRes.findIndex((item) => item.article_id === lastDataId);
    if (lastDataIdIndex !== -1) {
      console.log('lastDataId found');
      data.push(...rangeGetRes.slice(0, lastDataIdIndex));
      break;
    }
    data.push(...rangeGetRes);
  }

  await writeFile('./data.json', JSON.stringify(data, null, 2));
};

export default getIndex;
