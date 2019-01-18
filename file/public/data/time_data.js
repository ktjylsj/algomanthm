function getRandomData(ordinal = false) {

    var temp = "/data/temp.csv";
    console.log(temp)
  
    const NGROUPS = 1,
        MAXLINES = 100,
        MAXSEGMENTS = 1,
        MAXCATEGORIES = 8,
        MINTIME = new Date(2016, 7, 7);

    const nCategories = MAXCATEGORIES,
        categoryLabels = [ '', '접수', '위원회 심사', '체계지구 심사', '본회의 심의', '정부 이송', '공포', '대안반영폐기', '폐기' ];
    
    return [...Array(NGROUPS).keys()].map(i => ({
        group: "동물보호법",
        data: getGroupData()
    }));

    //

    function getGroupData() {

        return [...Array(MAXLINES).keys()].map(i => ({
            label: "동물보호법" + i,
            data: getSegmentsData()
        }));

        //

        function getSegmentsData() {
            const nSegments = Math.ceil(Math.random()*MAXSEGMENTS),
                segMaxLength = Math.round(((new Date())-MINTIME)/MAXSEGMENTS);
            let runLength = MINTIME;

            return [...Array(nSegments).keys()].map(i => {
                const start = new Date(runLength.getTime()),
                      end = new Date(2016, 7, 8);
                return {
                    timeRange: [start, end],
                    val: ordinal ? categoryLabels[Math.ceil(Math.random()*nCategories)] : Math.random()
                    //labelVal: is optional - only displayed in the labels
                };
            });

        }
    }
}