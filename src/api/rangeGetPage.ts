import fetch from 'node-fetch';
import { setTimeout } from 'timers/promises';
import IGetRes from '../types/IGetRes.js';
import range from '../utils/range.js';

export const getPage = async (page: number) => {
  while (true) {
    try {
      const res = fetch(
        `http://jhsjk.people.cn/testnew/result?keywords=&isFuzzy=0&searchArea=0&year=0&form=0&type=0&page=${page}&origin=%E5%85%A8%E9%83%A8&source=2`,
        {
          headers: {
            'User-Agent':
            // 如果不起效请自行修改。为了不暴露我的 UA，我对此处程序进行了修改。
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:114.0) Gecko/19530615 Firefox/191.9',
          },
        },
      );
      const res2 = await Promise.any([
        res.then((rs) => rs.json() as Promise<IGetRes>),
        setTimeout(5000),
      ]);
      if (!res2) {
        console.log('timed out');
        continue;
      }
      return { items: res2.list, totalPage: Math.floor(res2.total / res2.list.length) + 1 };
    } catch (e) {
      console.error(e);
      console.error(`Error at page ${page}`);
      return { items: [], totalPage: 0 };
    }
  }
};

const rangeGetPage = async (start: number, stop: number, step: number) => {
  const rangeAry = range(start, stop, step);
  const promises = rangeAry.map(async (page) => {
    const res = await getPage(page);
    return res.items;
  });
  const resAry = (await Promise.all(promises)).flat();
  return resAry;
};

export default rangeGetPage;
