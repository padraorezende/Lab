#!/usr/bin/env bash

# Stop on any error
set -e

#Informações do Repositorio
NAME_REPO="$1" 
URL_REPO="$2" 
DATE_REPO="$3" 
STARS_REPO="$4" 
RELEASES_REPO="$5"
CBO_TOTAL="$6"
DIT_TOTAL="$7"
LCOM_TOTAL="$8"
LOC_TOTAL="$9"
CLASS_QUANT="${10}"

echo "${NAME_REPO},${URL_REPO},${DATE_REPO},${STARS_REPO},${RELEASES_REPO},${CBO_TOTAL},${DIT_TOTAL},${LCOM_TOTAL},${LOC_TOTAL},${CLASS_QUANT}" >> final.csv