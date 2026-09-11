/* =====================================================
   診断サイト JavaScript
===================================================== */


/* =====================================================
   現在選択されているカテゴリー
===================================================== */

let currentCategory = "A";


/* =====================================================
   入力された情報
===================================================== */

let userData = {

  name: "",

  date: "",

  option: ""

};


/* =====================================================
   A〜Dの診断結果
===================================================== */

const diagnosisData = {

  A: {

    title: "あなたは素晴らしい可能性を持っています",

    score: 85,

    description:
      "あなたには独自の魅力と可能性があります。自分自身の感覚を大切にしながら、あなたらしい道を進んでいくことで、さらに大きな可能性が開いていくでしょう。",

  },


  B: {

    title: "あなたは人を惹きつける魅力があります",

    score: 92,

    description:
      "あなたには周囲の人を自然と惹きつける魅力があります。自分の考えや感性を表現することで、思いがけない出会いやチャンスにつながっていくでしょう。",

  },


  C: {

    title: "あなたには強い直感力があります",

    score: 78,

    description:
      "あなたは物事の本質を感覚的に捉える力を持っています。頭で考えすぎず、自分の中に浮かんだ感覚を大切にすると、進むべき方向が見えてくるでしょう。",

  },


  D: {

    title: "あなたは未来を切り開く力があります",

    score: 96,

    description:
      "あなたには、自分で未来を切り開いていく力があります。小さな一歩を積み重ねることで、大きな変化を生み出せるタイプです。自信を持って進んでください。",

  }

};


/* =====================================================
   画面を切り替える
===================================================== */

function showScreen(screenId) {

  const screens =
    document.querySelectorAll(".screen");


  screens.forEach(function(screen) {

    screen.classList.remove("active");

  });


  const target =
    document.getElementById(screenId);


  if (target) {

    target.classList.add("active");

  }


  // ページ上部へ戻す

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


/* =====================================================
   A〜Dを選択
===================================================== */

function startCategory(category) {

  currentCategory = category;


  // A1 / B1 / C1 / D1

  document.getElementById(
    "input-category"
  ).textContent = category;


  // タイトル

  document.getElementById(
    "input-title"
  ).textContent =
    category + "の情報入力";


  // 入力画面へ

  showScreen("screen-input");

}


/* =====================================================
   結果を表示
===================================================== */

function showResult() {

  // 入力値を取得

  const name =
    document.getElementById(
      "user-name"
    ).value.trim();


  const date =
    document.getElementById(
      "user-date"
    ).value;


  const option =
    document.getElementById(
      "user-option"
    ).value.trim();


  // 名前が空の場合

  if (!name) {

    alert(
      "お名前を入力してください。"
    );

    return;

  }


  // データ保存

  userData.name = name;

  userData.date = date;

  userData.option = option;


  // 診断データ取得

  const data =
    diagnosisData[currentCategory];


  /* =========================
     結果画面を書き換える
  ========================== */

  document.getElementById(
    "result-category"
  ).textContent =
    currentCategory;


  document.getElementById(
    "result-letter"
  ).textContent =
    currentCategory;


  document.getElementById(
    "result-score"
  ).textContent =
    data.score;


  document.getElementById(
    "result-title"
  ).textContent =
    data.title;


  document.getElementById(
    "result-description"
  ).textContent =
    data.description;


  document.getElementById(
    "display-name"
  ).textContent =
    name;


  document.getElementById(
    "display-type"
  ).textContent =
    currentCategory;


  document.getElementById(
    "result-name"
  ).textContent =
    name + "さんの診断結果";


  // A2 / B2 / C2 / D2

  document.getElementById(
    "result-category"
  ).textContent =
    currentCategory;


  // 結果画面へ

  showScreen("screen-result");

}


/* =====================================================
   A2 → A3
===================================================== */

async function goToImage() {

  const resultCard =
    document.getElementById(
      "result-card"
    );


  // ボタンなどを押す前に少し待つ

  await new Promise(
    function(resolve) {

      setTimeout(
        resolve,
        100
      );

    }
  );


  try {

    /*
      html2canvasを使って
      結果カードを画像化
    */

    const canvas =
      await html2canvas(
        resultCard,
        {

          scale: 2,

          backgroundColor:
            "#f7eff9",

          useCORS: true,

          logging: false

        }
      );


    // PNG画像に変換

    const imageData =
      canvas.toDataURL(
        "image/png"
      );


    // A3 / B3 / C3 / D3

    document.getElementById(
      "image-category"
    ).textContent =
      currentCategory;


    // 画像表示

    document.getElementById(
      "result-image"
    ).src =
      imageData;


    // 画像保存画面へ

    showScreen(
      "screen-image"
    );


  } catch (error) {

    console.error(error);

    alert(
      "画像の作成に失敗しました。もう一度お試しください。"
    );

  }

}


/* =====================================================
   画像を保存
===================================================== */

function downloadImage() {

  const image =
    document.getElementById(
      "result-image"
    );


  // 画像がない場合

  if (!image.src) {

    alert(
      "保存する画像がありません。"
    );

    return;

  }


  /*
    ダウンロード用リンクを作る
  */

  const link =
    document.createElement("a");


  link.href =
    image.src;


  link.download =
    "diagnosis-" +
    currentCategory +
    "-result.png";


  document.body.appendChild(
    link
  );


  link.click();


  document.body.removeChild(
    link
  );

}


/* =====================================================
   初期状態
===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    showScreen(
      "screen-list"
    );

  }
);