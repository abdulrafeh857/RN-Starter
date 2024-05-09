import RNAsyncStorage from '@react-native-community/async-storage';
import Item from './items';

class AsyncStorage {
  Item = Item;

  async setItem(item, data) {
    let parsedData = JSON.stringify(data);
    await RNAsyncStorage.setItem(item, parsedData);
    console.debug(`Async:\nItem "${item}" set to ${data}`);
  }

  async getItem(item) {
    const data = await RNAsyncStorage.getItem(item);
    return data ? JSON.parse(data) : null;
  }

  async removeItem(item) {
    return await RNAsyncStorage.removeItem(item);
  }
}

let Async = new AsyncStorage();

export default Async;
