import os
import matplotlib.pyplot as plt
import scipy.stats as stats
import pandas as pd
from datetime import datetime as dt


Y_COLUMNS = ['CBO_TOTAL', 'DIT_TOTAL', 'LCOM_TOTAL']
X_COLUMNS = [
    'STARS_REPO',
    'RELEASES_REPO',
    'LOC_TOTAL',
    'age'
]

plt.style.use('_mpl-gallery')
if not os.path.exists('graphs/'):
    os.makedirs('graphs/')


def calculator_age(created_at: str) -> float:
    now = dt.now()
    created_at = dt.strptime(created_at, '%Y-%m-%dT%H:%M:%SZ')
    return (now - created_at).days / 365.25


df = pd.read_csv('final.csv')
df = df.dropna().sort_values(by=['STARS_REPO'], ascending=False)[:1000]
df['age'] = df['DATE_REPO'].apply(calculator_age)

for y_column in Y_COLUMNS:
    for x_column in X_COLUMNS:
        fig, ax = plt.subplots()
        x = df[x_column]
        y = df[y_column]
        spearman = stats.spearmanr(x, y)
        title = 'Spearman: ' + str(round(spearman[0], 2))
        ax.scatter(x, y, alpha=0.5)
        ax.set(
            xlabel=x_column,
            ylabel=y_column,
            title=title,
        )
        plt.savefig(
            f'graphs/{x_column}&{y_column}.png', dpi=300, bbox_inches='tight')
        plt.close()

print('Finished')
