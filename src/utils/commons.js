export const fetchRocketData = (data) =>{
    const rocketSpecificData = Object.values(data).map((satelite)=>{
        const {rocket = {}, launch_year, launch_success, links = {}} = satelite;
        const {rocket_name} = rocket;
        const {mission_patch} = links;
        return {
            name: rocket_name,
            year: launch_year,
            status: launch_success,
            image: mission_patch
        }
    })
    console.log('Final data which is to be saved in redux is:-', rocketSpecificData);
    return rocketSpecificData;
}

export const fetchYears = (data) =>{
    const years = fetchRocketData(data).map(val => val.year)
    console.log('Years are:-', years);
    let uniqueYears = [...new Set(years)]
    return uniqueYears;
}