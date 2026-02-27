// 微信小程序自动上传脚本 - 版本1.2.0
const ci = require('miniprogram-ci');

// 配置信息
const projectConfig = {
  appid: 'wxfc31dae6f08898f3',
  type: 'miniProgram',
  projectPath: '/tmp/parenting-miniprogram',
  privateKeyPath: '/tmp/parenting-miniprogram/private.wxfc31dae6f08898f3.key',
  ignores: ['node_modules/*']
};

// 上传配置
const uploadConfig = {
  version: '1.2.0',
  desc: 'v1.2.0 - 宝宝档案与搜索优化。新增宝宝档案功能（设置生日、计算月龄、智能推荐），优化搜索体验（相关度排序、摘要显示、相关推荐）。27篇专业育儿文章，覆盖0-6岁全阶段。iOS设计风格，简洁易用。'
};

async function upload() {
  console.log('==================================');
  console.log('  育儿知识大全 - 版本1.2.0上传');
  console.log('==================================\n');

  console.log('📦 项目信息：');
  console.log(`  AppID: ${projectConfig.appid}`);
  console.log(`  版本: ${uploadConfig.version}`);
  console.log(`  路径: ${projectConfig.projectPath}\n`);

  console.log('🚀 开始上传到微信平台...\n');

  try {
    const project = new ci.Project(projectConfig);

    const uploadResult = await ci.upload({
      project,
      version: uploadConfig.version,
      desc: uploadConfig.desc,
      setting: {
        es6: true,
        es7: true,
        minify: true,
        codeProtect: false
      },
      onProgressUpdate: (res) => {
        console.log(`上传进度: ${res.message}`);
      }
    });

    console.log('\n==================================');
    console.log('✅ 上传成功！');
    console.log('==================================\n');

    console.log('📋 下一步操作：\n');
    console.log('1️⃣  登录微信公众平台');
    console.log('   https://mp.weixin.qq.com\n');
    console.log('2️⃣  进入「版本管理」→「开发版本」\n');
    console.log('3️⃣  找到版本 1.2.0 并点击「提交审核」\n');
    console.log('4️⃣  填写审核信息：');
    console.log('   - 功能页面：首页、分类页、文章页、搜索页、收藏页、宝宝档案');
    console.log('   - 服务类目：教育 > 母婴育儿');
    console.log('   - 标签：育儿、母婴、知识、教育、健康\n');
    console.log('5️⃣  提交审核（通常 1-7 个工作日）\n');
    console.log('6️⃣  审核通过后点击「发布」\n');
    console.log('🎉 版本1.2.0发布完成！\n');
    console.log('新增功能:');
    console.log('  ✨ 宝宝档案：记录宝宝信息，精确计算月龄');
    console.log('  🧠 智能推荐：根据月龄自动推荐相关文章');
    console.log('  🔍 搜索优化：相关度排序、摘要显示、相关推荐\n');

  } catch (error) {
    console.error('\n❌ 上传失败：', error.message);
    console.error('\n可能的原因：');
    console.error('1. 私钥文件不存在或路径错误');
    console.error('2. 网络连接问题');
    console.error('3. 微信服务器暂时不可用');
    console.error('4. 项目文件有语法错误');
    console.error('\n请检查后重试。\n');
    process.exit(1);
  }
}

upload();
