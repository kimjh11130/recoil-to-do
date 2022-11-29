import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, Catgories, toDoSelector } from "./atoms";
import CreateToDo from "./components/CreateToDo";
import ToDo from "./components/ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <Wrapper>
      <Title>To Dos</Title>
      <Horizon />
      <Select value={category} onInput={onInput}>
        <Select as="option" value={Catgories.TO_DO}>
          To Do
        </Select>
        <Select as="option" value={Catgories.DOING}>
          Doing
        </Select>
        <Select as="option" value={Catgories.DONE}>
          Done
        </Select>
      </Select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Wrapper>
  );
}

export default ToDoList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 900px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 40px;
  font-weight: 700;
`;

const Horizon = styled.hr`
  width: 100vw;
`;

const Select = styled.select`
  background-color: ${(props) => props.theme.bgColor};
  border: 2px solid white;
  color: ${(props) => props.theme.textColor};
  font-size: 15px;
  margin: 10px;
`;
