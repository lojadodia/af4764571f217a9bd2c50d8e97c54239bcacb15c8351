if(!self.define){let e,a={};const i=(i,s)=>(i=new URL(i+".js",s).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let t={};const r=e=>i(e,n),M={module:{uri:n},exports:t,require:r};a[n]=Promise.all(s.map((e=>M[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-62f137f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Ijl5M5EyMaPLQMGMYuH1V/_buildManifest.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/Ijl5M5EyMaPLQMGMYuH1V/_ssgManifest.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/048608f430e06727b22bae63e7a7cf8ca0407184.28b3059ead3e37d60fb6.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/0a37622ff2931bae70f16d882accb6031d4b2ba2.770feb51053b37b3d8af.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/0a58b481ccc07c1f4f92068d88b1dd1411efb1c5.e6942e91dbf9d3804567.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/0c9f6b83139462d44438550bcffb79abbbfabe82.f85b0a7b94e93d4a0c60.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/0da73d4fb75354ee65776648cbc07874917526f7.10a352704baad3fc1cd3.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/1452102f8f915cd792907ab881ba959707fbe0c0.5f4626f4d5e519707004.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/18.452fad3fc618aa68e319.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/20a9b0be7f122ca3e9cf287e8aba49ca28fea429.fb5e794a43ec0e376494.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/27.c0c291c539596a7b0eb0.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/2ce0ead1491c62baadcef8af2c0efeaf57df47d6.9e0bb05d043b9be27dfe.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/32d2f244397ec241e03a577f766089ef344275ff.2a4e0a3f0cb9ca3a0fa8.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/336185481f93df55780e20dec8fc87d81fd04eb5.4f1e45eaedd210d848cf.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/52.b0741f73692f1628d8a9.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/53.cf6576256d89daee2b74.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/54.971168706b559ff9c906.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/55.c10f57626d93f04d9904.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/56.ae37062707e89e2daa58.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/57.335969dafadfb345a693.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/58.b49ffa19cfe9534ee595.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/59.c683ac3e70574ed11ef6.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/60.c53c913ae5013c353759.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/61.63ee3f119399d48f38ec.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/62.006ef21cc96c13a558fb.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/63.e89908ebfc4d0ef0ed86.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/632cba62.25b06130eae7b9610324.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/64.f3b03f80ff5ab475df31.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/65.e4ff16c85a7b40a69340.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/66.3bc3703a5842c1d56390.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/67.0d7cde7f49ef71d8866d.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/68.3aac7ab2bac84b9f4f70.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/69.d031b40473d364d1d8c2.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/70.22bc46f98d8decdf7f39.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/71.f8f7fa130389737b1dcb.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/71247caf95475e3ea7f9a0f8a30beb258b23d005.a451152668e615d40360.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/72.d10a65261ed2f7a7677f.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/73.644bd7c495ecb1612ffa.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/75fc9c18.e1dd072cb8d566d7aec0.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/78b17ef7036ffc39f2cb4d633d89ba2d233fb1f2.1956827f556dd3225054.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/78e521c3.8403f694c4f636444e38.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/8e4c32be463bd508262f68cf90b1f31e77447ae7.e6c7d7c589f5077f0f55.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/979ba0f4da696ce1ff58b10f7e6e4568419aacda_CSS.6facc531ffed0abd52d2.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/a0f55c1262f5c51b6e0740d42b724bc130170e6c.7c028e4820a5786fa9f1.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/ab23d4e7f79485add8de3faa7b7804703008491b.0ea7b499098d72c4ae27.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/baa2f5ccf0407c909ce2d41e45ed7cd360e7c98a.b5cbe0a62916f078d039.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/commons.dea5e45222e19a724946.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/d82add965c8af357469c463088f5f64921a6f974.3ea4a1778c1cfc778ec2.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/e455c65602dc8c75ea9e3159a8475b4177987d11.d3b73ae52416ec741b71.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/fdcb2bcc67a21df955431ef0e1e231c8dbed946f.fd440844b645d2e16678.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/fdff09f3e255e9bd6c7f88af3e4111e13d5db9eb.3db8b0753e49120c346d.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/framework.48a441fb05b6de80f4b9.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/main-158011423fca5973b2f1.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/pages/%5Btype%5D-dd95db4ec8ff30297169.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/pages/404-d1f84ecab58701d35481.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/pages/_app-8855a5f3133ef6638eeb.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/pages/_error-51fa16010216e76ac7e0.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/pages/a/%5Bslug%5D-7768f70e6102f8d93765.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/pages/about-23f55e4fb3d456ec6fea.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/pages/bakery-438422a97b255cb564fe.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/pages/change-password-e4d633af494140c103dc.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/pages/checkout-6543359610fda6a0446f.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/pages/contact-8e285afefc90495e5e2b.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/pages/help-afb16dd8cfc9aebea958.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/pages/index-2c1ced8b5aa45b44f10e.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/pages/logout-21a4b1f32a0c8113d98a.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/pages/offers-bad944ceaa330d5c698b.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/pages/order-31ce9f6e08a6d1312d12.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/pages/order-received/%5Btracking_number%5D-8101cbadf6cbe00df0ee.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/pages/orders-498781d1d789b149553e.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/pages/privacy-8f9126c0b97d86d71c61.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/pages/products/%5Bslug%5D-5453b46ebd4c3a04fb04.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/pages/profile-7f454dbf8def292f795d.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/pages/terms-a07b0896e1a2729a3cac.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/polyfills-6ad92eeda0d9ed5b42f0.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/chunks/webpack-f35d21411717edd7e27a.js",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/css/09f70469d41fd8bd1792.css",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/css/2e53fdf8468532f7d0ec.css",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/css/3c0b9d8d17e87865f9be.css",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/css/487ec9054f29a13ad9ae.css",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/css/7af7f28a47df91b5e417.css",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/css/991ad31045c48896b6df.css",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/css/db04274d0e1caa11303a.css",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/css/dd867d6585b0dc436c1a.css",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/css/e1f522ba1c36596a6290.css",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/css/f654a809a04da89d13f1.css",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-Black.2838758e92f4261887fcaf0e36112493.eot",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-Black.4a2c5eeb3ab64924ab0160c5517ff38b.woff",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-Black.dd7c8bacda4fd8d76804c6af282fc420.ttf",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-Black.e674b9616c3dd401fca2e6a318ce23f4.svg",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-BlackItalic.03ccb32fe9734beb80b4acf030b7efdf.svg",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-BlackItalic.160610ae8205f5c66ae5fab2eb1493c1.woff",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-BlackItalic.1be5e5f19a260b66fe5607fdf584ef1c.eot",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-BlackItalic.c0cfcc76e96260461f8a20584074f28f.ttf",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-Bold.4bae1919c290b401036664748d04e1d9.woff",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-Bold.544334209f41ff0b1ebb37057a9cab48.ttf",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-Bold.b4201d96e569b947f69f331041035cf8.svg",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-Bold.d0d14e8484479546f8c5cd2ae792494c.eot",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-BoldItalic.30cf0be27a76834c180e4bdfe9f4c414.svg",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-BoldItalic.4c0949c4b04547e2e7060561f6716ae2.ttf",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-BoldItalic.af155cb0fa9f099b432ba2f7c5a32cb7.eot",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-BoldItalic.eeb47162f840d81b999f9db1799f7e40.woff",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-Book.0aa18bbf636d33966235d233e87e2b35.eot",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-Book.56e46dd26062a08cfc7c25f820f8fef8.ttf",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-Book.6fd0a0590862811e606376d9481f12d3.svg",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-Book.b9b1abe339ba6639afffbad2d818f23d.woff",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-BookItalic.5679d537c5ac93eef9e2a983fdb40cc5.eot",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-BookItalic.6a368664daef7728468a330d145cd17c.woff",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-BookItalic.d46d6900818cb7b859e7a01b734046a6.svg",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-BookItalic.f00f454023081d8f23104099fca43f47.ttf",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-Medium.10bdaf17c5be04bb60185fc774940052.svg",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-Medium.6fb73f93b89db3da0c34ce5b6ca7b416.ttf",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-Medium.bba31ddc6a13eea7712ea6185f87e298.eot",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-Medium.e39d4081b339f42a2a55913a22dcfd15.woff",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-MediumItalic.08cb980d630a11601a47347fd1c5ca42.svg",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-MediumItalic.4936f24bfd75da70e050ba019f454b94.eot",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-MediumItalic.8ffa91cf3bbb50d181ed21325709be12.woff",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/CircularStd-MediumItalic.df104e4b3b1461e65461434b08309450.ttf",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-all-400-normal.fd1a30188fbba33c197111853f7de9ab.woff",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-all-600-normal.3c307d7857602d8ab49dd0e40d29d6d0.woff",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-all-700-normal.3499b9716301bd3c513c34b7c1e26c32.woff",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-cyrillic-400-normal.8c8b009e2308cfd366740eca4d4eafa6.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-cyrillic-600-normal.01c4890f27c6469c81a8b5a210acec60.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-cyrillic-700-normal.1c275ed85d097d423a5ab4fd32d23f51.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-cyrillic-ext-400-normal.432abaf385d938750963d74176d9f862.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-cyrillic-ext-600-normal.809cc0b27332d472d16e9a52c37b3ada.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-cyrillic-ext-700-normal.3c59ade8b77934a45b30d8f4b6a83495.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-greek-400-normal.f4df5aa87d97ffdd65c4f781b12ede75.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-greek-600-normal.387efc3da55d512002ee2baf62c7f8af.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-greek-700-normal.8fe2fcd1cc0060a5abe80195f1403dfe.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-greek-ext-400-normal.7f0c7c378a3ca829b189ee3da6e71b77.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-greek-ext-600-normal.050f4e3259b272671ab679801132caf5.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-greek-ext-700-normal.6ec764fe61947b88ec492fcd266b2ee6.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-hebrew-400-normal.c4e6d354894703317c0cd6fa09978cb2.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-hebrew-600-normal.8b5c9197fb1e628431107de537d2dc5f.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-hebrew-700-normal.87a0af0cdd297129379fa143edf156d9.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-latin-400-normal.a2d02404d087c7c068d4266172a0933d.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-latin-600-normal.87da65d8301dc2218555c9c0a9bb3f49.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-latin-700-normal.166dc5efb248e57520964b354e0b38bb.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-latin-ext-400-normal.0950a0dbc206706736db7e470e257e77.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-latin-ext-600-normal.64747c633322cd7d25afb1585fdcabba.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-latin-ext-700-normal.45e8e1ac313ddc44a97304a523fcd9a8.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-vietnamese-400-normal.1970138327ca2599f2c594e090d41ee2.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-vietnamese-600-normal.59033dc3858d3b240ccad4c600655068.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/_next/static/media/open-sans-vietnamese-700-normal.f7029b9ddd8d28129255f2c98292f89c.woff2",revision:"Ijl5M5EyMaPLQMGMYuH1V"},{url:"/arrow-next.svg",revision:"7252c5ac000d888f55bba2880bff4fe6"},{url:"/avatar-placeholder.svg",revision:"4f5628d48244291a5613c63171ba4168"},{url:"/banner/bags.png",revision:"09960cef3eae571bec3505865a1f5135"},{url:"/banner/bakery.jpg",revision:"54380b19aa04d0897c4b675dcb97a76d"},{url:"/banner/books.png",revision:"362f0365da5d769fe78cba20f6f0d468"},{url:"/banner/cloths.png",revision:"ec8f9995002087f7dc878761f3828a9d"},{url:"/banner/furniture-banner-1.jpg",revision:"ced5aa1da0566bdf9510c10462d61f38"},{url:"/banner/furniture-banner-2.jpg",revision:"950fc4bc3c0841220b2297cc8d9ee4e1"},{url:"/banner/furniture.png",revision:"ec772428c4d3a8ba4ad2802caac2b90c"},{url:"/banner/grocery-banner-img-one.jpg",revision:"0640b273f4565a708d695370f2757f27"},{url:"/banner/grocery-banner-img-two.jpg",revision:"f51ee5c529305e99d9b4a8efaba1375a"},{url:"/banner/grocery.png",revision:"c5497ec04053d4118bd7693e7818454c"},{url:"/banner/makeup.png",revision:"1634bc114e280edc6ca375ca88708eaf"},{url:"/banner/medicine.png",revision:"6e8ebb087020b94d3aeae59c5c51744f"},{url:"/banner/restaurant.png",revision:"0a536dddb3dd5448a2d01af9bc28c3a5"},{url:"/contact-illustration.svg",revision:"0dd527de797620e6fe156a1a7d28d434"},{url:"/coupon-placeholder.svg",revision:"182e07391d101c984e6ec917795c7f6d"},{url:"/dark/product-placeholder.svg",revision:"b84da66fe63accedfee579fde43114d5"},{url:"/img/dark-payment/boleto.png",revision:"64862af3c41b54f2f06850860f6baa58"},{url:"/img/dark-payment/card.png",revision:"1d4d347f66a75307eadff1b58a9e76c3"},{url:"/img/dark-payment/livro-reclamacoes.png",revision:"b548a88a6815ba0afd06b91a00bdb726"},{url:"/img/dark-payment/mb.png",revision:"ef088320713614a1ed50ce4cf4328b60"},{url:"/img/dark-payment/mbway.png",revision:"ae026f3ba49e575e124c5ffc4741c144"},{url:"/img/dark-payment/paypal.png",revision:"37859592d34f4ae0113305ccce6a3802"},{url:"/img/dark-payment/pix.png",revision:"2abeb3077299aaeaf244fbc2ae64dc4e"},{url:"/img/dark-payment/reclame-aqui.png",revision:"c12b3edc8c541e784caa31136c0d876b"},{url:"/img/payment/boleto.png",revision:"0348aee32ab1c7aab4fee6a7e3d79c9c"},{url:"/img/payment/card.png",revision:"58a97562ffa42b07358b864992c17923"},{url:"/img/payment/dark-livro-reclamacoes.png",revision:"986fb254e3a72099594a11a6f7a02ba4"},{url:"/img/payment/dark-mb.png",revision:"7bd9b25d57dc9769dad540f12f14c293"},{url:"/img/payment/dark-mbway.png",revision:"4fa20732cdb019e67d5dc34d86f15a8a"},{url:"/img/payment/livro-reclamacoes.png",revision:"1c442c70d9366e188f2b43aa9fa15045"},{url:"/img/payment/mb.png",revision:"8f3881bd130985b722e8422e4e03e48d"},{url:"/img/payment/mbway.png",revision:"14213e13b6c468aa33749a23cf83e49c"},{url:"/img/payment/paypal.png",revision:"37859592d34f4ae0113305ccce6a3802"},{url:"/img/payment/pix.png",revision:"80c87e57f0db9c377ce9010055b2b93b"},{url:"/img/payment/reclame-aqui.png",revision:"fff7341f34264f5eea868bbb524a6131"},{url:"/locales/BR/translation.json",revision:"a3862d2029f4afc3ec0072f5b48e26ca"},{url:"/locales/PT/translation.json",revision:"4c5f325c31be9b0cbeaa950ae4de2350"},{url:"/logo.svg",revision:"d9e5469e9bcea186b09f4668911648fd"},{url:"/no-result.svg",revision:"480216fa325b0ccedc8750011c783ac0"},{url:"/product-placeholder.svg",revision:"d0cf91b5fa5d650c83cfbae209a9892e"},{url:"/promotion/offer-1.png",revision:"438a486cc235e612084dc7f2f5dc22a1"},{url:"/promotion/offer-2.png",revision:"f7499f31bb5ad7bd8b091b7afd135268"},{url:"/promotion/offer-3.png",revision:"551eec59bcd1318217d5ecaed46dcd10"},{url:"/promotion/offer-4.png",revision:"360a92bb9a885ab82dace6e4020aea39"},{url:"/promotion/offer-5.png",revision:"1b88dfc8f30b388e26fd80bcbbd6fed1"},{url:"/sitemap.xml",revision:"1700d1f2dbbf5d5388ad1fdbe46a0454"},{url:"/success.gif",revision:"80f56a17286aec5d5fd928a08868d254"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:i,state:s})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
