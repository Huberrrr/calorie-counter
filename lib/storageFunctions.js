import { AsyncStorage } from 'react-native';

export async function getData(date) {
    try {
        const data = await AsyncStorage.getItem(date);
        return data;
    } catch(error) {
        console.log(error);
    }
}

export async function setData(data) {
    try {
        await AsyncStorage.setItem(data.date, data.number);
    } catch(error) {
        console.log(error);
    }
}

export async function getLimit() {
    try {
        const limit = await AsyncStorage.getItem('limit');
        return limit;
    } catch(error) {
        console.log(error);
    }
}

export async function setLimit(limit) {
    try {
        await AsyncStorage.setItem('limit', limit);
    } catch(error) {
        console.log(error);
    }
}