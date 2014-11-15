#!/usr/bin/perl
#randomGen.pl
#Generate random linkedin profiles

use warnings;
use strict;

open(RAND10, '>', "/Users/Shannon/devHer/random1000.xml") or die "Couldn't open file to write to, $!";

open(FNAMES, '<', "/Users/Shannon/devHer/firstnames") or die "Couldn't open first names, $!";

open(LNAMES, '<', "/Users/Shannon/devHer/lastnames") or die "Couldn't open last names, $!";


my ($rand_title, $rand_ed, $pos_max_len, $pos_len, $pos_yr_sum, $pos_current_total, $ed_current_degree, $profile_id, $f_name, $l_name, $pos_total, $pos_id, $pos_title, $pos_end_year, $pos_start_year, $pos_start_month, $pos_is_current, $pos_company, $ed_total, $ed_id, $ed_school, $ed_degree, $ed_start, $ed_end);

my @pos_title_arr = ("Software Engineer", "Product Manager", "Project Manager", "Quality Assurance Engineer");

my @pos_company_arr = ("Google", "LinkedIn", "Twitter", "Cisco", "Apple", "Facebook", "Oracle", "Intel", "Hewlett-Packard", "Yahoo!");

my @ed_school_arr = ("Carnegie Mellon University", "Massachusetts Institute of Technology", "Stanford University", "University of California, Berkeley", "University of Illinois, Urbana-Champaign", "Cornell University", "University of Washington", "Stanford", "Georgia Institute of Technology", "California Institute of Technology");

my @ed_degree_arr = (" ", "Bachelor of Computer Science", "Master of Computer Science",  "PhD in Computer Science");

my @degree_len_arr = (" ", 4, 2, 3);

my (@f_name_arr, @l_name_arr, @pos_len_arr);

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

for (my $i = 0; $i < 1000; $i++)
{

	$f_name = $f_name_arr[int(rand(300))];
	$l_name = $l_name_arr[int(rand(300))];
	$profile_id = int(rand(999999999));
	$pos_total = 1 + int(rand(10));
	
	print "Total # of positions is $pos_total\n";


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

	$pos_max_len = int((1 + int(rand(30))) / $pos_total);
	print "The max length is $pos_max_len\n";
	$pos_yr_sum = 0;
	$pos_current_total = 0;
	@pos_len_arr = ();

	for (my $num_pos = 0; $num_pos < $pos_total; $num_pos++)
	{
		$pos_len = 1 + int(rand($pos_max_len));
		$pos_len_arr[$num_pos] = $pos_len;
		$pos_yr_sum += $pos_len;
	}

	print "The sum is $pos_yr_sum\n";
	print "The individual job lengths are @pos_len_arr\n";


#	print RAND10 "$f_name, $l_name, $profile_id, $pos_total, $pos_id, $pos_title, $pos_start_month, $pos_is_current, $pos_company, $ed_total, $ed_id, $ed_school, $ed_degree, $working_years\n";


	print RAND10 "    <person>
      <id>$profile_id</id>
      <first-name>$f_name</first-name>
      <last-name>$l_name</last-name>
      <positions total=\"$pos_total\">
";

	for (my $num_pos = 0; $num_pos < $pos_total; $num_pos++)
	{

		if ($num_pos == 0)
		{
			$pos_is_current = "true";
		}
		else
		{
			$pos_is_current = "false";
		}

			
		$pos_id = int(rand(999999));
		$pos_end_year = (2014 - $pos_current_total);
		$pos_current_total += $pos_len_arr[$num_pos];
		$pos_start_year = (2014 - $pos_current_total);
		$pos_start_month = "July";
		$pos_company = $pos_company_arr[int(rand(10))];


		print RAND10 "        <position>
          <id>$pos_id</id>
          <title>$pos_title</title>
          <start-date>
            <year>$pos_start_year</year>
            <month>$pos_start_month</month>
          </start-date>
          <end-date>
            <year>$pos_end_year</year>
          </end-date>
          <is-current>$pos_is_current</is-current>
          <company>
            <name>$pos_company</name>
          </company>
        </position>
";
	}

print "Current year is : 2014 - $pos_current_total\n";


	print RAND10 "      </positions>
      <educations total=\"$ed_total\">
";


	$ed_current_degree = $ed_total;
	
	for (my $num_ed = 0; $num_ed < $ed_total; $num_ed++)
	{
		
		$ed_id = int(rand(9999));
		$ed_school = $ed_school_arr[int(rand(10))];
		$ed_end = (2014 - $pos_current_total);
		$pos_current_total += $degree_len_arr[$ed_current_degree]; 
		$ed_start = (2014 - $pos_current_total);
		$ed_degree = $ed_degree_arr[($ed_total - $num_ed)];
		$ed_current_degree--;

print "NOTE: current length of degree is $degree_len_arr[$ed_current_degree]\n";
print "NOTE: current start date of degree is $ed_start\n";


		print RAND10 "        <education>
          <id>$ed_id</id>
          <school-name>$ed_school</school-name>
          <degree>$ed_degree</degree>
          <start-date>
            <year>$ed_start</year>
          </start-date>
          <end-date>
            <year>$ed_end</year>
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
