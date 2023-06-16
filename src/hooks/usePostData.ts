import * as Sentry from '@sentry/browser';

export const usePostData = () => {
  const getPost = async (post_id: number) => {
    const url = `/api/posts?id=${post_id}`;

    const result = await fetch(url, {
      method: 'GET',
      mode: 'cors',
    })
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
    getPost,
  };
};
