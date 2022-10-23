import type { NextPage } from 'next';

import SandboxBreadCrumb from '@components/sandbox_bread_crumb/SandboxBreadCrumb';

const ChatBot: NextPage = ({}) => {
  return (
    <>
      <SandboxBreadCrumb currentTitle="AIチャットボット" />
    </>
  );
};

export default ChatBot;
