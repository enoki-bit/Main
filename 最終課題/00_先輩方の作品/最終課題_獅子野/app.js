// 画面の部品を取得
const genBtn = document.getElementById("genBtn");
const nameInput = document.getElementById("name");
const resultEl = document.getElementById("result");
const loadingEl = document.getElementById("loading");

// ボタンクリック時に自己紹介生成処理を開始
genBtn.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  await generateProfile(name);
});

// 生成処理の全体制御
// ローディング開始 → AI呼び出し → ローディング終了
async function generateProfile(name) {
  setLoading(true);
  resultEl.innerText = "自己紹介を考えています...";

  try {
    await callGemini(name);
  } catch (error) {
    resultEl.innerText = "いま秘密道具が混み合っています。少し待ってからもう一度試してください。";
  } finally {
    setLoading(false);
  }
}

// ローディング表示の切り替え
// ボタンの連打防止
function setLoading(isLoading) {
  genBtn.disabled = isLoading;

  if (isLoading) {
    loadingEl.classList.remove("hidden");
  } else {
    loadingEl.classList.add("hidden");
  }
}


// Gemini APIを呼び出して自己紹介を生成

async function callGemini(name) {
  // API接続に必要な情報
  const API_KEY = "AIzaSyCLJuxMidmGkUxmyk2-O9TTY0AcZNItw0Q";
  const MODEL_NAME = "gemini-2.5-flash-lite";

  // APIの送信先URLを作成
  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

  // 名前が入力されているかどうかで条件文を切り替え
  const nameCondition = name
    ? `名前: ${name}`
    : "名前が未入力の場合は、自然な日本人名を1つ生成すること";

  // AIへの指示文（プロンプト）を作成
  const prompt = `
あなたは面白いプロフィールを作るAIです。

条件:
- 日本語で書く
- 各項目は1文で簡潔に書く
- 少しクスッと笑える要素を入れる
- 現実っぽさと少しだけズレた面白さを入れる
- 名前がない場合は自然な日本人名を生成する
- ニックネームは面白い言葉を探してつなげて少し印象に残るものにする
- 難しすぎる言葉は使わない
- 必ずJSON形式のみを返し、余計な説明文は一切付けない

${nameCondition}
`.trim();

  // APIに送るデータを作成
  // responseSchemaで返却してほしいJSON形式を指定
  const payload = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.9,
      responseSchema: {
        type: "OBJECT",
        properties: {
          name: { type: "STRING" },
          nickname: { type: "STRING" },
          skill: { type: "STRING" },
          worry: { type: "STRING" }
        },
        required: ["name", "nickname", "skill", "worry"]
      }
    }
  };

  try {
    // Gemini APIへPOST通信
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    // APIレスポンスを文字列で受け取る
    const rawText = await response.text();

    // アクセス過多（429）の場合の処理
    if (response.status === 429) {
      resultEl.innerText = "いま秘密道具が混み合っています。少し待ってからもう一度試してください。";
      return;
    }

    // その他のAPIエラーの処理
    if (!response.ok) {
      resultEl.innerText = `APIエラー: ${response.status}`;
      return;
    }

    // APIレスポンス全体をJSONとして解析
    const data = JSON.parse(rawText);

    // Geminiの返答本文（JSON文字列）を取り出す
    const jsonText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    // jsonTextが存在するか確認
    if (!jsonText) {
      resultEl.innerText = "自己紹介を生成できませんでした。";
      return;
    }

    // JSON文字列をJavaScriptオブジェクトに変換
    let profile;
    try {
      profile = JSON.parse(jsonText);
    } catch (error) {
      resultEl.innerText = "自己紹介を生成できませんでした。";
      return;
    }

    // 必須項目がすべて揃っているか確認
    if (!profile?.name || !profile?.nickname || !profile?.skill || !profile?.worry) {
      console.warn("profile field missing:", profile);
      resultEl.innerText = "自己紹介を生成できませんでした。";
      return;
    }

    // 正常に取得できた自己紹介を画面に表示
    resultEl.innerText =
      `【${profile.name}】\n\n` +
      `ニックネーム：${profile.nickname}\n\n` +
      `特技：${profile.skill}\n\n` +
      `最近の悩み：${profile.worry}`;
  } catch (error) {
    resultEl.innerText = "22世紀との通信が途切れました。";
  }
}