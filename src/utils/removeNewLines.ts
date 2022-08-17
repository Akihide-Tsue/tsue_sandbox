//2行以上の連続の改行を削除する

export const removeNewLines = (value: string) => {
  return value.replace(/(\r\n){3,}|\r{3,}|\n{3,}/, '\n\n');
};
