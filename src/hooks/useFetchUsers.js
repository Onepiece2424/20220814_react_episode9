import { useState } from "react";
export const useFetchUsers = () => {
  const [userList, setUserList] = useState([{ id: 1 }]);

  const onClickFetchUser = () => alert("関数実行");

  // まとめて返却したいので、オブジェクトに設定する
  return { userList, onClickFetchUser };
};
