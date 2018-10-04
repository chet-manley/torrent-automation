#!/bin/env bash

CWD=$(cd $(dirname $0) && pwd)
movie_dir='/tank01/media/movies/'
staging_dir='/tank01/downloads/staging/movies/'
mapfile -t movies < "${CWD}/movies-transfer.list"
watcher_apikey='d1ae501ed6c685b3107aa59e56292e5c'
watcher_endpoint='postprocessing'
watcher_url='http://media-automator.c3.local'
watcher_port=2002
watcher_staging_dir='/mnt/nas1/downloads/staging/movies/'

for movie in "${movies[@]}"; do
  # bail on empty entry
  [ -z "${movie//[[:space:]]}" ] && continue

  # ensure movie is a file
  if [ ! -f "${movie_dir}${movie}" ]; then
    echo "Not a file: \"${movie}\""
    continue
  fi

  # ensure file is readable
  if [ ! -r "${movie_dir}${movie}" ]; then
    echo "Unreadable file: \"${movie}\""
    continue
  fi
  echo "Found movie: \"${movie}\""

  # hardlink file in staging area
  ln "${movie_dir}${movie}" "${staging_dir}${movie}"

  # create GUID for movie
  movie_guid=$(printf "${movie}" | md5sum | cut -c 1-32)

  # call Watcher API to rename
  movie_json=$(curl -X POST \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'mode=complete' \
  -d "apikey=${watcher_apikey}" \
  -d "guid=${movie_guid}" \
  -d "path=${watcher_staging_dir}${movie}" \
  "${watcher_url}:${watcher_port}/${watcher_endpoint}/" \
  | jq -c '.data')

  # ensure movie data was found
  if [ -z "$(<<<${movie_json} jq -j '.tmdbid, .imdbid | values')" ]; then
    echo "Metadata not found: \"${movie}\""
    continue
  fi

  # cache new filename & extension
  movie=$(basename "$(<<<${movie_json} jq -j '.finished_file | values')")
  movie_extension="${movie##*.}"
  
  # check for special movie editions
  movie_edition=$(<<<"${movie_json}" jq -j '.edition | values')
  if [ -n "${movie_edition}" ]; then
    movie_title="$(<<<${movie_json} jq -r '.title')"
    movie_year="$(<<<${movie_json} jq -r '.year')"
    movie_name="${movie_title} (${movie_year}) - ${movie_edition}.${movie_extension}"
    # rename file again
    #mv "${staging_dir}${movie}" "${staging_dir}${movie_name}"
  fi

  # move movie to final location

  # upload file to Google Drive
  clientid='404707555330-m1f0mtdqks0n2b8g4l1j5g048097ku6j.apps.googleusercontent.com'
  secret='JGPru3Px_yaWqsNgDP8WDnd0'
  access_token='ya29.GlsqBvhSKpNqSJIz0WJqGXtHH_KW9G6x0_UoS1ciFp_b8pTBHsV0V2WnoCO_Jh2qzj_8_p1Pcb2cXRyilvo9vRjwGB9wTFr4ch7Ul3xv28bObDvLpPRS_RnoIKWa'
  refresh_token='1/gs9avxAs1vhMdE2hUbZ8WYmI7VslsRpzyEjgJcU_CJ4'
done

exit 0
