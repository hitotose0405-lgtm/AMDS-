/* =========================
   星詠み研究所
   メインプログラム
========================= */


/* =========================
   診断結果データ
========================= */

const diagnosisData = [
  {
    type: "星の探究者",

    text:
      "あなたは、物事を深く考え、自分自身の答えを見つけていく力を持っています。静かな時間の中で、本来の才能が輝くタイプです。",

    feature:
      "感受性が豊かで、周囲の変化を敏感に感じ取ります。一度興味を持ったことには、とことん向き合う集中力があります。",

    message:
      "焦らず、自分の歩幅で進んでください。あなたが選んだ道には、まだ見えていない星がたくさん輝いています。"
  },

  {
    type: "月影の導き手",

    text:
      "あなたは、人の気持ちや空気を感じ取る優れた感性を持っています。誰かの心をそっと照らすことのできる人です。",

    feature:
      "共感力が高く、相手の立場を考えて行動できます。あなたの優しさは、周囲の人に安心感を与えています。",

    message:
      "すべての人を照らす必要はありません。まずは自分自身の心にも、優しい光を向けてください。"
  },

  {
    type: "太陽の開拓者",

    text:
      "あなたは、自分で道を切り開いていく強さを持っています。新しいことに挑戦するほど、眠っていた才能が目を覚ますタイプです。",

    feature:
      "行動力があり、思い立ったら動ける人です。周囲を巻き込み、物事を前に進めるエネルギーがあります。",

    message:
      "完璧な準備を待つ必要はありません。一歩踏み出した先で、次の星があなたを導いてくれます。"
  },

  {
    type: "星海の旅人",

    text:
      "あなたは、自由な発想と豊かな想像力を持っています。決められた道より、自分だけの道を探すことで才能が輝きます。",

    feature:
      "好奇心が強く、新しい世界を知ることを楽しめます。普通とは違う視点から物事を見る力があります。",

    message:
      "遠回りに見える道も、あなたにとっては必要な旅です。自分の感覚を信じて進んでください。"
  }
];


/* =========================
   現在の診断結果
========================= */

let currentResult = null;

let currentName = "";


/* =========================
   画面切り替え
========================= */

