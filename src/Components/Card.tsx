import { useEffect, useState } from "react";
import {
  Header,
  Input,
  Todo,
  TodoElement,
  PageStack,
  Page,
  TodoContainer,
  BottomBar,
  ActionsList,
  StyledCheckbox,
  TodoListContainer,
  ListItem,
  InputWrapper,
  Divider
} from "./Card.styles";

interface Todo {
  id: number;
  text: string;
}

function Card() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completed, setCompleted] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    const storedCompleted = localStorage.getItem("completed");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    if (storedCompleted) {
      setCompleted(JSON.parse(storedCompleted));
    }
  }, []);

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("todo") as HTMLInputElement;

    if (input && input.value.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: input.value.trim(),
      };
      const newTodos = [...todos, newTodo];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      setTodos(newTodos);
      input.value = "";
    }
  };

  const handleCompleteTodo = (todo: Todo) => {
    const newCompleted = completed.includes(todo)
      ? completed.filter((item) => item.id !== todo.id)
      : [...completed, todo];
    localStorage.setItem("completed", JSON.stringify(newCompleted));
    localStorage.setItem(
      "todos",
      JSON.stringify(todos.filter((item) => item.id !== todo.id))
    );
    setCompleted(newCompleted);
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !completed.includes(todo)));
    setCompleted([]);
    localStorage.setItem("completed", JSON.stringify([]));
    localStorage.setItem("todos", JSON.stringify(todos.filter((todo) => !completed.includes(todo))));
  
  };

  const allTodos = [
    ...todos,
    ...completed.filter((todo) => !todos.some((item) => item.id === todo.id)),
  ];

  const screenConfig: { [key: string]: Todo[] } = {
    all: allTodos,
    active: todos.filter((todo) => !completed.includes(todo)),
    completed,
  };

  const activeCount = screenConfig.active.length;

  return (
    <>
      <Header>
        Mindbox Todos
      </Header>

      <TodoContainer>
        <form onSubmit={addTodo}>
          <InputWrapper>
             <Input type="text" placeholder="Add todo" name="todo"/>
          </InputWrapper>
        </form>
          <Divider/>
        <TodoListContainer data-testid="todo-list">
          {screenConfig[filter].map((todo) => (
            <div key={todo.id}>
              <TodoElement>
                <StyledCheckbox
                  type="checkbox"
                  checked={completed.some((item) => item.id === todo.id)}
                  onChange={() => handleCompleteTodo(todo)}
                />
                <Todo
                  $completed={completed.some((item) => item.id === todo.id)}
                >
                  {todo.text}
                </Todo>
              </TodoElement>
              <Divider/>
            </div>
          ))}
        </TodoListContainer>
    
        <BottomBar>      
          <div>
            {activeCount} {activeCount === 1 ? "item" : "items"} left
          </div>
          <ActionsList>
            <ListItem
              $active={filter === "all"}
              onClick={() => setFilter("all")}
            >
              All
            </ListItem>

            <ListItem
              $active={filter === "active"}
              onClick={() => setFilter("active")}
            >
              Active
            </ListItem>

            <ListItem
              $active={filter === "completed"}
              onClick={() => setFilter("completed")}
            >
              Completed
            </ListItem>
          </ActionsList>
          <div onClick={() => handleClearCompleted()} style={{ cursor: "pointer" }}>Clear completed</div>
        </BottomBar>
      </TodoContainer>
      <PageStack index={activeCount}>
        {screenConfig.all.map((todo, index) => (
          <Page
            key={todo.id}
            index={index}
            total={screenConfig.active.length}
          ></Page>
        ))}
      </PageStack>
    </>
  );
}

export default Card;
