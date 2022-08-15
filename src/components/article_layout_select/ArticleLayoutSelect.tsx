import { Dispatch, FC, SetStateAction } from 'react';

import CardIcon from 'public/images/icons/card_icon.svg';
import ListIcon from 'public/images/icons/list_icon.svg';

import styles from './ArticleLayoutSelect.module.scss';

type Props = {
  layout: 'card' | 'list';
  setLayout: Dispatch<SetStateAction<'card' | 'list'>>;
};

const ArticleLayoutSelect: FC<Props> = ({ layout, setLayout }) => {
  const activeColor = '#2e282a';
  const inActiveColor = '#ccc';

  return (
    <div className={styles.layout_selector}>
      <span className={styles.layout_selector_text}>表示</span>
      <button className={styles.layout_selector_button} onClick={() => setLayout('card')}>
        <CardIcon width={20} height={20} fill={layout === 'card' ? activeColor : inActiveColor} />
      </button>
      <button className={styles.layout_selector_button} onClick={() => setLayout('list')}>
        <ListIcon width={20} height={20} fill={layout === 'list' ? activeColor : inActiveColor} />
      </button>
    </div>
  );
};

export default ArticleLayoutSelect;
