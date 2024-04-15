#!/bin/bash

source test_common.sh
test_post "post_forum_content" "/forum/content" "post_forum_content.json" 10000 10 10