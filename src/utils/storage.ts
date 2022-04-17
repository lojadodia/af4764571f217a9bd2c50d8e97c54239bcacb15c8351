class Storage {
  get = (key: string) => {
    try {
      const item =
        typeof window !== "undefined" && window.localStorage.getItem(key);
      return item ? JSON.parse(item) : item;
    } catch (error) {
      return null;
    }
  };

  set = ({ key, value }: { key: string; value: any }) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  };

  remove = (key: string) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {}
  };

  clear = () => {
    try {
      window.localStorage.clear();
    } catch (error) {}
  };
}

export default new Storage();
