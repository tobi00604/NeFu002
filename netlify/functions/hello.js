export default async (req, context) => {
  let name = "ゲスト";

  // POSTリクエストの場合、ボディ(JSON)からnameを取得する
  if (req.method === "POST") {
    try {
      const body = await req.json(); // 送られてきたJSONを読み込む
      name = body.name || "ゲスト";
    } catch (error) {
      console.error("JSONの読み込みエラー:", error);
    }
  }

  // Netlifyの環境変数から値を取得する
  const coffeeMessage = process.env.COFFEE_MESSAGE || "";

  // 返却するデータ
  const data = {
    message: `こんにちは、${name}さん！${coffeeMessage}`,
    time: new Date().toISOString()
  };

  // JSON形式でレスポンスを返す
  return Response.json(data, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
};
