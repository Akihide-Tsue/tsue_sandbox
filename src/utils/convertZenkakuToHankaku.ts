export const convertZenkakuToHankaku = (str: string) => {
  const halfVal = str.replace(/[！-～]/g, (tmpStr) => {
    // 文字コードをシフト
    return String.fromCharCode(tmpStr.charCodeAt(0) - 0xfee0);
  });

  // 文字コードシフトで対応できない文字の変換
  // eslint-disable-next-line no-irregular-whitespace
  return halfVal.replace(/”/g, '"').replace(/’/g, "'").replace(/‘/g, '`').replace(/￥/g, '\\').replace(/　/g, ' ').replace(/〜/g, '~').replace(/ー/g, '-');
};

export const convertZenkakuToHankakuNumber = (str: string | number) => {
  const halfVal = String(str)
    .replace(',', '')
    .replace(/[！-～]/g, (tmpStr) => {
      // 文字コードをシフト
      return String.fromCharCode(tmpStr.charCodeAt(0) - 0xfee0);
    });

  // 文字コードシフトで対応できない文字の変換
  if (halfVal.split('.').length - 1 < 2) {
    return (
      halfVal
        .replace(/”/g, '"')
        .replace(/’/g, "'")
        .replace(/‘/g, '`')
        .replace(/￥/g, '\\')
        // eslint-disable-next-line no-irregular-whitespace
        .replace(/　/g, ' ')
        .replace(/〜/g, '~')
        .replace(/ー/g, '-')
        .replace(/。/g, '.')
    );
  } else {
    return (
      halfVal
        .replace(/”/g, '"')
        .replace(/’/g, "'")
        .replace(/‘/g, '`')
        .replace(/￥/g, '\\')
        // eslint-disable-next-line no-irregular-whitespace
        .replace(/　/g, ' ')
        .replace(/〜/g, '~')
        .replace(/ー/g, '-')
        .replace(/。/g, '.')
        .replace(/./g, '')
    );
  }
};
