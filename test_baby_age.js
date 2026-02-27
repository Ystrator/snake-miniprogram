// 测试月龄计算逻辑
function calculateBabyAge(birthday) {
  const birthDate = new Date(birthday);
  const today = new Date();

  let months = (today.getFullYear() - birthDate.getFullYear()) * 12;
  months -= birthDate.getMonth();
  months += today.getMonth();

  const days = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
  const ageMonths = Math.floor(days / 30);
  const ageDays = days % 30;

  return {
    totalDays: days,
    totalMonths: months,
    months: ageMonths,
    days: ageDays,
    text: `${ageMonths}个月${ageDays}天`
  };
}

// 测试用例1: 2025-09-01 (未来日期，当前是2026-02-27)
console.log('测试1: 2025-09-01');
const test1 = calculateBabyAge('2025-09-01');
console.log('结果:', test1);
console.log('预期: 约5个月26天');
console.log('');

// 测试用例2: 2025-01-01 (约1年2个月)
console.log('测试2: 2025-01-01');
const test2 = calculateBabyAge('2025-01-01');
console.log('结果:', test2);
console.log('预期: 约13个月');
console.log('');

// 测试用例3: 2024-02-27 (正好2年)
console.log('测试3: 2024-02-27');
const test3 = calculateBabyAge('2024-02-27');
console.log('结果:', test3);
console.log('预期: 24个月');
