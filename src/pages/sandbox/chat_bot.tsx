import { useState } from 'react';

import type { NextPage } from 'next';

import SandboxBreadCrumb from '@components/sandbox_bread_crumb/SandboxBreadCrumb';
import { useChatApi } from '@hooks/useChatApi';
import styles from 'src/styles/sandbox/chat_bot.module.scss';

const ChatBot: NextPage = ({}) => {
  const { postChatText } = useChatApi();
  const [answer, setAnswer] = useState('');

  const postNewChat = async (chatText: string) => {
    const result = await postChatText(chatText);
    console.log('postChatText', result);
    setAnswer(result?.answer as string);
  };

  return (
    <>
      <SandboxBreadCrumb currentTitle="りんなAPI" />

      <div className={styles.container}>
        <button
          className={styles.button}
          onClick={() => {
            postNewChat('かわいい');
          }}
        >
          かわいい
        </button>
        {answer}
      </div>
    </>
  );
};

export default ChatBot;
