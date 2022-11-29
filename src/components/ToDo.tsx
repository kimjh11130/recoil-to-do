import { useSetRecoilState } from "recoil";
import styled from "styled-components";
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

  const onDelete = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id)
      return[
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ]
    })
  }
  return (
    <ToDoList>
      <ToDoText>{text.length > 13 ? `${text.slice(0, 9)}...` : text }</ToDoText>
        {category !== Catgories.DOING && (
          <Button onClick={() => onClick(Catgories.DOING)}>Doing</Button>
        )}
        {category !== Catgories.TO_DO && (
          <Button onClick={() => onClick(Catgories.TO_DO)}>To Do</Button>
        )}
        {category !== Catgories.DONE && (
          <Button onClick={() => onClick(Catgories.DONE)}>Done</Button>
        )}
        <Button onClick={onDelete}>delete</Button>
    </ToDoList>
  );
}

export default ToDo;

const ToDoList = styled.li`
  width: 380px;
  margin-top: 10px;
`;

const ToDoText = styled.span`
  font-size: 17px;
  margin-right: 20px;
`;

const Button = styled.button`
  width: 70px;
  height: 25px;
  margin: 0px 5px;
  border-color: white;
  border-radius: 5px;
  background-color: ${(prop) => prop.theme.bgColor};
  color: ${(prop) => prop.theme.textColor};
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: white;
    border-color: ${(prop) => prop.theme.bgColor};
    color: black;
  }
`;



// 1. todo를 만들때마다 그 항목을 로컬에 저장시킨다.
// 2: todo를 delete할때도 저장시킨다.
// 3. R