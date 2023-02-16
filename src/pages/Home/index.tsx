import { RootState } from '@/store';
import Count from 'components/Count';
import { useAppSelector } from 'hooks/redux';
import style from 'styles/index.module.less';

const HomePage = () => {
  const username = useAppSelector((state: RootState) => state.user.username);
  return (
    <div className={style.container}>
      首页
      <br />
      账号：{username}
      <Count />
    </div>
  );
};
export default HomePage;
