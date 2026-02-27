// 微信小程序自动上传脚本
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
  version: '1.1.0',
  desc: 'v1.1.0 - 新增夜间模式、紧急情况指南、30秒快速解答。专业育儿知识平台，涵盖0-6岁儿童发育、营养、健康、教育等全方位知识。iOS设计风格，简洁易用。'
};

async function upload() {
  console.log('==================================');
  console.log('  育儿知识大全 - 自动化上传');
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
    console.log('3️⃣  找到版本 ' + uploadConfig.version + ' 并点击「提交审核」\n');
    console.log('4️⃣  填写审核信息：');
    console.log('   - 功能页面：首页、分类页、文章页、搜索页、收藏页');
    console.log('   - 服务类目：教育 > 母婴育儿');
    console.log('   - 标签：育儿、母婴、知识、教育\n');
    console.log('5️⃣  提交审核（通常 1-7 个工作日）\n');
    console.log('6️⃣  审核通过后点击「发布」\n');
    console.log('🎉 恭喜！小程序即将上线！\n');

  } catch (error) {
    console.error('\n❌ 上传失败：', error.message);
    console.error('\n可能的原因：');
    console.error('1. 私钥文件不存在或路径错误');
    console.error('2. 网络连接问题');
    console.error('3. 微信服务器暂时不可用');
    console.error('\n请检查后重试。\n');
    process.exit(1);
  }
}

upload();
