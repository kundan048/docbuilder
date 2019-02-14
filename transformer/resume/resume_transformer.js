module.exports = {
    filterData: function (data) {
        var finalData = {};
        finalData['degree'] = [];
        finalData['project'] = [];
        finalData['experience'] = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                
                if(key == 'first_degree') {
                    finalData.degree.push(data[key]);
                } else if(key == 'second_degree') {
                    finalData.degree.push(data[key]);
                } else if(key == 'third_degree') {
                    finalData.degree.push(data[key]);
                } else if(key == 'first_project') {
                    finalData.project.push(data[key]);
                } else if(key == 'second_project') {
                    finalData.project.push(data[key]);
                } else if(key == 'first_experience') {
                    finalData.experience.push(data[key]);
                } else if(key == 'second_experience') {
                    finalData.experience.push(data[key]);
                } else {
                    finalData[key] = data[key];
                }
            }
        }
        return finalData;
    }
}