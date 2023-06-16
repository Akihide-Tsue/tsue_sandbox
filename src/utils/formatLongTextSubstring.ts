import { removeNewLines } from '@utils/removeNewLines';

//説明文のフォーマット処理
export const formatLongTextSubstring = (body: string, maxLength: number) => {
  //改行削除して文字制限
  if (body) {
    let result = removeNewLines(body).substring(0, maxLength);

    //最後の文字が\の場合は削除
    if (result.slice(-1) === '\\') {
      result = result.slice(0, -1);
    }

    //文字切り出した場合は...追加
    if (result.length < body.length) {
      result += '...';
    }

    return result;
  }

  return '';
};
