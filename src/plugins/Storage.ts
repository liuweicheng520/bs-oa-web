export class Storage {

  static set(key: string, value: any) {

    window.localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key: string): any | null {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }
}