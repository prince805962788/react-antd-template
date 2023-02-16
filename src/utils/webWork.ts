let count = 0;
function setCount(e: any) {
  const { type } = e.data;
  switch (type) {
    case 'add':
      count++;
      self.postMessage(count);
      break;
  }
}
self.onmessage = (e) => setCount(e);

export default self;
