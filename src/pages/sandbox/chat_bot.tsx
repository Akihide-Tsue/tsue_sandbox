import { useState } from 'react';

import type { NextPage } from 'next';

import SandboxBreadCrumb from '@components/sandbox_bread_crumb/SandboxBreadCrumb';
import { useChatApi } from '@hooks/useChatApi';
import styles from 'src/styles/sandbox/chat_bot.module.scss';

const ChatBot: NextPage = ({}) => {
  const { postChatText } = useChatApi();
  const [answers, setAnswers] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [sentTexts, setSentTexts] = useState<string[]>([]);

  const postNewChat = async (chatText: string) => {
    setSentTexts([...sentTexts, chatText]);
    const result = await postChatText(chatText);
    console.log('postChatText', result, result.result.answer);
    setAnswers([...answers, result.result.answer]);
    setText('');
  };

  return (
    <>
      <SandboxBreadCrumb currentTitle="AIチャットBot" />

      <div className={styles.container}>
        <div className={styles.rooms_area}>
          <div className={styles.room}>りんなAPI</div>
          <div className={styles.room}>TBN</div>
          <div className={styles.room}>TBN</div>
        </div>

        <div className={styles.talk_area}>
          <div className={styles.chats_area}>
            {answers.map((answer, index) => {
              return <div key={index}>{answer}</div>;
            })}
            {sentTexts.map((sentText, index) => {
              return <div key={index}>{sentText}</div>;
            })}
          </div>

          <div className={styles.input_area}>
            <input
              type="text"
              className={styles.input}
              autoComplete="off"
              placeholder=""
              value={text}
              onKeyDown={(e) => {
                e.code === 'KeyE' && e.preventDefault();
              }}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <button
              className={styles.submit_button}
              onClick={() => {
                postNewChat(text);
              }}
            ></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
