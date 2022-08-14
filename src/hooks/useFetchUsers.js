import { useState } from "react";
import axios from "axios";

export const useFetchUsers = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onClickFetchUser = () => {
    // ボタン押下時にローディングフラグon、エラーフラグ　off
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
      // 処理完了後は、ローディングフラグをoff
      .finally(() => setIsLoading(false));
  };

  // まとめて返却したいので、オブジェクトに設定する
  return { userList, isLoading, isError, onClickFetchUser };
};
