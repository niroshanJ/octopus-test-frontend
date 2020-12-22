import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/'
});

export const getData = () => {
    return axiosInstance.get('data');
}

export const getWhiskerChartData = () => {
    return axiosInstance.get('chart/bow');
}

export const getFilteredScores = (filterValues) => {
    return axiosInstance.post('student/score', filterValues);
}
