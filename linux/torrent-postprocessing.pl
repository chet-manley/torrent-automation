#!/usr/bin/env perl

use strict;
use warnings;

use Cwd qw(abs_path);
use File::Basename qw(dirname);
use Getopt::Long;
use Pod::Usage;

# custom libraries
use lib dirname(abs_path $0) . '/lib';
use Utils;

# declare variables
my ($exit_code, $options, $utils) = ();

# run the program
run();

# requires: none
#  returns: 1
sub setup {
  my ($go) = ();

  # initialize shell exit code and options hash
  $exit_code = 0;
  $options = {
    'dirs' => []
  };

  # parse command line options with bundling options
  $go = Getopt::Long::Parser->new(config => ['bundling']);
  $go->getoptions($options,
    'verbose|v',
    'help|?'
  ) or pod2usage "Try '$0 --help' for more information.";

  # display help and exit
  if ( $options->{'help'} ) { pod2usage 2; }

  # instantiate class objects
  $utils = Utils->new({
    'verbose' => $options->{'verbose'}
  });

  # no arguments passed, display help and exit
  if ( ! @ARGV ) { pod2usage 'At least one directory is required.'; }

  # test our directories
  foreach ( @ARGV ) {
    if ( ! -d $_ ) {
      $utils->verbose( qq("$_" is not a valid directory.), 1 );
    } else {
      push @{ $options->{'dirs'} }, $_;
    }
  }

  # no valid directories, display help and exit
  if ( ! @{ $options->{'dirs'} } ) {
    pod2usage 'No valid directories were found.';
  }

  return 1;
}

# exit to shell
exit $exit_code;

__END__
=head1 SYNOPSIS
remove_world_write_permissions.pl <directory> [<directory>] [-v]
=head1 OPTIONS
  -v, --verbose         Display verbose output
  -?, --help            This help message
=cut
