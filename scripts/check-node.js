const major = Number(process.versions.node.split('.')[0]);

if (major !== 20) {
  console.error('\n❌ 当前项目必须使用 Node.js 20 LTS\n');
  console.error(`当前版本: ${process.version}`);
  console.error('\n请切换到 Node 20 后重新执行。\n');

  process.exit(1);
}

console.log(`✅ Node version OK: ${process.version}`);
