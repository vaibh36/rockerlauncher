export const SAVE_LAUNCH_DETAILS = 'SAVE_LAUNCH_DETAILS';
export const YEAR_SPECIFIC_DATA = 'YEAR_SPECIFIC_DATA';
export const LOAD_SPINNER = 'LOAD_SPINNER';

export const saveLaunchDetails = (data) =>{
    console.log('Action fired');
    return {
        type: 'SAVE_LAUNCH_DETAILS',
        data
     }
}

export const fetchYearSpecificData = (data) =>{
    console.log('Action fired to fetch data');
    return {
        type: 'YEAR_SPECIFIC_DATA',
        data
     }
}

export const loadSpinner = (data) =>{
    console.log('Action fired for spinner');
    return {
        type: 'LOAD_SPINNER',
        data
     }
}