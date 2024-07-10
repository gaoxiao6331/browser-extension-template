const path = require("path");
const fs = require("fs");

/**
 * conditional compilation: 
 * 
 * #IFDEF/#ENDIF preprocessor directives implement like C/C++, but only can be used to process.env.PLATFORM
 * 
 * before compilation
 * const a = () => {
 *     #IFDEF A
 *     console.log('this is A')
 *     #ENDIF
 * }
 * 
 * after compilation（if you set process.env.PLATFORM = 'A'）
 * const a = () => {
 *     console.log('this is A')
 * }
 * 
 * after compilation（if do not set process.env.PLATFORM = 'A'）
 * const a = () => {
 * }
 * 
 * 条件编译: `process.env.PLATFORM`的深层次嵌套
 * #IFDEF #ENDIF: `C/C++`预处理指令 平台层面扩展性
 * 例子：
 * 
 * 编译前
 * const a = () => {
 *     #IFDEF A
 *     console.log('this is A')
 *     #ENDIF
 * }
 * 
 * 编译后（如果设置了process.env.PLATFORM = 'A'）
 * const a = () => {
 *     console.log('this is A')
 * }
 * 
 * 编译后（如果没有设置process.env.PLATFORM = 'A'）
 * const a = () => {
 * }
 * 
 *  */

function IfDefineLoader(source) {
  // 设置loader的配置 | set the loader's config
  /** @type {boolean} */
  const debug = this.query.debug || false;
  /** @type {(string|RegExp)[]} */
  const include = this.query.include || [path.resolve("src")];
  /** @type {(string|RegExp)[]} */
  const exclude = this.query.exclude || [/node_modules/];
  /** @type {string} */
  const envKey = this.query.platform || "PLATFORM";

  // 检查是否应该被处理 | check whether this file should be processed
  let hit = false;
  const resourcePath = this.resourcePath;
  for (const includeConfig of include) {
    const verified =
      includeConfig instanceof RegExp
        ? includeConfig.test(resourcePath)
        : resourcePath.startsWith(includeConfig);
    if (verified) {
      hit = true;
      break;
    }
  }
  for (const excludeConfig of exclude) {
    const verified =
      excludeConfig instanceof RegExp
        ? excludeConfig.test(resourcePath)
        : resourcePath.startsWith(excludeConfig);
    if (verified) {
      hit = false;
      break;
    }
  }
  if (debug && hit) {
    console.log("if-def-loader hit path", resourcePath);
  }
  if (!hit) return source;

  // 迭代时控制该行是否命中预处理条件 | variables identifying whether hit
  const platform = (process.env[envKey] || "").toLowerCase();
  let terser = false;
  let revised = false;
  let terserIndex = -1;
  /** @type {number[]} */
  const stack = [];
  const lines = source.split("\n");
  const target = lines.map((line, index) => {
    // 去掉首尾的空白 去掉行首注释符号与空白符 | remove white space
    const code = line.trim().replace(/^\/\/\s*/, "");
    // 检查预处理指令起始 `#IFDEF`只会置`true` | check `#IFDEF`
    if (/^#IFDEF/.test(code)) {
      stack.push(index);
      // 如果是`true`继续即可 | continue if is `#IFDEF`
      if (terser) return "";
      const match = code.replace("#IFDEF", "").trim();
      const group = match.split("|").map(item => item.trim().toLowerCase());
      if (group.indexOf(platform) === -1) {
        terser = true;
        revised = true;
        terserIndex = index;
      }
      return "";
    }
    // 检查预处理指令结束 `#IFDEF`只会置`false` | check `#ENDIF`
    if (/^#ENDIF$/.test(code)) {
      const index = stack.pop();
      // 额外的`#ENDIF`忽略 | ignore extra `#ENDIF`
      if (index === undefined) return "";
      if (index === terserIndex) {
        terser = false;
        terserIndex = -1;
      }
      return "";
    }
    // 如果命中预处理条件则擦除 | remove this line if hits the directives
    if (terser) return "";
    return line;
  });

  // remove consecutive blank lines
  const res = [target[0]]
  let prevLine = target[0].trim() === '' ? 0 : Number.MIN_SAFE_INTEGER
  for(let i = 1; i < target.length; i++){
    const cur = target[i]
    if(cur.trim() === '') {
      _prevLine = prevLine
      prevLine = i
      if (_prevLine === i - 1) {
        continue
      }
    }
    res.push(cur)
  }

  const resText = res.join('\n')

  // 测试文件复写 | write log file if debug option is `true`
  if (debug && revised) {
    // rm -rf ./**/*.log
    console.log("if-def-loader revise path", resourcePath);
    fs.writeFile(resourcePath + ".log",resText, () => null);
  }

  return resText;
}

module.exports = IfDefineLoader;
