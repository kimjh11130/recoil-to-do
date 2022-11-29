import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  const { register, handleSubmit, setValue } = useForm<IForm>();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <AddButton>Add</AddButton>
    </form>
  );
}

export default CreateToDo;

const Input = styled.input`
  padding: 10px;
  width: 300px;
  height: 30px;
  border-radius: 15px;
`;

const AddButton = styled.button`
  width: 70px;
  height: 25px;
  margin: 0px 7px;
  border-color: white;
  border-radius: 5px;
  background-color: ${(prop) => prop.theme.bgColor};
  color: ${(prop) => prop.theme.textColor};
  transition: background-color 0.3s ease-in-out;
  &:hover{
    background-color: white;
    border-color: ${(prop) => prop.theme.bgColor};
    color: black;
  }
  &:active{
    background-color: black;
    color: white;
  }
`

/*

const { persistAtom } = recoilPersist({
key: 'todoLocal',
storage: localStorage,
});

export const toDoState = atom({
key: 'todos',
default: [],
effects_UNSTABLE: [persistAtom],
});

effects_UNSTABLE 추가밖에 없습니다.

persistAtom에는 getItem, mergeItem, setItem이 잡혀있습니다.

깊게 파지않고 그냥 구글링으로 한것이니 실험적인 기능이고, 문제점은 아직까지 잘모르겠네요 그냥 정상작동해서 남겨봅니다 !
*/