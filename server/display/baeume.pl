#!/usr/bin/perl -w

# Array von Knotenpunkten (Eingabe)
#my @KP=("0","01","00","000","001","010","012","011","013","0100","0130","0102","0101","0131");
#my @KP=("0","01","00","000","001","0011","0010","010","011","0100","0101","0110","0111");
#my @KP=("0","01","00","02","03","010","011","012","0120","0121","030","031","04","040","0400","0401","0402","041","05","050","051","0510","0511","000","001","002");
#my @KP=("0","01","00","02","000","001","020","021","022","023","0010","0011","0200","0201","0202","0230","0231","02010","02011","02020","02300","02301");
my @KP=("0","01","00","02","000","0000","00000","00001","00002","000000","000001","001","020","021","022","023","0010","0011","0200","0201","0202","0230","0231","02010","02011","02020","02300","02301");

# ...lexikalisch und nach Laenge sortieren
@KP=sort{length($a)<=>length($b) || $a cmp $b} @KP;
print "@KP\n";

# Array/Matrix von Koordinaten der KP initialisieren
my @KM=();
my @KPM=();

# intialer Abstand von Knotenpunkten in x/y-Richtung
my $dx=1;
my $dy=0.3;

#
# Hoehe des Baums (von 0 .. h-1) und Matrix von Knotenpunkten bauen und Intialisierung
#

my $h=0;	# Hoehe
my $i=0;	# Zeile
my $j=-1;	# Spalte
foreach my $k (@KP){
	$i=length($k)-1;

	# Initialisierung der Arrays fuer die Reihe (punkte und Koordinaten)
	$KPM[$i]=[] if not exists $KPM[$i];
	$KM[$i]=[] if not exists $KM[$i];

	# maximale Stellenzahl (=Hoehe) und Spalte setzen
	if($i>$h){
		# neue Reihe
		$h=$i;
		$j=0;
	} else {
		# selbe Reihe
		$j=$j+1;
	}
	printf "%s %i %i %i\n",$k,$h,$i,$j;

	# Knotenpunkt hinzufuegen
	push @{$KPM[$i]},$k;

	# initiale Koordinaten hinzufuegen (in jeder Reihe initial im Abstand x)
	push @{$KM[$i]},[$j*$dx,$i*$dy];
}

#
# Loop zur Berechnumg der (finalen) Koordinaten
#

for(my $i=$h;$i>=0;$i--){

	# aktuelle Zeile
	@row=@{$KPM[$i]};
	my @vaeter=();
	print "\nZeile: @row\n";
	
	# alle Elemente einer Zeile in Kind-Gruppen durchgehen und Koordinaten berechnen
	for(my $j=0;$j<@row;$j++){
		print "\n";
		print "($i,$j): Knoten=$KPM[$i][$j]\n";	

		# Name es Vaters dieser Gruppe
		my $name=substr($KPM[$i][$j],0,$i);

		# wieviel Kinder (=l) gehoeren zum gleichen Vater-Knoten?
		my $l=0;
		while(exists $row[$j+$l+1] && substr($row[$j+$l+1],0,$i) eq $name){
			$l++;
		} 

		# x-Koordinate des Vaters dieser Gruppe (mittig ueber der Gruppe)
		my $delta=($KM[$i][$j+$l][0]-$KM[$i][$j][0])/2;
		my $y=$KM[$i][$j][0]+$delta;

		# Vater mittig drueber platzieren
		my $col=index_of($KPM[$i-1],$name);
		if($col>=0){
			push @vaeter,$col;
			$KM[$i-1][$col][0]=$y;
		}

		# die Elemente der naechsten Gruppe (falls existent) in dieser Reihe samt Kindern um delta verschieben
		shift_element_and_children($row[$j+$l+1],$delta) if exists $row[$j+$l+1];
		my $m=1;
		while(exists $row[$j+$l+1+$m] && substr($row[$j+$l+1+$m],0,$i) eq substr($row[$j+$l+1],0,$i)){
			shift_element_and_children($row[$j+$l+1+$m],$delta);
			$m++;
		}

		# naechste Kind-Gruppe
		printf "(%i,%i): l+1=%i Vater-Name=%s Vater-Koordinate-neu=$y alle-Vaeter-Indizes=(@vaeter)\n",$i,$j,$l+1,$name;
		$j+=$l;

	}	


	# Koordinaten der uebrigen Knoten in der darueberliegenden Reihe berechnen
	if($i>0){
		#... die ganz links
		for(my $ind=$vaeter[0]-1;$ind>=0;$ind--){
	print "links: $ind\n";
			$KM[$i-1][$ind][0]=$KM[$i-1][$vaeter[0]][0]-($vaeter[0]-$ind)*$dx;
		}

		#... die dazwischen
		my $maxcol=pop @vaeter;
		my $prevcol=$maxcol;
	print "vor dazwischen: Zeile $i: prev=$prevcol max=$maxcol \n";
		#while(my $nextcol=pop @vaeter){
		while(@vaeter){
			my $nextcol=pop @vaeter;
			for(my $col=$nextcol+1;$col<$prevcol;$col++){
	print "dazwischen: prev=$prevcol next=$nextcol col=$col \n";
				my $y=($KM[$i-1][$prevcol][0]-$KM[$i-1][$nextcol][0])/($prevcol-$nextcol);
				$KM[$i-1][$col][0]=$KM[$i-1][$nextcol][0]+($col-$nextcol)*$y;
			}
			$prevcol=$nextcol;
		}

		#... die am Ende
		my $ind=$maxcol+1;
		while(exists $KM[$i-1][$ind]){
	print "rechts: $ind\n";
			$KM[$i-1][$ind][0]=$KM[$i-1][$maxcol][0]+($ind-$maxcol)*$dx;
			#$KM[$i-1][$ind][0]=$KM[$i-1][$maxcol][0]+($ind-$maxcol)*($maxcol-$KM[$i-1][$maxcol][0]);
			$ind++;
		}

	}

	print "\nZwischenstand:\n";
	print_table(\@KM);
}


