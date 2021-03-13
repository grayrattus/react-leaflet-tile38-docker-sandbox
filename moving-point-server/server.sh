#/bin/bash

if [[ -z $PROXY_IP ]]; then
	PROXY_IP=localhost
fi

sizeOfFleet=10

lodzStartPosition() {
	echo 51.77058 19.47395
}

randomSign() {
	echo -e '-1\n1' | shuf -n 1
}

newRandomPosition() {
	x=$(echo "scale=6 ; $(getX $@)+$(randomSign)*$((RANDOM % 1000 - 1000 ))/10000000" | bc -l)
	y=$(echo "scale=6 ; $(getY $@)+$(randomSign)*$((RANDOM % 1000 - 1000 ))/10000000" | bc -l)

	echo $x $y
}

getX() {
	echo $@ | cut -d ' ' -f 1
}

getY() {
	echo $@ | cut -d ' ' -f 2
}

fleets=()
points=()
for i in $(seq 0 $sizeOfFleet); do
	fleets+=("truck$i");
	points+=("$(lodzStartPosition)");
	echo "set fleet ${fleets[$i]} point ${points[$i]}"
	curl --data "set fleet ${fleets[$i]} point ${points[$i]}" $PROXY_IP:8080
done

echo "Testing simulator"

while true; do 
	for i in $(seq 0 $sizeOfFleet); do
		newPosition=$(newRandomPosition ${points[i]})
		points[$i]="$newPosition"

		echo "prev: ${points[$i]} new: $newPosition points ${points[$i]}"
		curl --data "set fleet ${fleets[$i]} point ${points[$i]}" $PROXY_IP:8080
	done
	echo 

	sleep 1;
done




