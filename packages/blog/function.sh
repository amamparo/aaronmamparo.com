#!/bin/zsh

function handler () {
	output=$(./indexBlog "$1")
    while IFS= read -r line; do
      echo "$line" 1>&2
    done <<< "$output"
    echo "$(tail -n 1 <<< "$output")"
}