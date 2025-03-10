import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LocalStorage {
  static async get(key: string): Promise<string | null> {
    return await AsyncStorage.getItem(key);
  }

  static async set(key: string, data: any) {
    await AsyncStorage.setItem(key, data);
  }

  static async remove(key: string) {
    await AsyncStorage.removeItem(key);
  }
}

export const USER_KEY = 'USER';
export const TODOS_KEY = 'TODOS';
