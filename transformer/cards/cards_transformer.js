module.exports = {
    filterData: function (data) {
        var finalData = {};
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                finalData[key] = data[key];
            }
        }
        finalData['createdby'] = '';
        return finalData;
    }
}