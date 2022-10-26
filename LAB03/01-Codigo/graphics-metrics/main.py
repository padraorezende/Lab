import os
import matplotlib.pyplot as plt
import pandas as pd
import scipy.stats as stats
from datetime import datetime as dt
import numpy as np

df = pd.read_csv('./pullRequest.csv')

def calculator_age(created_at: str) -> float:
    now = dt.now()
    created_at = dt.strptime(created_at, '%Y-%m-%dT%H:%M:%SZ')
    return (now - created_at).days * 24 + (now - created_at).seconds/3600

df['hours_spent']  = df['createdAt'].apply(calculator_age) -  df['closedAt'].apply(calculator_age)



plt.style.use('_mpl-gallery')
if not os.path.exists('graphs/'):
    os.makedirs('graphs/')


plt.figure(figsize=(10, 5))
plt.scatter(df['body'], df['reviews.totalCount'], color="#ab8fdc")
plt.title("Reviews x Body")
plt.ylabel("Reviews")
plt.xlabel("Body")
plt.savefig(
    f'graphs/reviews&body.png', dpi=300, bbox_inches='tight')

plt.figure(figsize=(10, 5))
plt.scatter(df['changedFiles'], df['reviews.totalCount'], color="#ab8fdc")
plt.title("Reviews x changedFiles")
plt.ylabel("Reviews")
plt.xlabel("changedFiles")
plt.savefig(
    f'graphs/reviews&changedFiles.png', dpi=300, bbox_inches='tight')

plt.figure(figsize=(10, 5))
plt.scatter(df['comments.totalCount'], df['reviews.totalCount'], color="#ab8fdc")
plt.title("Reviews x changedFiles")
plt.ylabel("Reviews")
plt.xlabel("changedFiles")
plt.savefig(
    f'graphs/reviews&comments.png', dpi=300, bbox_inches='tight')

plt.figure(figsize=(10, 5))
plt.scatter(df['comments.totalCount'], df['hours_spent'], color="#ab8fdc")
plt.title("Reviews x hours")
plt.ylabel("Reviews")
plt.xlabel("hours")
plt.savefig(
    f'graphs/reviews&ghours.png', dpi=300, bbox_inches='tight')



df_merged = df[df['state'] == 'MERGED']
df_closed = df[df['state'] == 'CLOSED']



plt.figure(figsize=(10, 5))
closed = df_closed['body'].to_list()
merged = df_merged['body'].to_list()
data = [closed, merged]
plt.boxplot(data, labels=['closed', 'merged'], showfliers=False, whis=1.5, patch_artist=True,  boxprops=dict(facecolor="#C7BAFC", color="#8047e2"), medianprops=dict(color="#8047e2"), whiskerprops=dict(color="#8047e2"), capprops=dict(color="#8047e2"))
plt.savefig(
    f'graphs/body&status.png', dpi=300, bbox_inches='tight')



plt.figure(figsize=(10, 5))
closed = df_closed['changedFiles'].to_list()
merged = df_merged['changedFiles'].to_list()
data = [closed, merged]
plt.boxplot(data, labels=['closed', 'merged'], showfliers=False, whis=1.5, patch_artist=True,  boxprops=dict(facecolor="#C7BAFC", color="#8047e2"), medianprops=dict(color="#8047e2"), whiskerprops=dict(color="#8047e2"), capprops=dict(color="#8047e2"))
plt.savefig(
    f'graphs/changedFiles&status.png', dpi=300, bbox_inches='tight')


plt.figure(figsize=(10, 5))
closed = df_closed['comments.totalCount'].to_list()
merged = df_merged['comments.totalCount'].to_list()
data = [closed, merged]
plt.boxplot(data, labels=['closed', 'merged'], showfliers=False, whis=1.5, patch_artist=True,  boxprops=dict(facecolor="#C7BAFC", color="#8047e2"), medianprops=dict(color="#8047e2"), whiskerprops=dict(color="#8047e2"), capprops=dict(color="#8047e2"))
plt.savefig(
    f'graphs/comments&status.png', dpi=300, bbox_inches='tight')


plt.figure(figsize=(10, 5))
closed = df_closed['hours_spent'].to_list()
merged = df_merged['hours_spent'].to_list()
data = [closed, merged]
plt.boxplot(data, labels=['closed', 'merged'], showfliers=False, whis=1.5, patch_artist=True,  boxprops=dict(facecolor="#C7BAFC", color="#8047e2"), medianprops=dict(color="#8047e2"), whiskerprops=dict(color="#8047e2"), capprops=dict(color="#8047e2"))
plt.savefig(
    f'graphs/hours&status.png', dpi=300, bbox_inches='tight')




