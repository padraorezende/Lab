#!/usr/bin/env bash

# Stop on any error
# set -e

#Parametros de entrada
CSV_PATH="$1"
PATH_RUNNER="$2"

#Validação dos parametros
if [ -z $CSV_PATH ]; then
  echo -e "Caminho do arquivo .csv não foi informado!"
  exit 1
fi
if [ -z $PATH_RUNNER ]; then
  PATH_RUNNER="./data/Runner.jar"
fi

#Criando arquivo final
echo "NAME_REPO,URL_REPO,DATE_REPO,STARS_REPO,RELEASES_REPO,CBO_TOTAL,DIT_TOTAL,LCOM_TOTAL,LOC_TOTAL,CLASS_QUANT" > final.csv

#Preparando Leitura do .csv de entrada
OLDIFS="$IFS"
IFS=','

COUNT_LINE=0

while read NAME_REPO URL_REPO STARS_REPO RELEASES_REPO DATE_REPO; do
  if [ $COUNT_LINE -ne 0 ]; then
    #Clonando repositorio
    # git clone -b master --depth 1 $URL_REPO ./clone_repository/repo
    echo -e "\033[1;31m Clonando Repositorio\033[0m"
    git clone $URL_REPO ./clone_repository/repo

    #Executando Analise CK
    echo -e "\033[1;35m Analisando Repositorio\033[0m"
    java -jar $PATH_RUNNER ./clone_repository/repo true 0 false ./data/ck_metrics/

    #Call middle.sh
    #Leitura do .csv gerada apos a analise das classes
    echo -e "\033[1;32m Analisando Metricas do Repositorio\033[0m"
    ./middle.sh ${NAME_REPO} ${URL_REPO} ${DATE_REPO} ${STARS_REPO} ${RELEASES_REPO}

    #Apagando repositorio clonado
    cd clone_repository
    rm -r repo/ -f
    cd ..

    #Apagando metricas geradas
    cd data/ck_metrics
    rm *.csv
    cd ..
    cd ..
  fi
  ((COUNT_LINE=COUNT_LINE+1))
done < $CSV_PATH