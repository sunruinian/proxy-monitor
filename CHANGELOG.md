# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.8.6](http://git.code.oa.com/QQMiniApp/proxy-monitor/compare/v1.8.5...v1.8.6) (2020-04-28)


### Bug Fixes

* 某个小游戏会把Map重写，保留最早的Map ([c119878](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/c1198786192a2878dd1286784c8b42e4d7af0f76))

### [1.8.5](http://git.code.oa.com/QQMiniApp/proxy-monitor/compare/v1.8.4...v1.8.5) (2020-04-28)

### [1.8.4](http://git.code.oa.com/QQMiniApp/proxy-monitor/compare/v1.8.3...v1.8.4) (2020-04-28)


### Bug Fixes

* 自动补充的回调加上success，不然success回调超时检测会有问题 ([b8e4bfc](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/b8e4bfc10ae1b5e5abc0fcecfaf1ceb9c1058226))

### [1.8.3](http://git.code.oa.com/QQMiniApp/proxy-monitor/compare/v1.8.2...v1.8.3) (2020-04-28)


### Bug Fixes

* 代码报错修复 ([091b61e](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/091b61ee4e52724acad8bb8be9e2c03e9b495e7f))

### [1.8.2](http://git.code.oa.com/QQMiniApp/proxy-monitor/compare/v1.8.1...v1.8.2) (2020-04-28)


### Bug Fixes

* 判断回调异步修复及单元测试调整 ([01d18f1](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/01d18f10283a6028ba34879878205b2e276a63d9))

### [1.8.1](http://git.code.oa.com/QQMiniApp/proxy-monitor/compare/v1.8.0...v1.8.1) (2020-04-28)


### Bug Fixes

* 控制apiInfoMap大小引起的代码问题修复及单元测试调整。缩小autoadd范围 ([23df891](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/23df891116437688f179992639e37f41ea9605d0))

## [1.8.0](http://git.code.oa.com/QQMiniApp/proxy-monitor/compare/v1.7.0...v1.8.0) (2020-04-27)


### Features

* 取消end的上报 ([f9505e8](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/f9505e83ea9deb191ca459c69a57531f01770880))
* 取消get上报、set根据传参控制、事件类回调不判断多次 ([b21b14a](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/b21b14a8dac195a6a55473885bdd2cb34f52ecbb))
* 增加shouldReportPropertySet传参 ([81cfef6](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/81cfef6f03edb4f010b72c4cfe896a704a09b9f4))

## [1.7.0](http://git.code.oa.com/QQMiniApp/proxy-monitor/compare/v1.6.0...v1.7.0) (2020-04-27)


### Features

* apiMap存储元素过多，删掉之前的 ([a2b0930](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/a2b0930b453c63b6c684cbee51be07341a02fb40))
* 添加apiName前缀 ([a21e288](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/a21e288c9ed16295be9a58e05c8bb0f8c5a90929))
* 结果增加isProxied表示是否能被代理 ([ae84512](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/ae845127e5a2c19d9abdea38ea5cb3ac1dd7082a))

## [1.6.0](http://git.code.oa.com/QQMiniApp/proxy-monitor/compare/v1.5.1...v1.6.0) (2020-04-26)


### Features

* 上报数据监听错误的改为onError ([08b0ded](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/08b0dedb54a58bb9984f6e7f6251c4595d255b51))

### [1.5.1](http://git.code.oa.com/QQMiniApp/proxy-monitor/compare/v1.5.0...v1.5.1) (2020-04-26)


### Bug Fixes

* 编译最新代码 ([1ffc508](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/1ffc508c4bf41e950e2a4edbe8bb24fcaa920367))

## [1.5.0](http://git.code.oa.com/QQMiniApp/proxy-monitor/compare/v1.4.1...v1.5.0) (2020-04-26)


### Features

* 回调fail，onError的情况ret设为fail ([7d3e718](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/7d3e71813421dd9fbf021cd97e43e21c438a4130))

### [1.4.1](http://git.code.oa.com/QQMiniApp/proxy-monitor/compare/v1.4.0...v1.4.1) (2020-04-26)


### Bug Fixes

* api异常ret修复 ([93da031](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/93da031b6e523ce4e5158822b675c911b0969c46))

## [1.4.0](http://git.code.oa.com/QQMiniApp/proxy-monitor/compare/v1.3.1...v1.4.0) (2020-04-24)


### Features

* 增加回调超时、重复判断。上报字段增加ret ([3bbc243](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/3bbc2432490bd210e483831b31581ee86a84e752))


### Bug Fixes

* 上报数据带上isAsync ([ac642b7](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/ac642b735217405f0235790b3c7d147dff1d9171))
* 回调超时相关问题修复 ([09ab86e](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/09ab86e1cb245396b28d1929002c3ff46018aec7))
* 更正main指向 ([6f32f97](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/6f32f97bddd0173523518be256684c7fad75da68))

