import { Fragment, useState } from 'react';
const worker = new Worker(new URL('../../utils/webWork?worker', import.meta.url), {
  type: 'module',
});
const Count = () => {
  const [count, setCount] = useState<number>(0);
  worker.onmessage = (e) => {
    const { data } = e;
    typeof data === 'number' && setCount(data);
  };
  const add = () => {
    worker.postMessage({ type: 'add' });
  };
  return (
    <Fragment>
      <button onClick={add}>{count}</button>
    </Fragment>
  );
};
export default Count;
