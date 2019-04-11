d3.json("static/js/final.json", function(data) {
    //console.log(data);

    restTypeList = [];
    listCheck = false;
    restTypeDict = [];
    restType = [];
    restCount = [];
    restColor = [];
    priceRange = [];
    zipCode = [];
    
    data.forEach(function(row){
        for(x=0; x<restTypeList.length; x++){
            if (row.type ===restTypeList[x]){
                listCheck = true;
            }
            
        }
        if (listCheck===false){
            restTypeList.push(row.type);
            restTypeDict.push({
                type: row.type,
                count: 0

            })
        }
        listCheck = false;
    })
    data.forEach(function(row){
        restTypeDict.forEach(function(dict){
            if (row.type===dict.type){
                dict.count++;
            }
        })
    })
    restTypeDict.sort(function(a, b){
        return b.count-a.count
    })

    for(z=0; z<restTypeDict.length; z++){
        restType.push(restTypeDict[z].type);
        //console.log(restTypeDict[z].type);
        restCount.push(restTypeDict[z].count);
        restColor.push(getRandomColor());

    }

    //console.log(restType);
    //console.log(restCount);
    //console.log(restColor);
    new Chart(document.getElementById("bar-chart"), {
        type: 'bar',
        data: {
          labels: restType,
          datasets: [
            {
              label: "Restaurant Count",
              backgroundColor: restColor,
              data: restCount
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Charlotte Restaurant Histogram'
          }
        }
    });
    //console.log(restTypeDict.length);
    //console.log(restTypeDict[0].type);
    new Chart(document.getElementById("pie-chart"), {
      type: 'pie',
      data: {
        labels: restType,
        datasets: [
          {
            label: "Restaurant Count",
            backgroundColor: restColor,
            data: restCount
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Charlotte Restaurant Piechart'
        }
      }
    });

  })
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }