# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [4.5.25](https://github.com/andthexi/valleyed/compare/v4.5.24...v4.5.25) (2026-11-12)

### [4.5.24](https://github.com/andthexi/valleyed/compare/v4.5.23...v4.5.24) (2026-11-11)

### Bug Fixes

- **release:** update repository url after github rename ([13777c0](https://github.com/andthexi/valleyed/commit/13777c0de9b38649237c0f3415ae7e8a60b921b6))

### [4.5.23](https://github.com/kevinand11/valleyed/compare/v4.5.22...v4.5.23) (2026-06-30)

### Bug Fixes

- try json parse for fromJSON if input is string ([5c2b64d](https://github.com/kevinand11/valleyed/commit/5c2b64d0e252f10b2d6b1f5af21fecc90ed8dd6c))

### [4.5.22](https://github.com/kevinand11/valleyed/compare/v4.5.21...v4.5.22) (2026-06-10)

### Bug Fixes

- add const for .in as well ([2983f6e](https://github.com/kevinand11/valleyed/commit/2983f6e98ce2a631e43343ca7d212496bddeb860))

### [4.5.21](https://github.com/kevinand11/valleyed/compare/v4.5.20...v4.5.21) (2026-06-10)

### Bug Fixes

- const T for v.eq and v.is, and export isType ([06bb03f](https://github.com/kevinand11/valleyed/commit/06bb03f78329fbd64d024754265f1a1af64dc4d1))

### [4.5.20](https://github.com/kevinand11/valleyed/compare/v4.5.19...v4.5.20) (2026-05-15)

### Bug Fixes

- schema for optionals ([5f64648](https://github.com/kevinand11/valleyed/commit/5f646483d82d4835e8d218eb54f2d840b1427f6a))

### [4.5.19](https://github.com/kevinand11/valleyed/compare/v4.5.18...v4.5.19) (2026-03-02)

### Bug Fixes

- pipe.pipe returns first pipe instead of new pipe ([43ab3f9](https://github.com/kevinand11/valleyed/commit/43ab3f9f907e5e54fe4acb800d4b3394b0e8c6e4))

### [4.5.18](https://github.com/kevinand11/valleyed/compare/v4.5.17...v4.5.18) (2026-01-18)

### Features

- add BSONValueOf ([6b658d7](https://github.com/kevinand11/valleyed/commit/6b658d7e503b5e3bed8ecc5b5f04592dcd545177))
- jsonRedacted pipe ([ee3051e](https://github.com/kevinand11/valleyed/commit/ee3051ea5135c8dad628ec067f786c5482fa86b2))

### Bug Fixes

- avoid nesting of JSONRedacted ([21ed5f4](https://github.com/kevinand11/valleyed/commit/21ed5f40369758ea7133a85ad031ba7cf8e4c993))

### [4.5.17](https://github.com/kevinand11/valleyed/compare/v4.5.16...v4.5.17) (2025-08-12)

### Bug Fixes

- fn not defined in v.recursive ([54cc05e](https://github.com/kevinand11/valleyed/commit/54cc05ea9e7b8ba503160a5b890c3859aa32e2af))

### [4.5.16](https://github.com/kevinand11/valleyed/compare/v4.5.15...v4.5.16) (2025-08-09)

### Bug Fixes

- return value of nested recursive ([0ee811d](https://github.com/kevinand11/valleyed/commit/0ee811d0090f8d07cb053172fbf6fe4f96783e85))

### [4.5.15](https://github.com/kevinand11/valleyed/compare/v4.5.14...v4.5.15) (2025-07-07)

### Bug Fixes

- path for PipeError ([9c1a49d](https://github.com/kevinand11/valleyed/commit/9c1a49d12d64f39bf1df49fe34683be1469e31e3))

### [4.5.14](https://github.com/kevinand11/valleyed/compare/v4.5.13...v4.5.14) (2025-07-06)

### Bug Fixes

- correct nested pipes path ([bed1c26](https://github.com/kevinand11/valleyed/commit/bed1c26b1e0ffa755d15f77176c14085c88f383b))

### [4.5.13](https://github.com/kevinand11/valleyed/compare/v4.5.12...v4.5.13) (2025-07-05)

### Bug Fixes

- types of v.lazy ([e3baef0](https://github.com/kevinand11/valleyed/commit/e3baef0b1902f5acc562bc055f1e1e5b6067bb01))

### [4.5.12](https://github.com/kevinand11/valleyed/compare/v4.5.11...v4.5.12) (2025-07-05)

### [4.5.11](https://github.com/kevinand11/valleyed/compare/v4.5.10...v4.5.11) (2025-07-05)

### Features

- formatting compiled lines ([d4173db](https://github.com/kevinand11/valleyed/commit/d4173dbf1c05d5a4fa4ce8759689cc042768b8fb))
- init error handling dynamic ([c14b1a8](https://github.com/kevinand11/valleyed/commit/c14b1a8831e4329f7b9a7c019c43fcf066c283b5))
- lazy impl ([ff8f515](https://github.com/kevinand11/valleyed/commit/ff8f515ce67e2f841db7e30939653050bd4e34b0))
- optionals and arrays compile ([5e72d16](https://github.com/kevinand11/valleyed/commit/5e72d16cc2baf6440dc5bc43a8117f302534b9ec))
- primitive pipes compile ([f9c6b91](https://github.com/kevinand11/valleyed/commit/f9c6b917e8171856198bc7d18f759c9a9016cecf))
- recursive compile ([022b78d](https://github.com/kevinand11/valleyed/commit/022b78d066b7faaa6b8b7fde000d731e599a7534))
- refactor pipes with branches ([be10784](https://github.com/kevinand11/valleyed/commit/be107848b15a101237bb875f03b89d5f2cc8964a))
- v recursive ([63ab9d0](https://github.com/kevinand11/valleyed/commit/63ab9d0d3e0ff2fb1df384a704dd195757de94fb))

### Bug Fixes

- fixing with tests ([d99a628](https://github.com/kevinand11/valleyed/commit/d99a62839e76216a16de2f9efe9200267358ce73))
- for array only create validator fn once ([e350cb6](https://github.com/kevinand11/valleyed/commit/e350cb6094baf1168f3a22b932c570328866d811))
- for array only create validator fn once ([5ff78d9](https://github.com/kevinand11/valleyed/commit/5ff78d949943f8e7762b8ac7990cb63fa3885a04))
- make failEarly default ([67c01cd](https://github.com/kevinand11/valleyed/commit/67c01cd47a795bca1aa8d1ebd36d63336629b01a))
- run or in while loop instead of fn ([8fb9f77](https://github.com/kevinand11/valleyed/commit/8fb9f77e2a23737ab7833a300ec9555ac637c0e9))
- stray throws ([8536b16](https://github.com/kevinand11/valleyed/commit/8536b16bbeb9858fafd2e71060da5f208927b6cc))
- v.lazy catches error properly ([c31a5f1](https://github.com/kevinand11/valleyed/commit/c31a5f188319382daf9f6b59d55593dde359c18e))

### [4.5.10](https://github.com/kevinand11/valleyed/compare/v4.5.9...v4.5.10) (2025-06-28)

### Features

- v lazy ([6cbf1a1](https://github.com/kevinand11/valleyed/commit/6cbf1a1834d4400d599b55043b37d9781b792b37))

### [4.5.9](https://github.com/kevinand11/valleyed/compare/v4.5.8...v4.5.9) (2025-06-27)

### Features

- do not bundle ([bbeff07](https://github.com/kevinand11/valleyed/commit/bbeff07ed071ef316db0172557c7ff59d1336cbe))

### [4.5.8](https://github.com/kevinand11/valleyed/compare/v4.5.7...v4.5.8) (2025-06-26)

### [4.5.7](https://github.com/kevinand11/valleyed/compare/v4.5.6...v4.5.7) (2025-06-26)

### Features

- build for cjs,esm and minified of each ([7c16e8c](https://github.com/kevinand11/valleyed/commit/7c16e8ceef640b9536779abeefcf7536796b486a))

### Bug Fixes

- all api is exported under v ([89c1aaa](https://github.com/kevinand11/valleyed/commit/89c1aaae7d7462341312d76b434a9d76f9a3007d))

### [4.5.6](https://github.com/kevinand11/valleyed/compare/v4.5.5...v4.5.6) (2025-06-24)

### Bug Fixes

- typings ([b875b1a](https://github.com/kevinand11/valleyed/commit/b875b1a7872df822c7e1e4105101432358242675))

### [4.5.5](https://github.com/kevinand11/valleyed/compare/v4.5.4...v4.5.5) (2025-06-24)

### Features

- update docs ([6339332](https://github.com/kevinand11/valleyed/commit/63393320051354ae111e1f6692a68c66cbe75894))

### [4.5.4](https://github.com/kevinand11/valleyed/compare/v4.5.3...v4.5.4) (2025-06-24)

### Features

- add pipe deps into context ([88f5463](https://github.com/kevinand11/valleyed/commit/88f5463a80b9f6bb94bceaa6d3533f9a17d9ec9b))
- meta api ([9e260e5](https://github.com/kevinand11/valleyed/commit/9e260e52966b198d1393b9202ff5ac9f9a539995))
- store both next and last for performance ([87ebb6b](https://github.com/kevinand11/valleyed/commit/87ebb6b1e103865c249e727964d596448e84d2f3))
- use new apis assert, validate, context and schema ([2bd63ce](https://github.com/kevinand11/valleyed/commit/2bd63ce0d7aa3e62483299634e99790bc63ab9bc))

### Bug Fixes

- use linked list instead of reversed ([7e3fc25](https://github.com/kevinand11/valleyed/commit/7e3fc25afc0fd6facfe151265756a735a6dc78ac))

### [4.5.3](https://github.com/kevinand11/valleyed/compare/v4.5.2...v4.5.3) (2025-06-24)

### [4.5.2](https://github.com/kevinand11/valleyed/compare/v4.5.1...v4.5.2) (2025-06-24)

### Bug Fixes

- differ merge doesnt treat null right ([49e7838](https://github.com/kevinand11/valleyed/commit/49e783830ab8640be2bc546730620cbcff7d9870))

### [4.5.1](https://github.com/kevinand11/valleyed/compare/v4.5.0...v4.5.1) (2025-06-23)

### Bug Fixes

- remove objectExtends for merge ([24ad59f](https://github.com/kevinand11/valleyed/commit/24ad59fb5aed17b99db75577d48d49f1a70b160b))

## [4.5.0](https://github.com/kevinand11/valleyed/compare/v4.4.10...v4.5.0) (2025-06-23)

### Features

- accept multiple pipes in .pipe ([7a6ebb2](https://github.com/kevinand11/valleyed/commit/7a6ebb2987449df7092eee26e5293cd3fe71e460))
- add __update function to allow update after init ([88a2f93](https://github.com/kevinand11/valleyed/commit/88a2f93c5d0403f443678db7ac3e4b17d7588013))
- add id for json schema ([7499fe5](https://github.com/kevinand11/valleyed/commit/7499fe5fa6305c1c6dcbd679863ae7ff1a6f30b2))
- allow value functions for all validators that expect a value input ([99276e7](https://github.com/kevinand11/valleyed/commit/99276e79bec45af2ea089474eafe85c01b78279c))
- better PipeError ([96817b6](https://github.com/kevinand11/valleyed/commit/96817b6c96454cbe8ea3b29ce63ad07b46b67cd3))
- bubble up config ([b24b8ee](https://github.com/kevinand11/valleyed/commit/b24b8eeb7161a3b9c26c41d2dc4be0ff0d284f6e))
- coerce and function ([dcd4dc7](https://github.com/kevinand11/valleyed/commit/dcd4dc7a4009ac6e41fdcd8da258d86644c50555))
- context ([d206e80](https://github.com/kevinand11/valleyed/commit/d206e80d43c5ddcc32504155c8e08cce32c12a92))
- defaultOnFail sanitizer ([70cbb85](https://github.com/kevinand11/valleyed/commit/70cbb85e26b3f5b39169a43e78586897c1d067f4))
- files and records pipe apis ([e9cca15](https://github.com/kevinand11/valleyed/commit/e9cca156067ec430b9a805a8b7bf5322247b1d91))
- forward PipeError cause ([8507e4e](https://github.com/kevinand11/valleyed/commit/8507e4ec1a02b5077c6bf9c71b22e76024cf27a4))
- fromJson pipe ([df1eafe](https://github.com/kevinand11/valleyed/commit/df1eafe90d739b63c900afdb24e85f293751944e))
- generate json schema ([848ed78](https://github.com/kevinand11/valleyed/commit/848ed787c795b92879bec7fe8be59be5af8a3110))
- isType supports any ([8584398](https://github.com/kevinand11/valleyed/commit/858439840f75bc4ebbbb009b0124fbbbeb480c02))
- merge pipe ([005acb0](https://github.com/kevinand11/valleyed/commit/005acb01501cd5dd630f9c5ccefe7033206102ca))
- meta on schema ([620143c](https://github.com/kevinand11/valleyed/commit/620143c80033205fe23206066d2a97a953a26c15))
- more primitives ([f15ce01](https://github.com/kevinand11/valleyed/commit/f15ce0143cb21d2161050a7060ab4dd4367d292f))
- new type ConditionalObjectKeys ([6829317](https://github.com/kevinand11/valleyed/commit/6829317c42bcf0dcec4f8614adf49171f369b573))
- numbers pipe api ([9d1a5ab](https://github.com/kevinand11/valleyed/commit/9d1a5ab1a7709fc025d74c58ef5142744f48228d))
- object extends ([129f32d](https://github.com/kevinand11/valleyed/commit/129f32de7dfe4f553251008ac4b2ffba95e75fd4))
- objectExtends, objectPick and objectOmit ([6a89dc3](https://github.com/kevinand11/valleyed/commit/6a89dc367a3cb89bd579d600b282b677d395a7d8))
- objectMerge ([2117fae](https://github.com/kevinand11/valleyed/commit/2117fae7dc2fde1e553657d7f5f47c72de58c038))
- optionals api ([29a6fdc](https://github.com/kevinand11/valleyed/commit/29a6fdc878fbc0075a6ac285a09706ac075f7b40))
- pipe api with primitives, junctions, core and arrays ([e9d2a69](https://github.com/kevinand11/valleyed/commit/e9d2a693b655016bd8c3caaaa15b1ae19a3e7954))
- pipe node and gather when needed ([dc364b2](https://github.com/kevinand11/valleyed/commit/dc364b21992534cc31a107c93afb59d61cba07df))
- refactor entire src for treeshaking ([254988d](https://github.com/kevinand11/valleyed/commit/254988d0c6fea4b3f15312fdddc9f73655f61b99))
- remove need for anyOf in nullable schemas ([2bb3d00](https://github.com/kevinand11/valleyed/commit/2bb3d0043ef6f3e9ebf0a4d63c51512cebb4a051))
- remove need for static list of files ([3d2d622](https://github.com/kevinand11/valleyed/commit/3d2d622067a9b29803e7c34bb3c2fc2cfe1baefb))
- strings pipe api ([04c6df8](https://github.com/kevinand11/valleyed/commit/04c6df8b4a5d693efcf41c8680a5e7dfcea79ea4))
- support custom context ([8530f8e](https://github.com/kevinand11/valleyed/commit/8530f8e8e7e423c425656af2c5bcfac61dae5684))
- support generics for file validations ([e5cb7b4](https://github.com/kevinand11/valleyed/commit/e5cb7b45d8f2097520cc2515b9da85430a47f327))
- support standard-schema ([e8b2c8f](https://github.com/kevinand11/valleyed/commit/e8b2c8fe115b1995d8a67cbbd20efec126df7345))
- switch to reverse linked list impl ([831ec48](https://github.com/kevinand11/valleyed/commit/831ec48efcfe19c50c5e459b92fb36572482d045))
- times pipe api ([1f18b5e](https://github.com/kevinand11/valleyed/commit/1f18b5e470da73de571d276c4a0dbb06e364a49e))
- withStrippedHtml ([50cfe72](https://github.com/kevinand11/valleyed/commit/50cfe72bc226290345893d33abdb33d697b474b3))

### Bug Fixes

- before and after expects fn not plain values ([b40eb85](https://github.com/kevinand11/valleyed/commit/b40eb8549527d9fabd45fad27f00da244751b27a))
- context and schema must be objects ([4d26247](https://github.com/kevinand11/valleyed/commit/4d26247b4c668fc70b8f16df480bd35455a6d154))
- dataclass toJSON only returns original keys ([b1a5452](https://github.com/kevinand11/valleyed/commit/b1a54525c57bfc8fb9abef5959a8f0418d94b725))
- fix JSONValue of DataClass<any, any> ([6a168c1](https://github.com/kevinand11/valleyed/commit/6a168c1f0af94b878c0870758e96b2ad2e858d75))
- fix Prettify for class instances ([39d79fb](https://github.com/kevinand11/valleyed/commit/39d79fb70cff7d440f514f82d2b35278a58d7b82))
- fix typings for objectX rules ([885ea27](https://github.com/kevinand11/valleyed/commit/885ea27adbb0d1dc3726454bb250057aaca19279))
- fix up JSONValueOf ([de97762](https://github.com/kevinand11/valleyed/commit/de977629c8389986613dd3fd6379a68069d719ef))
- impl for objectPick, objectOmit and objectExtends and add tests ([76a2f6b](https://github.com/kevinand11/valleyed/commit/76a2f6bf674e7e279046e1fb5f24c3424edfaf39))
- no need to clone for objects ([f1f0f2d](https://github.com/kevinand11/valleyed/commit/f1f0f2d3493d29c359c1d1b1e2d6bffb10260611))
- objectPick and objectEmit as value ([0f94a9a](https://github.com/kevinand11/valleyed/commit/0f94a9aa7f90e5e2ae6aaba425987a0c01e9b5f1))
- optionals typing ([4ae6979](https://github.com/kevinand11/valleyed/commit/4ae6979836df939036870ffadd412c903dbc0979))
- remove need for __update ([11bf277](https://github.com/kevinand11/valleyed/commit/11bf27709645853bbe9dcc0ec8a15dfe3a505996))
- remove objectTrim ([630f1f0](https://github.com/kevinand11/valleyed/commit/630f1f05cab076344990e61ef5c266453d0f3388))
- remove Pipe requirement for PipeInput, Output and Context ([0671b1e](https://github.com/kevinand11/valleyed/commit/0671b1e814cdfe6d95911752c13eaa90f1316c27))
- remove unknown errors ([9d6fd72](https://github.com/kevinand11/valleyed/commit/9d6fd72fcc9067d6263f924f4db18d55c0912595))
- rename safeParse to validate ([6ce2a75](https://github.com/kevinand11/valleyed/commit/6ce2a756ef728d49b61d94b29b0f779dffb5d828))
- requiredIf doesnt add undefined to the type ([b8054fb](https://github.com/kevinand11/valleyed/commit/b8054fbe0d17cf1fb3904e766636f2a23be28f3c))
- return type of DataClass toJSON ([9cd66ac](https://github.com/kevinand11/valleyed/commit/9cd66ac94f514979c59ebf50b6f7ff2e15c20c34))
- stop Prettify from messing with classes ([2c6ca51](https://github.com/kevinand11/valleyed/commit/2c6ca51624e685e9a67720153711bf2abb200c2e))

### [4.4.10](https://github.com/kevinand11/valleyed/compare/v4.4.9...v4.4.10) (2025-06-04)

### Bug Fixes

- type JSONValue of any with toJSON ([0d7d5a8](https://github.com/kevinand11/valleyed/commit/0d7d5a8aae7feed277ffb482e66ec583ed16a0a4))

### [4.4.9](https://github.com/kevinand11/valleyed/compare/v4.4.8...v4.4.9) (2025-06-04)

### Bug Fixes

- add Prettify type ([89176ab](https://github.com/kevinand11/valleyed/commit/89176ab72f3fb0feb184a2895e2fa2a5a8ca4ab0))

### [4.4.8](https://github.com/kevinand11/valleyed/compare/v4.4.7...v4.4.8) (2025-06-03)

### [4.4.7](https://github.com/kevinand11/valleyed/compare/v4.4.6...v4.4.7) (2025-06-03)

### Features

- new VObject extend ([252bc50](https://github.com/kevinand11/valleyed/commit/252bc507505e8a65d12be91a8eb8c5d9ff3da5d1))

### [4.4.6](https://github.com/kevinand11/valleyed/compare/v4.4.5...v4.4.6) (2025-05-22)

### Bug Fixes

- return json type ([ae45c35](https://github.com/kevinand11/valleyed/commit/ae45c357c8040db94f81845c5b66a60ce5d119e2))

### [4.4.5](https://github.com/kevinand11/valleyed/compare/v4.4.4...v4.4.5) (2025-05-21)

### Features

- move ignore and toJson logic from equipped to here ([df4ef30](https://github.com/kevinand11/valleyed/commit/df4ef3071f9faf45bed2bb3666c3f0af0e465fdf))

### [4.4.4](https://github.com/kevinand11/valleyed/compare/v4.4.3...v4.4.4) (2025-05-17)

### Bug Fixes

- transform from class O not I ([6caa508](https://github.com/kevinand11/valleyed/commit/6caa508b494b99710e477e93107aaa3946444ede))

### [4.4.3](https://github.com/kevinand11/valleyed/compare/v4.4.2...v4.4.3) (2025-05-17)

### Features

- support tracking Output of VBase and expose ExtractI and ExtractO ([39e11ea](https://github.com/kevinand11/valleyed/commit/39e11ea2449c344f1ac474ca59b66e14ed054c40))

### [4.4.2](https://github.com/kevinand11/valleyed/compare/v4.4.1...v4.4.2) (2025-04-06)

### [4.4.1](https://github.com/kevinand11/valleyed/compare/v4.4.0...v4.4.1) (2025-04-05)

### Bug Fixes

- add structuredClone polyfill ([80a794f](https://github.com/kevinand11/valleyed/commit/80a794f675171ddb5f32aeed70b825234c344e7a))

### [4.4.1](https://github.com/kevinand11/valleyed/compare/v4.4.0...v4.4.1) (2025-04-05)

### Bug Fixes

- add structuredClone polyfill ([80a794f](https://github.com/kevinand11/valleyed/commit/80a794f675171ddb5f32aeed70b825234c344e7a))

## [4.4.0](https://github.com/kevinand11/valleyed/compare/v4.3.1...v4.4.0) (2024-10-13)

### Features

- compareTwoStrings ([13f382b](https://github.com/kevinand11/valleyed/commit/13f382b9141a498830f2948a238670eeb5768880))

### [4.3.1](https://github.com/kevinand11/valleyed/compare/v4.3.0...v4.3.1) (2024-07-31)

### Bug Fixes

- wrap discriminator accessor in try/catch ([bc16ae8](https://github.com/kevinand11/valleyed/commit/bc16ae845e3250bd5d01fd9da75592639f520783))

## [4.3.0](https://github.com/kevinand11/valleyed/compare/v4.2.11...v4.3.0) (2024-06-09)

### Features

- support err message for is and in ([b0209ac](https://github.com/kevinand11/valleyed/commit/b0209acd4b101a573229881dd5a5be6212fafed4))

### [4.2.11](https://github.com/kevinand11/valleyed/compare/v4.2.10...v4.2.11) (2024-04-07)

### [4.2.10](https://github.com/kevinand11/valleyed/compare/v4.2.9...v4.2.10) (2024-04-06)

### Bug Fixes

- sanitizing nullable or unrequired rules ([9a34b2c](https://github.com/kevinand11/valleyed/commit/9a34b2cdcfa0bae9bcf8146adcd289d8e3aa7565))

### [4.2.9](https://github.com/kevinand11/valleyed/compare/v4.2.8...v4.2.9) (2024-02-26)

### Bug Fixes

- conditional setting of util insoect defaultOptions ([5aee284](https://github.com/kevinand11/valleyed/commit/5aee284725a8009bdce76784d41a028958ca6ea0))

### [4.2.8](https://github.com/kevinand11/valleyed/compare/v4.2.7...v4.2.8) (2024-02-26)

### Bug Fixes

- constructor args ([ec28290](https://github.com/kevinand11/valleyed/commit/ec282905f9c73ea21c33451465c22354b4fafec1))

### [4.2.7](https://github.com/kevinand11/valleyed/compare/v4.2.6...v4.2.7) (2024-02-21)

### Bug Fixes

- remove structuredClone ([fd08410](https://github.com/kevinand11/valleyed/commit/fd084106118958cd54100642318f6ed4d3a3f570))

### [4.2.6](https://github.com/kevinand11/valleyed/compare/v4.2.5...v4.2.6) (2024-02-17)

### Features

- class wrapper ([7fff739](https://github.com/kevinand11/valleyed/commit/7fff7398d514871636c79c584e6533dfe23636b9))

### [4.2.5](https://github.com/kevinand11/valleyed/compare/v4.2.4...v4.2.5) (2024-02-09)

### Bug Fixes

- eternal in getRandomSample if passed empty array ([5e596a9](https://github.com/kevinand11/valleyed/commit/5e596a963e8886af08bfe60077506aeafe23c144))

### [4.2.4](https://github.com/kevinand11/valleyed/compare/v4.2.3...v4.2.4) (2023-12-19)

### Bug Fixes

- api uses ignoreIfRequired as true ([26d6d27](https://github.com/kevinand11/valleyed/commit/26d6d2702bfa29749ec472ed8056e311585a812e))

### [4.2.3](https://github.com/kevinand11/valleyed/compare/v4.2.2...v4.2.3) (2023-11-21)

### Features

- discriminator ([3d3e535](https://github.com/kevinand11/valleyed/commit/3d3e53590f53d05cc7c6f882d43c93e70949b058))

### [4.2.2](https://github.com/kevinand11/valleyed/compare/v4.2.1...v4.2.2) (2023-09-09)

### Bug Fixes

- url regex fails if run twice immediately ([fdc832c](https://github.com/kevinand11/valleyed/commit/fdc832c60c12a6be6da0711493367f15339f2f7d))

### [4.2.1](https://github.com/kevinand11/valleyed/compare/v4.2.0...v4.2.1) (2023-08-16)

## [4.2.0](https://github.com/kevinand11/valleyed/compare/v4.1.8...v4.2.0) (2023-08-16)

### Features

- add chunk array function ([10a3f13](https://github.com/kevinand11/valleyed/commit/10a3f13c3d395954d8bf28d83340fe528df15c5d))

### [4.1.8](https://github.com/kevinand11/valleyed/compare/v4.1.7...v4.1.8) (2023-08-13)

### Features

- add file type ([64c108b](https://github.com/kevinand11/valleyed/commit/64c108b3e7ac29c68e1243835ed8af0ef654193b))

### [4.1.7](https://github.com/kevinand11/valleyed/compare/v4.1.6...v4.1.7) (2023-04-10)

### Bug Fixes

- vOr not trimming objects and objects with same keys but different type ([666e06f](https://github.com/kevinand11/valleyed/commit/666e06f14c0715037099883a3c53e03235968702))

### [4.1.6](https://github.com/kevinand11/valleyed/compare/v4.1.5...v4.1.6) (2023-03-30)

### Bug Fixes

- differ equal algo for object vs undefined/null ([beefccf](https://github.com/kevinand11/valleyed/commit/beefccf7b4e5d9d1c3a3aca8e85fa7836546be32))

### [4.1.5](https://github.com/kevinand11/valleyed/compare/v4.1.4...v4.1.5) (2023-03-19)

### [4.1.4](https://github.com/kevinand11/valleyed/compare/v4.1.3...v4.1.4) (2023-03-18)

### Bug Fixes

- add ne and nin rules, tests for v-core ([c65b7a3](https://github.com/kevinand11/valleyed/commit/c65b7a3e4315a035d746233a6c55fb915e1a4d49))
- array run validator before sanitizer, fix instanceof, add tests for api ([1191e93](https://github.com/kevinand11/valleyed/commit/1191e938b497974e11ae2b8d2f9fc4af07a31406))
- move non literal type check to typings not rules ([db29366](https://github.com/kevinand11/valleyed/commit/db293662be00422629c19766b10d3adf34bcfa74))

### [4.1.3](https://github.com/kevinand11/valleyed/compare/v4.1.2...v4.1.3) (2023-03-17)

### Bug Fixes

- get default value before checking typings ([c44071f](https://github.com/kevinand11/valleyed/commit/c44071f1b7c84a080f28335587261474164dd435))

### [4.1.2](https://github.com/kevinand11/valleyed/compare/v4.1.1...v4.1.2) (2023-03-14)

### Features

- is and in helpers on v object ([47d8359](https://github.com/kevinand11/valleyed/commit/47d835946e2b160a9f83984427926794381e8a5e))
- number int ([4e6b96b](https://github.com/kevinand11/valleyed/commit/4e6b96b885c257b2c67ebe817b1672a3a92fad07))

### [4.1.1](https://github.com/kevinand11/valleyed/compare/v4.1.0...v4.1.1) (2023-03-11)

### Bug Fixes

- use default 0 for round function ([7e4863e](https://github.com/kevinand11/valleyed/commit/7e4863eb406ba07c678c92c7b8a63bd7ef7fc23f))

## [4.1.0](https://github.com/kevinand11/valleyed/compare/v4.0.7...v4.1.0) (2023-03-07)

### Features

- add geohash functionality ([9d816e0](https://github.com/kevinand11/valleyed/commit/9d816e04ff764ae17521e98edb479973e75d2ca6))

### [4.0.7](https://github.com/kevinand11/valleyed/compare/v4.0.6...v4.0.7) (2023-02-16)

### Bug Fixes

- error from cloning objects and maps ([26b2213](https://github.com/kevinand11/valleyed/commit/26b221393981d76e303a46254d4918c2f059b066))

### [4.0.6](https://github.com/kevinand11/valleyed/compare/v4.0.5...v4.0.6) (2023-02-16)

### Bug Fixes

- import differ path ([e2253fa](https://github.com/kevinand11/valleyed/commit/e2253fab964f2f75c8a3158b87fe35c44415830d))

### [4.0.5](https://github.com/kevinand11/valleyed/compare/v4.0.4-alpha.2...v4.0.5) (2023-02-15)

### Features

- add default comparer ([dd0add2](https://github.com/kevinand11/valleyed/commit/dd0add2703cad7984d7fbc21e44627796ec683c8))

### [4.0.4-alpha.2](https://github.com/kevinand11/valleyed/compare/v4.0.4-alpha.1...v4.0.4-alpha.2) (2023-02-15)

### [4.0.4-alpha.1](https://github.com/kevinand11/valleyed/compare/v4.0.4...v4.0.4-alpha.1) (2023-02-14)

### Bug Fixes

- add generic type for v.any ([becf9f9](https://github.com/kevinand11/valleyed/commit/becf9f94be7931a663a0db9b9c44369300edc7de))

### [4.0.4](https://github.com/kevinand11/valleyed/compare/v4.0.3...v4.0.4) (2023-02-14)

### Bug Fixes

- make type File and interface ([edb0c1b](https://github.com/kevinand11/valleyed/commit/edb0c1b5a38afec866f6e16fdfa47f69661d4c06))

### [4.0.3](https://github.com/kevinand11/valleyed/compare/v4.0.2-patched...v4.0.3) (2023-02-14)

### [4.0.2-patched](https://github.com/kevinand11/valleyed/compare/v4.0.2...v4.0.2-patched) (2023-02-14)

### [4.0.2](https://github.com/kevinand11/valleyed/compare/v4.0.1...v4.0.2) (2023-02-14)

### Bug Fixes

- skipping lib folder when publishing ([163fdd1](https://github.com/kevinand11/valleyed/commit/163fdd19a74e55313e88a86d040d69a6a1c9b72d))

### [4.0.1](https://github.com/kevinand11/valleyed/compare/v0.0.0-alpha.0...v4.0.1) (2023-02-14)

### Bug Fixes

- readme ([e9005dd](https://github.com/kevinand11/valleyed/commit/e9005dd985fde28c8bd3ad3723facf62ee6a3c38))
- rename some utils ([4fd53d8](https://github.com/kevinand11/valleyed/commit/4fd53d8e2fd32d6ec77fda29e3e0c064eb329021))

## [0.0.0-alpha.0](https://github.com/kevinand11/valleyed/compare/v4.0.0-alpha.0...v0.0.0-alpha.0) (2023-02-14)

### Bug Fixes

- lib src folder issue ([c30c2a4](https://github.com/kevinand11/valleyed/commit/c30c2a4a7eec944ad9f3ce1dc29f3614b991d548))
