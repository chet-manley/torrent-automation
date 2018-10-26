#!/bin/env bash

#CWD=$(cd $(dirname $0) && pwd)
declare -A dirs=(
  [movies]='/tank01/media/movies/'
  [staging]='/tank01/downloads/staging/movies/'
  [working]=$(cd $(dirname "$0") && pwd)
)
declare -A watcher=(
  [apikey]='d1ae501ed6c685b3107aa59e56292e5c'
  [endpoint]='postprocessing'
  [port]=2002
  [staging]='/downloads/staging/movies/'
  [url]='http://media-automator.c3.local'
)
mapfile -t movies < "${dirs[working]}/movies-transfer.list"

for movie in "${movies[@]}"; do
  # bail on empty entry
  [ -z "${movie//[[:space:]]}" ] && continue

  # ensure movie is a file
  if [ ! -f "${dirs[movies]}${movie}" ]; then
    echo "Not a file: \"${movie}\""
    continue
  fi

  # ensure file is readable
  if [ ! -r "${dirs[movies]}${movie}" ]; then
    echo "Cannot read \"${movie}\""
    continue
  fi
  
  # store file media data
  declare -A media=(
    [location]="${dirs[movies]}${movie}"
    [filename]=$(basename "${movie}")
  )

  # hardlink file in staging area & verify
  media[link]="${dirs[staging]}${media[filename]}"
  ln "${media[location]}" "${media[link]}" 2>/dev/null
  if [ ! -f "${media[link]}" ]; then
    echo "Could not create link \"${media[link]}\""
    continue
  fi

  # create GUID for filename
  media[guid]=$(<<<"${media[filename]}" md5sum | cut -c 1-32)

  # call Watcher API to retrieve media info
  declare -A http=(
    [res]=$(curl -sw "\n%{http_code}" -X POST \
      -H 'Accept: application/json' \
      -H 'Content-Type: application/x-www-form-urlencoded' \
      -d 'mode=complete' \
      -d "apikey=${watcher[apikey]}" \
      -d "guid=${media[guid]}" \
      -d "path=${watcher[staging]}${media[filename]}" \
      "${watcher[url]}:${watcher[port]}/${watcher[endpoint]}/")
  )

  # check HTTP status code
  http[code]=$(<<<"${http[res]}" tail -n1)
  if [ ${http[code]} -ne 200 ]; then
    echo "Watcher failed with status ${http[code]}"
    continue
  fi

  # ensure media info was found
  media[json]=$(<<<"${http[res]}" head -n1 | jq -r '.data')
  if [ -z $(<<<"${media[json]}" jq -j '.tmdbid, .imdbid | values') ]; then
    echo "Metadata not found for \"${media[filename]}\""
    continue
  fi

  # calculate new filename
  media+=(
    [container]=$(<<<"${media[json]}" jq -r '.container')
    [title]=$(<<<"${media[json]}" jq -r '.title' | tr ':' '-')
    [year]=$(<<<"${media[json]}" jq -r '.year')
    [edition]=$(<<<"${media[json]}" jq -r '.edition | if (type=="array") then . else [.] end | map(if length!=0 then . else empty end) | join(" ")')
  )
  [ -z "${media[container]}" ] \
    && media[container]="${media[filename]##*.}"
  media[name]="${media[title]]} (${media[year]})"
  [ -n "${media[edition]}" ] \
    && media[name]+=" - ${media[edition]}"
  media[filename]="${media[name]//[\"\{\}\?\%\*<>]}.${media[container]}"

  # rename file & verify
  mv "${media[link]}" "${dirs[staging]}${media[filename]}" 2>/dev/null
  if [ ! -f "${dirs[staging]}${media[filename]}" ]; then
    echo "Failed to rename \"${media[link]}\""
    continue
  fi
  echo "Completed: ${media[filename]}"

  # move movie to final location

  # upload file to Google Drive
  
done

exit 0
