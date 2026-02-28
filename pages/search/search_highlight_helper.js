// 高亮关键词辅助函数
function highlightKeyword(text, keyword) {
  if (!text || !keyword) return text;
  const regex = new RegExp(`(${keyword})`, 'gi');
  return text.replace(regex, '<text class="highlight">$1</text>');
}
module.exports = { highlightKeyword };
