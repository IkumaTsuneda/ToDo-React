import React, { useState } from "react";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";
import "./styles.css";

export const App = () => {
  //追加するTODO
  const [todoText, setTodoText] = useState("");
  //未完了TODO
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  //完了したTODO
  const [completeTodos, setCompleteTodos] = useState([]);

  //入力値
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  /** 追加ボタンの処理 */
  const onClickAdd = () => {
    if (todoText.length === 0 || todoText === "") return;
    //追加後の未完了のTODOリスト
    const newTodos = [...incompleteTodos, todoText];
    //追加後の未完了のTODOリストをセット
    setIncompleteTodos(newTodos);
    //入力欄クリア
    setTodoText("");
  };

  /** 削除ボタンの処理 */
  const onClickDelete = (index) => {
    //選択された要素を未完了のTODOから削除
    deleteInComlete(index);
  };

  /** 完了ボタンの処理 */
  const onClickComplete = (index) => {
    //選択された要素を未完了のTODOから削除
    deleteInComlete(index);
    //追加後の追加後の完了したTODOリスト
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    //追加後の完了したTODOリストをセット
    setCompleteTodos(newCompleteTodos);
  };

  /** 戻すボタンの処理 */
  const onClickBack = (index) => {
    //追加後の追加後の完了したTODOリスト
    const newInompleteTodos = [...incompleteTodos, completeTodos[index]];
    //追加後の完了したTODOリストをセット
    setIncompleteTodos(newInompleteTodos);

    //現在の未完了のTODOリスト
    const newCompleteTodos = [...completeTodos];
    //選択された要素を削除
    newCompleteTodos.splice(index, 1);
    //削除後の完了したTODOリストをセット
    setCompleteTodos(newCompleteTodos);
  };

  /** 未完了のTODOを削除する共通処理*/
  const deleteInComlete = (index) => {
    //現在の未完了のTODOリスト
    const newTodos = [...incompleteTodos];
    //選択された要素を削除
    newTodos.splice(index, 1);
    //削除後の未完了のTODOリストをセット
    setIncompleteTodos(newTodos);
  };

  return (
    <>
      {/* TODOの追加 */}
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるtodoは5個までです。タスクを消化してください。
        </p>
      )}
      {/* 未完了のTODO */}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      {/* 完了したTODO */}
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