function showPage(pageNumber) {

  document
    .querySelectorAll(".page")
    .forEach(page => {

      page.classList.remove("active");

    });


  const target =
    document.getElementById(
      "page" + pageNumber
    );


  if (target) {

    target.classList.add("active");

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================
   A1 → A2
   診断開始
========================= */

function startDiagnosis() {

  const name =
    document
      .getElementById("name")
      .value
      .trim();


  const birthday =
    document
      .getElementById("birthday")
      .value;


  if (!name) {

    alert("お名前を入力してください。");

    return;
  }


  if (!birthday) {

    alert("生年月日を入力してください。");

    return;
  }


  currentName = name;


  /*
    生年月日から簡易的に
    結果を決定します。
  */

  const date =
    new Date(birthday);


  const number =
    date.getFullYear() +
    date.getMonth() +
    date.getDate();


  const index =
    Math.abs(number)
    % diagnosisData.length;


  currentResult =
    diagnosisData[index];


  /*
    A2へ結果を表示
  */

  document
    .getElementById("resultName")
    .textContent =
      currentName;


  document
    .getElementById("resultType")
    .textContent =
      currentResult.type;


  document
    .getElementById("resultText")
    .textContent =
      currentResult.text;


  document
    .getElementById("featureText")
    .textContent =
      currentResult.feature;


  document
    .getElementById("messageText")
    .textContent =
      currentResult.message;


  showPage(2);
}


/* =========================
   A2 → A3
   保存用画像を作成
========================= */

function showSavePage() {

  if (!currentResult) {

    return;
  }


  createResultImage();


  showPage(3);
}


/* =========================
   保存用画像を作る
========================= */

function createResultImage() {

  const canvas =
    document.getElementById(
      "resultCanvas"
    );


  const ctx =
    canvas.getContext("2d");


  /*
    保存画像サイズ

    縦長なので
    InstagramやSNSにも
    使用しやすい比率です。
  */

  const width = 1080;

  const height = 1350;


  canvas.width = width;

  canvas.height = height;


  /* =====================
     背景
  ===================== */

  const background =
    ctx.createLinearGradient(
      0,
      0,
      0,
      height
    );


  background.addColorStop(
    0,
    "#090b1d"
  );

  background.addColorStop(
    0.5,
    "#171b43"
  );

  background.addColorStop(
    1,
    "#080a19"
  );


  ctx.fillStyle =
    background;

  ctx.fillRect(
    0,
    0,
    width,
    height
  );


  /* =====================
     星
  ===================== */

  const stars = [
    [100, 130, 4],
    [230, 220, 3],
    [880, 160, 4],
    [970, 300, 3],
    [120, 520, 3],
    [930, 570, 4],
    [180, 950, 3],
    [880, 1000, 3],
    [100, 1160, 4],
    [960, 1200, 3]
  ];


  stars.forEach(star => {

    ctx.beginPath();

    ctx.arc(
      star[0],
      star[1],
      star[2],
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      "#f1d27a";

    ctx.fill();

  });


  /* =====================
     外枠
  ===================== */

  ctx.strokeStyle =
    "#d9b75c";

  ctx.lineWidth = 3;

  ctx.strokeRect(
    45,
    45,
    width - 90,
    height - 90
  );


  /* =====================
     タイトル
  ===================== */

  ctx.textAlign = "center";


  ctx.fillStyle =
    "#f1d27a";

  ctx.font =
    "bold 42px sans-serif";


  ctx.fillText(
    "✦ 星詠み研究所 ✦",
    width / 2,
    130
  );


  /* =====================
     診断結果
  ===================== */

  ctx.fillStyle =
    "#ffffff";

  ctx.font =
    "bold 32px sans-serif";


  ctx.fillText(
    currentName + "さんの星",
    width / 2,
    210
  );


  /* =====================
     星マーク
  ===================== */

  ctx.fillStyle =
    "#f1d27a";

  ctx.font =
    "100px serif";


  ctx.fillText(
    "✦",
    width / 2,
    350
  );


  /* =====================
     タイプ
  ===================== */

  ctx.fillStyle =
    "#f4dc92";

  ctx.font =
    "bold 52px sans-serif";


  ctx.fillText(
    currentResult.type,
    width / 2,
    450
  );


  /* =====================
     区切り線
  ===================== */

  ctx.strokeStyle =
    "rgba(255,255,255,0.3)";

  ctx.lineWidth = 2;


  ctx.beginPath();

  ctx.moveTo(
    150,
    500
  );

  ctx.lineTo(
    930,
    500
  );

  ctx.stroke();


  /* =====================
     本文
  ===================== */

  ctx.fillStyle =
    "#eeeeee";

  ctx.font =
    "28px sans-serif";


  drawWrappedText(
    ctx,
    currentResult.text,
    width / 2,
    570,
    800,
    50
  );


  /* =====================
     特徴
  ===================== */

  ctx.fillStyle =
    "#e9d48b";

  ctx.font =
    "bold 30px sans-serif";


  ctx.fillText(
    "あなたの特徴",
    width / 2,
    780
  );


  ctx.fillStyle =
    "#dddddd";

  ctx.font =
    "26px sans-serif";


  drawWrappedText(
    ctx,
    currentResult.feature,
    width / 2,
    835,
    800,
    48
  );


  /* =====================
     メッセージ
  ===================== */

  ctx.fillStyle =
    "#e9d48b";

  ctx.font =
    "bold 30px sans-serif";


  ctx.fillText(
    "星からのメッセージ",
    width / 2,
    1050
  );


  ctx.fillStyle =
    "#dddddd";

  ctx.font =
    "26px sans-serif";


  drawWrappedText(
    ctx,
    currentResult.message,
    width / 2,
    1105,
    800,
    48
  );


  /* =====================
     コピーライト
  ===================== */

  ctx.fillStyle =
    "#aaaabb";

  ctx.font =
    "22px sans-serif";


  ctx.fillText(
    "星詠み研究所",
    width / 2,
    1280
  );


  /*
    Canvas → PNG画像

    A3で普通の<img>として表示するため、
    data URLに変換します。
  */

  const image =
    document.getElementById(
      "saveImage"
    );


  image.src =
    canvas.toDataURL(
      "image/png"
    );
}


/* =========================
   Canvasの文章折り返し
========================= */

function drawWrappedText(
  ctx,
  text,
  centerX,
  startY,
  maxWidth,
  lineHeight
) {

  let line = "";

  let y = startY;


  for (
    let i = 0;
    i < text.length;
    i++
  ) {

    const testLine =
      line + text[i];


    const metrics =
      ctx.measureText(
        testLine
      );


    if (
      metrics.width >
      maxWidth &&
      line !== ""
    ) {

      ctx.fillText(
        line,
        centerX,
        y
      );


      line =
        text[i];


      y += lineHeight;

    } else {

      line =
        testLine;

    }

  }


  if (line) {

    ctx.fillText(
      line,
      centerX,
      y
    );

  }
}