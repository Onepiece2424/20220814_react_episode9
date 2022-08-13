import { useState } from "react";
import axios from "axios";

export const App = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  //　ユーザー取得ボタン押下アクション
  const onClickFetchUser = () => {
    // ボタン押下時にローディングフラグon、エラーフラグoff
    setIsLoading(true);
    setIsError(false);

    // APIの実行
    axios
      .get("https://example.com/users")
      .then((result) => {
        // 苗字と名前を結合するように変換
        const users = result.data.map((user) => ({
          id: user.id,
          name: `${user.lastname} ${user.firstname}`,
          age: user.age
        }));
        // ユーザー一覧Stateを更新
        setUserList(users);
      })
      // エラーの場合はエラーフラグをon
      .catch(() => setIsError(true))
      // 処理完了後はローディングフラグをoff
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <button onClick={onClickFetchUser}>ユーザー取得</button>
      {/* エラーの場合は、エラーメッセージを表示 */}
      {isError && <p style={{ color: "red" }}>エラーが起きました</p>}
      {/* ローディング中は表示を切り替える */}
      {isLoading ? (
        <p>データ取得中です</p>
      ) : (
        userList.map((user) => (
          <p key={user.id}>{`${user.id}:${user.name}(${user.age}歳)`}</p>
        ))
      )}
    </div>
  );
};
