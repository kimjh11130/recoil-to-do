import { useSetRecoilState } from "recoil";
import { Catgories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (newCategory: IToDo["category"]) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory }; // replace toDo
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      {text}
      {category !== Catgories.DOING && (
        <button onClick={() => onClick(Catgories.DOING)}>Doing</button>
      )}
      {category !== Catgories.TO_DO && (
        <button onClick={() => onClick(Catgories.TO_DO)}>To Do</button>
      )}
      {category !== Catgories.DONE && (
        <button onClick={() => onClick(Catgories.DONE)}>Done</button>
      )}
    </li>
  );
}

export default ToDo;
