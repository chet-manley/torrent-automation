#function Invoke-QuickNDirty {
  [CmdletBinding(SupportsShouldProcess=$TRUE,
                 PositionalBinding=$false)]
  [OutputType()]
  Param (
	[Parameter(Mandatory=$TRUE)][ValidateNotNullOrEmpty()][string]$Category,
    [Parameter(Mandatory=$TRUE)][ValidateNotNullOrEmpty()][string]$File,
    [Parameter(Mandatory=$TRUE)][ValidateNotNullOrEmpty()][string]$Name,
  	[Parameter(Mandatory=$TRUE)][ValidateNotNullOrEmpty()][string]$Path,
    [Parameter(Mandatory=$FALSE)][string]$File_count,
  	[Parameter(Mandatory=$FALSE)][string]$Hash,
    [Parameter(Mandatory=$FALSE)][string]$Kind = 'multi'
  )

    # Initialize configuration variables

    # torrent hash
    [hashtable]$torrent = @{
      'category' = $Category
      'count'    = $File_count
      'file'     = $File
      'hash'     = $Hash
      'type'     = $Kind
      'name'     = $Name
      'path'     = $Path
    }

    # pre-processing tasks to perform
    [hashtable]$config = @{
      'filebot' = @{
        'executable'  = 'C:/apps/.torrent.tools/filebot/filebot.cmd'
        'extract_dir' = 'E:/preprocessing'
        'final_dir'   = 'E:/processed'
        'flags'       = '--action copy --conflict auto -non-strict -script fn:amc'
        'defs'        = '--def excludeList=amc.excludes unsorted=y music=n artwork=n clean=y'
        'formats'     = @{
          'anime' = 'animeFormat="{plex}"'
          'movie' = "movieFormat=`"movies/{n.colon(' - ')} ({y}){' - '+tags}`""
          'tv'    = 'seriesFormat="{plex}"'
        }
      }
    }

    # single or multi file torrent
    if ($torrent.count -gt 1) {
      $torrent.type = 'multi'
    } else {
      $torrent.type = 'single'
    }

    # only process movies, tv & anime
    if ( $torrent.category -in @('anime', 'movies', 'tv') ) {
      # build command
      $command = "$($config.filebot.executable) --output `"$($config.filebot.final_dir)`" --log-file `"$($config.filebot.final_dir)/amc.log`" "
      $command += "$($config.filebot.flags) $($config.filebot.defs) extractFolder=`"$($config.filebot.extract_dir)`""
      ForEach ($format in $config.filebot.formats.Keys) {
        $command += " $($config.filebot.formats.Item($format)) "
      }
      # add torrent specific variables
      $command += "ut_dir=`"$($torrent.path)`" ut_file=`"$($torrent.file)`" ut_title=`"$($torrent.name)`" ut_label=`"$($torrent.category)`" ut_kind=`"$($torrent.type)`""
      # RUN filebot command
      Invoke-Expression $command
    } else {
      Write-Verbose "Skipped processing of category: $($torrent.category)"
      exit 2
    }
#}
#Export-ModuleMember -Function Invoke-QuickNDirty

## test run
# cmc /c powershell -NoExit -NoProfile -ExecutionPolicy ByPass "E:\scripts\Invoke-QuickNDirty.ps1 -Category 'tv' -Path 'e:/scripts' -Name 'name'" -verbose
## run from qBittorrent
# powershell -NoProfile -ExecutionPolicy ByPass "E:\scripts\Invoke-QuickNDirty.ps1 -Name '%N' -Category '%L' -Path '%R' -File '%F' -File_count '%C' -Hash '%I'"
