import AsyncStorage from "@callstack/async-storage";

const deviceStorage = {
  async setItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(`LocalStorage set Error: ${error.message}`);
    }
  },
  async getItem(key) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.log(`LocalStorage get Error: ${error.message}`);
    }
    return null;
  },
  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(`LocalStorage clear Error: ${error.message}`);
    }
  },
};

export default deviceStorage;
