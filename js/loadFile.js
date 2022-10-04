function obtainFile() {
    fetch('./NJ Beach Coordinate List.txt')
    .then(response => response.text())
    .then((text) => {
        let arr = [];
        let textArrayRows = text.split(/\r?\n/);
        for(let i=0; i<textArrayRows.length;i++) {
            let locationArr = textArrayRows[i].split("\t");
            arr.push({
                    name: locationArr[0],
                    lat: locationArr[1],
                    lon: locationArr[2]
                });
        }

        return console.log(arr);
    })
}

