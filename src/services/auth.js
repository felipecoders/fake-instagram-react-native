import AsyncStorage from '@react-native-community/async-storage';

const key = '@Instagram:auth';

export const isAuth = async () => (await getToken()) !== null;

export const getToken = async () => await AsyncStorage.getItem(key);

export const setToken = async token => await AsyncStorage.setItem(key, token);

export const logout = async navigatation => {
  await AsyncStorage.removeItem(key);
  navigatation.navigate('SignIn');
};
