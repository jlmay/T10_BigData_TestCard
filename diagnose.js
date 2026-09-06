/**
 * dcrf32 发卡环境诊断工具（命令行，无需浏览器）
 * 用法: node diagnose.js
 * 作用: 依次检测 服务在线 → 可用设备号 → 设备版本 → 寻卡/RATS/取随机数（只读，不写卡）
 */
const WebSocket = globalThis.WebSocket;
const URL = process.env.DCRF_URL || 'ws://127.0.0.1:50150';
const BAUD = Number(process.env.DCRF_BAUD || 115200);

let ws;
function call(func, args, timeoutMs) {
  return new Promise((resolve) => {
    const msg = JSON.stringify({ func, in: args.map(String) });
    let done = false;
    const t = setTimeout(() => { if (!done) { done = true; resolve({ timeout: true }); } }, timeoutMs);
    const onMsg = (evt) => {
      if (done) return; done = true; clearTimeout(t);
      ws.removeEventListener('message', onMsg);
      let o = null; try { o = JSON.parse(evt.data); } catch (e) {}
      resolve({ obj: o });
    };
    ws.addEventListener('message', onMsg);
    ws.send(msg);
  });
}
const cleanHex = (s) => String(s || '').replace(/\s/g, '').toUpperCase();
const ok = (r) => r && r.obj && r.obj.result !== null && Number(r.obj.result) >= 0;

(async () => {
  console.log('服务地址: ' + URL + '   波特率: ' + BAUD + '\n');

  try {
    ws = new WebSocket(URL);
  } catch (e) { console.log('✘ 无法创建 WebSocket: ' + e.message); process.exit(1); }
  await new Promise((res) => {
    const to = setTimeout(() => { console.log('✘ 连接超时，服务未启动或端口不对'); process.exit(1); }, 5000);
    ws.addEventListener('open', () => { clearTimeout(to); res(); });
    ws.addEventListener('error', () => { clearTimeout(to); console.log('✘ 连接失败，请启动 dcrf32servicetest.exe'); process.exit(1); });
  });
  console.log('✔ 服务已连接\n');

  console.log('--- 扫描可用设备号 (0~32, 100) ---');
  const found = [];
  for (let p = 0; p <= 32; p++) {
    const r = await call('dc_init', [p, BAUD], 6000);
    if (ok(r)) { found.push(p); console.log('  ✔ 设备号 ' + p + '  (icdev=' + r.obj.result + ')'); await call('dc_exit', [r.obj.result], 3000); }
  }
  const r100 = await call('dc_init', [100, BAUD], 6000);
  if (ok(r100)) { found.push(100); console.log('  ✔ 设备号 100  (icdev=' + r100.obj.result + ')'); await call('dc_exit', [r100.obj.result], 3000); }

  if (!found.length) { console.log('\n✘ 未找到任何可用设备。检查：读卡器是否插好 / 驱动 / 波特率'); ws.close(); process.exit(1); }

  const PORT = found[0];
  console.log('\n--- 打开设备号 ' + PORT + ' ---');
  const r = await call('dc_init', [PORT, BAUD], 8000);
  const hdl = r.obj.result;
  console.log('  icdev = ' + hdl);
  const v = await call('dc_getver', [hdl], 4000);
  console.log('  版本号 = ' + (v.obj.out ? v.obj.out[0] : '-'));

  console.log('\n--- 卡通道只读测试 ---');
  console.log('  dc_config_card(A)  => ' + (await call('dc_config_card', [hdl, 65], 5000)).obj.result);
  const c = await call('dc_card_n', [hdl, 0], 5000);
  if (!ok(c)) { console.log('  ✘ 未检测到卡片 (result=' + c.obj.result + ')，请放卡后重试'); await call('dc_exit', [hdl], 3000); ws.close(); process.exit(0); }
  console.log('  卡号 = ' + c.obj.out[1]);
  const rst = await call('dc_pro_resetInt', [hdl], 5000);
  console.log('  RATS/ATS = ' + (rst.obj.out ? rst.obj.out[1] : '-'));

  const CMD = '0084000008';
  const a = await call('dc_pro_commandlinkInt', [hdl, CMD.length / 2, CMD, 10], 8000);   // slen = 字节数
  const resp = cleanHex(a.obj.out ? a.obj.out[1] : '');
  console.log('  取随机数(' + CMD + ', slen=' + CMD.length / 2 + ') = ' + resp + (resp.endsWith('9000') ? '  ✔' : '  ✘'));

  console.log('\n结论: 设备号应填 ' + PORT + '，slen 传字节数。');
  await call('dc_exit', [hdl], 3000);
  ws.close();
  process.exit(0);
})();
