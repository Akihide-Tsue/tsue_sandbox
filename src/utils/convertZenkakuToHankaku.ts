export const convertZenkakuToHankaku = (str: string) => {
  const halfVal = str.replace(/[！-～]/g, function (tmpStr) {
    // 文字コードをシフト
    return String.fromCharCode(tmpStr.charCodeAt(0) - 0xfee0);
  });

  // 文字コードシフトで対応できない文字の変換
  return halfVal.replace(/”/g, '"').replace(/’/g, "'").replace(/‘/g, '`').replace(/￥/g, '\\').replace(/　/g, ' ').replace(/〜/g, '~').replace(/ー/g, '-');
};
