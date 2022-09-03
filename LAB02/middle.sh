#!/usr/bin/env bash

# Stop on any error
set -e

#Informações do Repositorio
NAME_REPO="$1" 
URL_REPO="$2" 
DATE_REPO="$3" 
STARS_REPO="$4" 
RELEASES_REPO="$5"


#Leitura do arquivo class.csv
awk -F "\"*,\"*" '{print $4}' ./data/ck_metrics/class.csv > ./data/ck_metrics/cbo.csv
awk -F "\"*,\"*" '{print $9}' ./data/ck_metrics/class.csv > ./data/ck_metrics/dit.csv
awk -F "\"*,\"*" '{print $12}' ./data/ck_metrics/class.csv > ./data/ck_metrics/lcom.csv
awk -F "\"*,\"*" '{print $35}' ./data/ck_metrics/class.csv > ./data/ck_metrics/loc.csv

#Variveis que serão coletadas
CBO_TOTAL=0
DIT_TOTAL=0
LCOM_TOTAL=0
LOC_TOTAL=0

#Calculo de CBO
COUNT_LINE=0
while read CBO; do
    if [ $COUNT_LINE -ne 0 ]; then
        ((CBO_TOTAL=CBO_TOTAL+${CBO}))
    fi
    ((COUNT_LINE=COUNT_LINE+1))
done < "./data/ck_metrics/cbo.csv"

#Calculo de DIT
COUNT_LINE=0
while read DIT; do
    if [ $COUNT_LINE -ne 0 ]; then
        ((DIT_TOTAL=DIT_TOTAL+${DIT}))
    fi
    ((COUNT_LINE=COUNT_LINE+1))
done < "./data/ck_metrics/dit.csv"

#Calculo de LCOM
COUNT_LINE=0
while read LCOM; do
    # if [ $COUNT_LINE -ne 0 ]; then
    #     ((LCOM_TOTAL=LCOM_TOTAL+${LCOM}))
    # fi
    ((COUNT_LINE=COUNT_LINE+1))
done < "./data/ck_metrics/lcom.csv"

#Calculo de LOC
COUNT_LINE=0
while read LOC; do
    if [ $COUNT_LINE -ne 0 ]; then
        ((LOC_TOTAL=LOC_TOTAL+${LOC}))
    fi
    ((COUNT_LINE=COUNT_LINE+1))
done < "./data/ck_metrics/loc.csv"

((COUNT_LINE=COUNT_LINE-1))

echo "CBO_TOTAL=$CBO_TOTAL"
echo "DIT_TOTAL=$DIT_TOTAL"
echo "LCOM_TOTAL=$LCOM_TOTAL"
echo "LOC_TOTAL=$LOC_TOTAL"
echo "COUNT_LINE=$COUNT_LINE"

