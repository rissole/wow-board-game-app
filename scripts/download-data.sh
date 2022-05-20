#!/bin/bash

cd "$PWD"/scripts || exit

while read -r table; do
  curl -o ../src/"${table,,}".csv "https://docs.google.com/spreadsheets/d/1-UAf5PifMyUIQ1vK7X31WLCxFQ_q5A9iV6PubhPHVmg/gviz/tq?tqx=out:csv&sheet=$table";
#  sed -i 's/\"//g' ../src/"${table,,}".csv
done < dataTables.txt