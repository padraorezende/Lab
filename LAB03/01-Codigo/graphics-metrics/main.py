import matplotlib.pyplot as plt
import pandas as pd
import scipy.stats as stats
from datetime import datetime as dt

COLUMNS = ['changedFiles', "hours_spent", 'body', 'comments.totalCount']

df = pd.read_csv('./pullRequest.csv')

# def calculator_hours(date: str)  -> float:
#     date = dt.strptime(date, '%Y-%m-%dT%H:%M:%SZ')
#     return (date).hour



first_time = dt.datetime.now()
later_time = dt.datetime.now()
difference = later_time - first_time
dt.timedelta(0, 8, 562000)
seconds_in_day = 24 * 60 * 60
divmod(difference.days * seconds_in_day + difference.seconds, 60)
(0, 8)


# df['hours_spent'] = df['closedAt'].apply(calculator_hours) - df['createdAt'].apply(calculator_hours) 

# df_merged = df[df['state'] == 'MERGED']
# df_closed = df[df['state'] == 'CLOSED']

# reviews = df['reviews.totalCount']
# for col in COLUMNS:
#     print('Working on:',  col)
#     # A
#     closed = df_closed[col].to_list()
#     merged = df_merged[col].to_list()

#     fig, ax = plt.subplots()
#     data = [closed, merged]
#     ax.boxplot(data, labels=['closed', 'merged'], showfliers=False, whis=1.5)
#     ax.set_title(col)
#     plt.savefig('out/A_' + col + '.png')
#     plt.close()

#     # B
#     fig, ax = plt.subplots()
#     x = df[col]
#     y = reviews
#     spearman = stats.spearmanr(x, y)
#     title = 'Spearman: ' + str(round(spearman[0], 2))
#     ax.scatter(x, y, alpha=0.5)
#     ax.set(
#         xlabel=col,
#         ylabel='reviews',
#         title=title
#     )
#     plt.savefig('out/B_' + col + '.png')
#     plt.close()
