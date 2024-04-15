#!/bin/bash

source test_common.sh
test_post "post_forum_article" "/forum/article" "post_forum_article.json" 10000 10 10

ab -n 10000 -c 100 -t 1 -H "Authorization: Bearer $BEARER" \
  "$HOST/forum/article/" \
  2>&1 | tee "out/get:forum_article.$NOW.txt"

    ab -n $total_requests \
    -c $concurrency \
    -t $test_duration \
    -H "Authorization: Bearer $BEARER" \
    -T application/json -p body/$payload_file \
    $HOST$path \
    2>&1 | tee out/$test_name.$NOW.txt