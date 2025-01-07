import AsyncStorage from '@react-native-async-storage/async-storage';
import Item from './items';

class AsyncStorage {
  Item = Item;

  async setItem(item, data) {
    let parsedData = JSON.stringify(data);
    await AsyncStorage.setItem(item, parsedData);
    console.debug(`Async:\nItem "${item}" set to ${data}`);
  }

  async getItem(item) {
    const data = await AsyncStorage.getItem(item);
    return data ? JSON.parse(data) : null;
  }

  async removeItem(item) {
    return await AsyncStorage.removeItem(item);
  }
}

let Async = new AsyncStorage();

export default Async;
