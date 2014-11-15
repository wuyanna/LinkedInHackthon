#!/usr/bin/perl
#randomGen.pl
#Generate random linkedin profiles

use warnings;
use strict;

open(RAND10, '>', "/Users/Shannon/devHer/random10txt.txt") or die "Couldn't open file to write to, $!";

open(FNAMES, '<', "/Users/Shannon/devHer/firstnames") or die "Couldn't open first names, $!";

open(LNAMES, '<', "/Users/Shannon/devHer/lastnames") or die "Couldn't open last names, $!";


my ($rand_title, $rand_ed, $pos_max_len, $pos_len, $pos_yr_sum, $profile_id, $f_name, $l_name, $pos_total, $pos_id, $pos_title, $pos_start_year, $pos_start_month, $pos_is_current, $pos_company, $ed_total, $ed_id, $ed_school, $ed_degree, $ed_start, $ed_end, $working_years);

my @pos_title_arr = ("Software Engineer", "Product Manager", "Project Manager", "Quality Assurance Engineer");

my @pos_company_arr = ("Google", "LinkedIn", "Twitter", "Cisco", "Apple", "Facebook", "Oracle", "Intel", "Hewlett-Packard", "Yahoo!");

my @ed_school_arr = ("Carnegie Mellon University", "Massachusetts Institute of Technology", "Stanford University", "University of California, Berkeley", "University of Illinois, Urbana-Champaign", "Cornell University", "University of Washington", "Stanford", "Georgia Institute of Technology", "California Institute of Technology");

my @ed_degree_arr = (" ", "Bachelor of Computer Science", "Master of Computer Science",  "PhD in Computer Science");


my (@f_name_arr, @l_name_arr);

my $countf = 0;

while (my $line = <FNAMES>)
{
       last if $countf >=300;
       $line =~ /([A-Z]+)/;
       $f_name_arr[$countf] = $1;
       $countf++;

}


my $countl = 0;
while (my $line = <LNAMES>)
{
       last if $countl >=300;
       $line =~ /([A-Z]+)/;
       $l_name_arr[$countl] = $1;
       $countl++;

}

print RAND10 '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<people-search>
  <num-results>1000</num-results>
  <people total="1000">
';

for (my $i = 0; $i < 10; $i++)
{

	$f_name = $f_name_arr[int(rand(300))];
	$l_name = $l_name_arr[int(rand(300))];
	$profile_id = int(rand(999999999));
#	$working_years = int(rand(30));
	$pos_total = 1 + int(rand(10));



	$rand_title = int(rand(10));
	if ($rand_title < 4)
	{
		$rand_title = 0;
	}
	elsif ($rand_title >=4 && $rand_title < 6)
	{
		$rand_title = 1;
	}
	elsif ($rand_title >=6 && $rand_title < 8)
	{
		$rand_title = 2;
	}
	else
	{
		$rand_title = 3;
	}
	print "The random title num is $rand_title\n";
	$pos_title = $pos_title_arr[$rand_title];


	$rand_ed = int(rand(10));
        if ($rand_ed < 6)
        {
                $rand_ed = 0;
        }
        elsif ($rand_ed >=6 && $rand_ed < 9)
        {
                $rand_ed = 1;
        }
        else
        {
                $rand_ed = 2;
        }
        print "The random education num is $rand_ed\n";
        $ed_total = (1 + $rand_ed);
	print "The ed degree is $ed_degree_arr[$ed_total]\n";


#	print RAND10 "$f_name, $l_name, $profile_id, $pos_total, $pos_id, $pos_title, $pos_start_month, $pos_is_current, $pos_company, $ed_total, $ed_id, $ed_school, $ed_degree, $working_years\n";


	print RAND10 "    <person>
      <id>$profile_id</id>
      <first-name>$f_name</first-name>
      <last-name>$l_name</last-name>
      <positions total=\"$pos_total\">
";

	for (my $num_pos = 0; $num_pos < $pos_total; $num_pos++)
	{

		if ($num_pos = 0)
		{
			$pos_is_current = "true";
		}
		else
		{
			$pos_is_current = "false";
		}

		$pos_max_len = (1 + rand(30)) / $pos_total;
		print "The max length is $pos_max_len\n";

		$pos_yr_sum = 0;

		for (

			
		$pos_id = int(rand(999999));
#		$pos_start_year  #calc based on working years
		$pos_start_month = "July";
		$pos_is_current = int(rand(2));
		$pos_company = $pos_company_arr[int(rand(10))];


		print RAND10 "        <position>
          <id>$pos_id</id>
          <title>$pos_title</title>
          <start-date>
            <year>2012</year>
            <month>August</month>
          </start-date>
          <is-current>true</is-current>
          <company>
            <name>$pos_company</name>
          </company>
        </position>
";
	}

	print RAND10 "      </positions>
      <educations total=\"$ed_total\">
";

	for (my $num_ed = 0; $num_ed < $ed_total; $num_ed++)
	{

		$ed_id = int(rand(9999));
		$ed_school = $ed_school_arr[int(rand(10))];
#		$ed_start
#		$ed_end
		$ed_degree = $ed_degree_arr[($ed_total - $num_ed)];



		print RAND10 "        <education>
          <id>$ed_id</id>
          <school-name>$ed_school</school-name>
          <degree>$ed_degree</degree>
          <start-date>
            <year>2006</year>
          </start-date>
          <end-date>
            <year>2010</year>
          </end-date>
        </education>
";
	}
		print RAND10 "      </educations>
    </person>
";
}

print RAND10 '  </people>
</people-search>
';

close(RAND10);
close(FNAMES);
close(LNAMES);


print "done\n";
