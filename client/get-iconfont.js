/* eslint-disable import/no-commonjs */
const fs = require('fs');
const request = require('request');

const newPath = process.argv[2];

if (!newPath) {
  console.log('【Error】需要 http://at.alicdn.com/t/...后面这一串');
  console.log('示例：node get-iconfont.js font_153770_kdb4omr364a');
  process.exit(0);
}
const fontPath = 'http://at.alicdn.com/t/' + newPath;
const suffixs = ['.eot', '.woff', '.ttf', '.svg', '.css'];

const promise = (ele) => {
  return new Promise((resolve, reject) => {
    const downloadPath = `${fontPath}${ele}`;
    const options = {
      method: 'GET',
      url: downloadPath,
      headers: {
        'cache-control': 'no-cache'
      }
    };
    request(options, (error, response, body) => {
      if (error) {
        reject(`iconfont${ele}下载失败了`);
        throw new Error(error);
      }
      if (ele === '.css') {
        body = body.replace(/16px/, '50px');
        fs.writeFileSync(`./src/static/iconfont/iconfont.scss`, body);
      } else {
        fs.writeFileSync(`./src/static/iconfont/iconfont${ele}`, body);
      }
      resolve(`iconfont${ele}下载更新成功`);
    });
  });
};
const promises = suffixs.map((ele) => {
  return promise(ele);
});
Promise.all(promises).then((res) => {
  console.log(res);
  process.exit(0);
});


function convertImgToBase64(url, outputFormat, callback) {
  const canvas = document.createElement('CANVAS'),
    ctx = canvas.getContext('2d'),
    img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function () {
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL(outputFormat || 'image/png');
    callback.call(this, dataURL);
    canvas = null;
  };
  img.src = url;
}

function getBase64Image(img, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width ? width : img.width;
  canvas.height = height ? height : img.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL();
}

let imgSrc = "https://z649319834.github.io/Learn_Example/video_track/webvtt.jpg";

//width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
function getBase64Image(img, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width ? width : img.width;
  canvas.height = height ? height : img.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL();
}
function getCanvasBase64(img) {
  var image = new Image();
  //至关重要
  image.crossOrigin = '';
  image.src = img;
  //至关重要
  var deferred = $.Deferred();
  if (img) {
    image.onload = function () {
      deferred.resolve(getBase64Image(image));//将base64传给done上传处理
      document.getElementById("container2").appendChild(image);
    }
    return deferred.promise();//问题要让onload完成后再return sessionStorage['imgTest']
  }
}
getCanvasBase64(imgSrc)
  .then(function (base64) {
    console.log("方式二》》》》》》》》》", base64);
  }, function (err) {
    console.log(err);
  });


(function () {
  utils('')
  const [chkImg] = document.getElementsByName('chkImg')
  chkImg.onload = () => {
    const chkBase64 = getBase64Image(chkImg)
  }

  var utils = {
    getBase64Image(img, width, height) {
      const canvas = document.createElement("canvas");
      canvas.width = width ? width : img.width;
      canvas.height = height ? height : img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL();
    },
    loadJs(file) {
      const scriptTag = document.getElementById('loadScript');
      const head = document.getElementsByTagName('head').item(0)
      if (scriptTag) head.removeChild(scriptTag);
      script = document.createElement('script');
      script.src = file;
      script.type = 'text/javascript';
      script.id = 'loadScript';
      head.appendChild(script)
    }
  }
})();
