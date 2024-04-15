#!/bin/bash

clear
HOST="https://localhost"
NOW=$(date +"%Y-%m-%d.%H:%M:%S")
ARTICLE_ID="73daa45d-0248-4b24-8e3e-d9483e8f2aee"
read -r BEARER < "token.txt"

test_get() {
    local test_name=$1
    local path=$2
    local total_requests=${3:-10000}
    local concurrency=${4:-100}
    local test_duration=${5:-1}

    ab -n $total_requests \
    -c $concurrency \
    -t $test_duration \
    -H "Authorization: Bearer $BEARER" \
    $HOST$path \
    2>&1 | tee out/$test_name.$NOW.txt
}

test_post() {
    local test_name=$1
    local path=$2
    local payload_file=$3
    local total_requests=${4:-10000}
    local concurrency=${5:-100}
    local test_duration=${6:-1}

    ab -n $total_requests \
    -c $concurrency \
    -t $test_duration \
    -H "Authorization: Bearer $BEARER" \
    -T application/json -p body/$payload_file \
    $HOST$path \
    2>&1 | tee out/$test_name.$NOW.txt
}

test_delete() {
    local test_name=$1
    local path=$2
    local total_requests=${3:-10000}
    local concurrency=${4:-100}
    local test_duration=${5:-1}

    ab -n $total_requests \
    -c $concurrency \
    -t $test_duration \
    -X DELETE
    $HOST$path \
    2>&1 | tee out/$test_name.$NOW.txt
}


#clear
    # `s|^/||`: Start slash (^/) to empty, `s|/|_|g`: / to _
#    local output_name=$(echo $path | sed "s|^/||; s|/|_|g")
#
#HOST="https://localhost"
#read -r BEARER < "token.txt"
#echo -e "Token: $BEARER\n"
#
#read -p "Press enter to continue"
##ab_test "/forum/id" 3 1 1
#test_get "/forum/article/73daa45d-0248-4b24-8e3e-d9483e8f2aee" 3 1 1

#
#read -p "Press enter to continue"
#ab -n 100 -c 1000 -t 30 -p $LOCATION/article/
#
## 測試 GET 方法
#ab -n <總請求數> -c <併發數> -t <測試時間> <目標網址>
#
## 測試 POST 方法
#ab -n <總請求數> -c <併發數> -t <測試時間> -p <POST數據檔> -T <POST數據類型> <目標網址>
#
## 測試 PUT 方法
#ab -n <總請求數> -c <併發數> -t <測試時間> -u <PUT數據檔> -T <PUT數據類型> <目標網址>
#
## 測試 PATCH 方法
#ab -n <總請求數> -c <併發數> -t <測試時間> -p <PATCH數據檔> -T <PATCH數據類型> <目標網址>
#
## 測試 DELETE 方法
#ab -n <總請求數> -c <併發數> -t <測試時間> <目標網址>