### [1.3.2](http://git.code.oa.com/QQMiniApp/proxy-monitor/compare/v1.3.1...v1.3.2) (2020-04-23)

### [1.3.1](http://git.code.oa.com/QQMiniApp/proxy-monitor/compare/v1.3.0...v1.3.1) (2020-04-23)

## [1.3.0](http://git.code.oa.com/QQMiniApp/proxy-monitor/compare/v1.2.1...v1.3.0) (2020-04-23)


### Features

* 上报数据追加property ([fbfff09](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/fbfff09f53134152e75290e520475bd334cd7c00))
* 结合接口的demo ([4afc25e](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/4afc25e8015f42e9db3f67f6821823339a846040))


### Bug Fixes

* hook console.error前判断是否能被修改 for ide真机调试 ([873416d](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/873416dfd9a3fca2f5111a7cb56a87d17a6964ca))
* hook function绑定作用域及参数处理判断 ([2784374](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/278437490b85bc034fa033dc4da92cf39bf2983f))
* 修复api的回调会被多次代理的问题 ([8c62135](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/8c62135754160dcdd30f2705a7bdf281c9c245ad))
* 兼容性判断Proxy ([3c6f1b3](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/3c6f1b3740b92d593525cb31370170652cd60754))
* 判断是object且非空才能被代理 ([9b9d4db](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/9b9d4db89742c39a1cb519ac716c737548f25712))
* 在new Proxy前做检查 ([8a4ab22](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/8a4ab22d085ab8685f30af00ff8ad5c47e3d2374))
* 增加类型定义 ([7539900](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/7539900601d6d2065f8c450e6d6656e4279a6eb2))
* 有些对象魔改属性/方法不直接挂靠对象上，这里改为只判断symbol ([e6a8578](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/e6a8578056945f64371edaceaee2229bf90ff7f1))

### 1.2.1 (2020-01-13)


### ⚠ BREAKING CHANGES

* test break change

### Features

* api加上tag，调用频繁时候方便查看 ([c980884](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/c98088442615e5ff2fa218b4161295935ed1c599))
* api打tag点号改冒号 ([d7a91b3](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/d7a91b3f144f7ea05fcb2a2fdc8cb62ab37c5f06))
* test a normal feat commit ([8f69350](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/8f6935034b5d7e1f2baa0a6a3ba0406bba45054d))
* ts重构及测试案例 ([844154e](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/844154eb219989b532e399c7a8eb65be0ee03953))
* 代码执行监听 ([0170abe](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/0170abe63d8b969378e859ccd66dcd924af7a024))
* 修改后的编译代码 ([f9ebcf5](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/f9ebcf53c17154709c4b212c87bcc8e6a8a11aaa))
* 冗余npm删除 ([b64ea34](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/b64ea345dae9fc11087af55148a0bd0553aed0ef))
* 去掉不小心加上的代码 ([a091d83](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/a091d83ca92a7f41d266f8fe6504d67429057192))
* 参数代理加上非空判断 ([8d94b8a](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/8d94b8a19851d93984106e1a9390102624b02591))
* 增加commit message检验 ([a8385d0](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/a8385d05e92b92763b7fb02c98e992479e7e0240))
* 增加commit检验规则。继承angular ([20e3a45](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/20e3a451ab46dca730d23c8295d3ced364734efe))
* 换husky做precommit检查 ([ca36c0e](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/ca36c0ea4efb2fe9186b4128d29fe04eb2e8f60d))
* 每次commit，vscode进度条一直存在，去掉precommit试试 ([064539e](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/064539ee8511977e91c913e358b730aaa19651b0))
* 清空changelog删除tag重新release次 ([606cf52](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/606cf52f68d9e98863fb2bfe7cf9241476b0462b))
* 用typescript重构 ([ce7b497](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/ce7b497083cd640819f265a3fb0271d56ed91862))
* 监听console.error，换webpack编译以获得全局变量在小程序基础库中使用 ([02cdded](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/02cddeddce68db605d1a6c303db0b5e074f32659))
* 自动添加回调函数 ([e63d2b7](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/e63d2b78ca4a907a73435e1ca49db4440120f8de))
* 错误统计上报 ([506446e](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/506446ee0f53564018580bc721cf68c6771e0408))
* 项目配置 ([6ef3a42](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/6ef3a42a2a77cab351b2485c4314e22cddb254f8))
* 验证pre-commit和eslint效果 ([9d85984](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/9d859840d8218c8ef28f3bf73c3a2f5757a09281))


### Bug Fixes

* release后push标签 ([7c51965](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/7c51965a8d63daf75ca2efae53c48a2d0552bde4))
* test a normal fix commit ([8760a26](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/8760a26bb38ecc99bd5c2bd2d405441aeab8b29d))


* test break change ([d14d386](http://git.code.oa.com/QQMiniApp/proxy-monitor/commit/d14d3862d4ed9318a1a1517cd3ee9f30977556c9))

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
