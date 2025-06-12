export function getKoreanJosa(word: string, josaPair: string): string {
  const [josaWithBatchim, josaWithoutBatchim] = josaPair.split('/');

  if (typeof word !== 'string' || word.length === 0) {
    return josaWithoutBatchim;
  }

  const lastChar = word[word.length - 1];

  if (lastChar === 'ㄹ') {
    if (josaPair === '으로/로') return josaWithoutBatchim;
  }

  const lastCharCode = lastChar.charCodeAt(0);

  if (lastCharCode < 0xac00 || lastCharCode > 0xd7a3) {
    return josaWithoutBatchim; // 한글이 아니면 받침 없는 조사 반환
  }

  const jongseongIndex = (lastCharCode - 0xac00) % 28;

  return jongseongIndex > 0 ? josaWithBatchim : josaWithoutBatchim;
}
