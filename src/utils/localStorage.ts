const localStorage = {
  // 设置永久缓存
  set(key: string, val: any) {
    if (typeof val === 'string') {
      window.localStorage.setItem(key, val);
    } else {
      window.localStorage.setItem(key, JSON.stringify(val));
    }
  },
  // 获取永久缓存
  get(key: string) {
    const json = window.localStorage.getItem(key) || '';
    try {
      return JSON.parse(json);
    } catch (error) {
      return json;
    }
  },
  // 移除永久缓存
  remove(key: string) {
    window.localStorage.removeItem(key);
  },
  // 移除全部永久缓存
  clear() {
    window.localStorage.clear();
  },
};

export default localStorage;
