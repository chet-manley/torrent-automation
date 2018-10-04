#!/usr/bin/env perl

use strict;
use warnings;

use Cwd qw(abs_path);
use Fcntl qw(:flock);
use File::Basename qw(dirname);
use Getopt::Long;
use Log::Log4perl;
use Pod::Usage;

# custom libraries
use lib dirname(abs_path $0) . '/lib';
use Utils;

# declare variables
my ($exit_code, $options, $utils) = ();

# run the program
run();

# Limit hard drive thrashing during extract and copy actions by ensuring 
# there is only one torrent processing at a time.
#   @param: none
# @returns: {boolean} success of lock
=item get_lock()
    Arguments:
        none

    Returns:
        boolean - success of lock

    Limit hard drive thrashing during extract and copy actions by ensuring
    there is only one torrent processing at a time.
=cut
sub get_lock {
    my ($app, $lockstatus) = ();
    
    # open this application file for reading
    open $app, '<', $0
      or die "Could not read $0 for lock: $!\n";
    # request file lock
    $lockstatus = flock $app, LOCK_EX
      or die "Could not obtain app lock: $!\n";

    return $lockstatus
# --- deprecated
    # request file lock
    unless ( $lockstatus = flock $app, LOCK_EX|LOCK_NB ) {
        # initial request failed, wait for file lock
        $lockstatus = flock $app, LOCK_EX
          or die "Could not obtain app lock: $!\n";
    }

    return $lockstatus;
# ---
}

=item setup()
    Arguments:
        none

    Returns:
        boolean - success of setup

    Set up config and options.
=cut
sub setup {
    my ($go) = ();

    # initialize shell exit code and options hash
    $exit_code = 0;
    $options = {
        'dirs' => []
    };

    # parse command line options with bundling option
    $go = Getopt::Long::Parser->new(config => ['bundling']);
    $go->getoptions($options,
        'debug|d',
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
=encoding utf8
=head1 NAME
Torrent post-processor
=head1 SYNOPSIS
torrent-postprocessing.pl <option> [<option>] [-v]
=head1 OPTIONS
  -d, --debug           Display debug info
  -v, --verbose         Display verbose info
  -?, --help            This help message
=cut