print "\nEndstand:\n";
print_table(\@KM);
open DAT,">baeume.dat";
write_data($KPM[0][0]);
close DAT;
plot_data("aqua",$dx/2,0.5);
my @args=("gnuplot","baeume.cmd");
system(@args)==0 or die "system @args failed: $?";

sub shift_element_and_children {
	my $name=shift;
	my $delta=shift;

	my $i=length($name)-1;
	my $j=index_of($KPM[$i],$name);
	
	printf ">> (%i,%i): name=%s delta=%i\n",$i,$j,$name,$delta;

	# dieser Knoten
	$KM[$i][$j][0]+=$delta;
	printf ">>>> (%i,%i): %d \n",$i,$j,$KM[$i][$j][0];
	# Kinder
	my $n=0;
	while(index_of($KPM[$i+1],$KPM[$i][$j]."$n")>=0){
		shift_element_and_children($KPM[$i][$j]."$n",$delta);
		$n++;
	}

}

sub index_of {
	my $aref=shift;
	my $name=shift;

	if(defined($aref)){
		my ($index) = grep {$aref->[$_] eq $name} (0 .. @{$aref}-1);
		#print "index_of(name): aref defined, $aref->[0], Name: $name\n";
		return defined($index)?$index:-1;
	} else {
		#print "index_of(name): aref undefined\n";
		return -1;
	}
}


sub print_table {
	print "\n";
        my $aref=shift;
        foreach (@{$aref}){
                foreach (@{$_}){
                        print "($_->[0],$_->[1]) ";
                }
                print "\n";
        }
}

######### nicht mehr genutzt ############
sub abstand {
	### my $d=($j>0)?int(substr($KPM[$i][$j+$n],0,$i))-int(substr($KPM[$i][$j+$n-1],0,$i)):0;
	# Argumente a,b von der Form "011", "030"
	my $b=shift;
	my $a=shift;

	my @B=split //,$b;
	my @A=split //,$a;

	my $d=0;
	for(my $i=0;$i<@A;$i++){
		$d=$B[$i]-$A[$i];
		last if $d>0;
	}

	return $d;
}
#########################################

sub write_data {
	my $parent=shift;
	my $i=length($parent)-1;
	my $p=index_of($KPM[$i],$parent);
	print "write_data: ($i,$p) $KPM[$i][$p]\n";
	my $j=0;
 	my $n=0;
	my $q=0.618;
        while(exists $KPM[$i+1]){
		$j=index_of($KPM[$i+1],$parent."$n");
		$j<0 and last;
        	print DAT "$KM[$i][$p][0] -$KM[$i][$p][1] \"$KPM[$i][$p]\"\n";# if $n==0;
        	printf DAT "%f %f \"\"\n\n",$KM[$i][$p][0],-($KM[$i][$p][1]+($KM[$i+1][$j][1]-$KM[$i][$p][1])*$q);# if $n==0;

        	printf DAT "$KM[$i+1][$j][0] %f \"\"\n",-($KM[$i][$p][1]+($KM[$i+1][$j][1]-$KM[$i][$p][1])*$q);
        	printf DAT "$KM[$i][$p][0] %f \"\"\n\n",-($KM[$i][$p][1]+($KM[$i+1][$j][1]-$KM[$i][$p][1])*$q);

        	printf DAT "$KM[$i+1][$j][0] %f \"\"\n",-($KM[$i][$p][1]+($KM[$i+1][$j][1]-$KM[$i][$p][1])*$q);
        	print DAT "$KM[$i+1][$j][0] -$KM[$i+1][$j][1] \"$KPM[$i+1][$j]\"\n\n";
		$n++;
		write_data($KPM[$i+1][$j]);
	}
}


sub plot_data {

        my $term=shift;
        my $offsetx=shift;
        my $offsety=shift;

	print "plot: $term, $offsetx, $offsety\n";

        open CMD,">baeume.cmd";
        print CMD "set offsets $offsetx, $offsetx, $offsety, $offsety\n";
        print CMD "set term $term font 'Verdana,8'\n";
	printf CMD "plot \"baeume.dat\" using 1:2:3 with labels left offset 0.5,-0.4 notitle, '' with linespoints lt 15 pt 0";

}
