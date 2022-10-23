import * as Sentry from '@sentry/browser';

export function useChatApi() {
  const postChatText = async (chat_text: string) => {
    const result = await fetch(`/api/rinna?word=${chat_text}`)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        Sentry.captureException(error);
        console.error('通信に失敗しました', error);
      });
    return result;
  };

  return {
    postChatText,
  };
}
