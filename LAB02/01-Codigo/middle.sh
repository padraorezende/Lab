#!/usr/bin/env bash

# Stop on any error
# set -e

#Informações do Repositorio
NAME_REPO="$1" 
URL_REPO="$2" 
DATE_REPO="$3" 
STARS_REPO="$4" 
RELEASES_REPO="$5"


#Leitura das colunas corretas do arquivo class.csv
echo -e "\033[1;35m Gerando arquivos para cada metrica  do Repositorio\033[0m"
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
echo -e "\033[1;34m Calculando CBO\033[0m"
COUNT_LINE=0
while read CBO; do
    if [ $COUNT_LINE -ne 0 ]; then
        ((CBO_TOTAL=CBO_TOTAL+${CBO}))
    fi
    ((COUNT_LINE=COUNT_LINE+1))
done < "./data/ck_metrics/cbo.csv"

#Calculo de DIT
echo -e "\033[1;34m Calculando DIT\033[0m"
COUNT_LINE=0
while read DIT; do
    if [ $COUNT_LINE -ne 0 ]; then
        ((DIT_TOTAL=DIT_TOTAL+${DIT}))
    fi
    ((COUNT_LINE=COUNT_LINE+1))
done < "./data/ck_metrics/dit.csv"

#Calculo de LCOM
echo -e "\033[1;34m Calculando LCOM\033[0m"
COUNT_LINE=0
while read LCOM; do
    # if [ $COUNT_LINE -ne 0 ]; then
    #     ((LCOM_TOTAL=LCOM_TOTAL+${LCOM}))
    # fi
    ((COUNT_LINE=COUNT_LINE+1))
done < "./data/ck_metrics/lcom.csv"

#Calculo de LOC
echo -e "\033[1;34m Calculando LOC\033[0m"
COUNT_LINE=0
while read LOC; do
    if [ $COUNT_LINE -ne 0 ]; then
        ((LOC_TOTAL=LOC_TOTAL+${LOC}))
    fi
    ((COUNT_LINE=COUNT_LINE+1))
done < "./data/ck_metrics/loc.csv"

echo -e "\033[1;34m Calculando Quanitdade de Classes\033[0m"
CLASS_QUANT=0
((CLASS_QUANT=COUNT_LINE-1))

#Call end.sh
#Escrita do .csv final
echo -e "\033[1;32m Escrevendo dados no .csv\033[0m"
./end.sh ${NAME_REPO} ${URL_REPO} ${DATE_REPO} ${STARS_REPO} ${RELEASES_REPO} ${CBO_TOTAL} ${DIT_TOTAL} ${LCOM_TOTAL} ${LOC_TOTAL} ${CLASS_QUANT}