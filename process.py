import json
from datetime import datetime

import numpy as np
from matplotlib import pyplot as plt
import matplotlib.dates as mdates


def tounixtime(str):
    return (datetime.strptime(str, '%Y-%m-%d %H:%M:%S').timestamp())


def totime(str):
    return datetime.strptime(str, '%Y-%m-%d %H:%M:%S')


js = json.load(open('data.json', encoding='utf-8'))
bb = list(map(lambda x: x['input_date'], js))
bb.reverse()
cc = np.array(list(map(tounixtime, bb)))
x = cc-np.min(cc)
y = np.arange(0, len(x))
s = np.polyfit(x, y, 1)

x1 = np.linspace(0, np.max(x), x.shape[0])
y1 = s[0]*x+s[1]
fig = plt.figure(figsize=(32, 9))
ax = fig.add_subplot(111)
x = np.array(list(map(totime, bb)))
ax.xaxis.set_major_formatter(mdates.DateFormatter('%y-%m'))
ax.xaxis.set_major_locator(mdates.MonthLocator(bymonth=[1, 4, 7, 10]))
ax.plot(x, y-y1, color="b", alpha=0.8,)
# plt.plot(x1, y1, color="k", label=f"y = {s[0]}x + {s[1]}")
fig.savefig('test.png')
# plt.show()

# print(s*24*3600)
