import { openDB } from 'idb';

const DBTABLE = "test";
const DBNAME = 'test-store'

const dbPromise = openDB(DBNAME, 8, {
  upgrade(db, oldVersion, newVersion, transaction) {
    if (oldVersion !== newVersion && oldVersion !== 0) {
      console.log("UPGRADE VERSION")
      // Clean DB when version change
      db.deleteObjectStore(DBTABLE)
      db.createObjectStore(DBTABLE);
    } else {
      db.createObjectStore(DBTABLE);
    }
  },
  blocked() {
    console.log("BLOCKED")
  },
  blocking() {
    console.log("BLOCKING")
  },
  terminated() {
    console.log("TERMINATED")
  },
});

const get = async function (key) {
  return (await dbPromise).get(DBTABLE, key);
};
const set = async function (key, val) {
  return (await dbPromise).put(DBTABLE, val, key);
};
const del = async function (key) {
  return (await dbPromise).delete(DBTABLE, key);
};
const clear = async function () {
  return (await dbPromise).clear(DBTABLE);
};
const keys = async function () {
  return (await dbPromise).getAllKeys(DBTABLE);
};

export const localDB = {
  get,
  set,
  del,
  clear,
  keys
}