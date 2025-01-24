import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "./Card";
import { describe, it, expect, beforeEach } from "vitest";

// Очистка localStorage перед каждым тестом
beforeEach(() => {
  localStorage.clear();
});

describe("Card Component", () => {
  it("должен рендерить компонент без ошибок", () => {
    render(<Card />);
    expect(screen.getByText("Mindbox Todos")).toBeInTheDocument();
  });

  it("должен добавлять новую задачу", () => {
    render(<Card />);
    
    const input = screen.getByPlaceholderText("Add todo");
    const form = input.closest("form")!;

    fireEvent.change(input, { target: { value: "Test Task" } });
    fireEvent.submit(form);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("не должен добавлять пустую задачу", () => {
    render(<Card />);
    
    const input = screen.getByPlaceholderText("Add todo");
    const form = input.closest("form")!;
    
    // Пытаемся добавить пустую задачу
    fireEvent.submit(form);
  
    // Проверяем, что задача не добавилась (проверка по тестовому id контейнера)
    const todoList = screen.getByTestId("todo-list");
    expect(todoList.childElementCount).toBe(0);
  });
  

  it("должен загружать задачи из localStorage", () => {
    localStorage.setItem("todos", JSON.stringify([{ id: 1, text: "Stored Task" }]));
    render(<Card />);
    expect(screen.getByText("Stored Task")).toBeInTheDocument();
  });

  it("должен сохранять задачу в localStorage", () => {
    render(<Card />);
    
    const input = screen.getByPlaceholderText("Add todo");
    fireEvent.change(input, { target: { value: "Persistent Task" } });
    fireEvent.submit(input.closest("form")!);

    expect(localStorage.getItem("todos")).toContain("Persistent Task");
  });

  it("не должен отображать завершенные задачи при фильтрации 'Active'", () => {
    render(<Card />);
    
    const input = screen.getByPlaceholderText("Add todo");
    fireEvent.change(input, { target: { value: "Completed Task" } });
    fireEvent.submit(input.closest("form")!);
  
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByText("Active"));
  
    expect(screen.queryByText("Completed Task")).not.toBeInTheDocument();
  });

  it("должен переключать задачу в состояние выполнено", () => {
    render(<Card />);
    
    const input = screen.getByPlaceholderText("Add todo");
    fireEvent.change(input, { target: { value: "Complete Task" } });
    fireEvent.submit(input.closest("form")!);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it("клик по кнопке 'Clear completed' вызывает обработчик", () => {
    render(<Card />);
    const clearButton = screen.getByText("Clear completed");
    fireEvent.click(clearButton);
    expect(localStorage.getItem("completed")).toBe("[]");
  });

  it("должен фильтровать только активные задачи", () => {
    render(<Card />);
    
    const input = screen.getByPlaceholderText("Add todo");
    fireEvent.change(input, { target: { value: "Active Task" } });
    fireEvent.submit(input.closest("form")!);

    fireEvent.click(screen.getByText("Active"));

    expect(screen.getByText("Active Task")).toBeInTheDocument();
  });

  it("должен фильтровать только завершенные задачи", () => {
    render(<Card />);
    
    const input = screen.getByPlaceholderText("Add todo");
    fireEvent.change(input, { target: { value: "Completed Task" } });
    fireEvent.submit(input.closest("form")!);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    fireEvent.click(screen.getByText("Completed"));

    expect(screen.getByText("Completed Task")).toBeInTheDocument();
  });

  it("должен очищать выполненные задачи", () => {
    render(<Card />);

    const input = screen.getByPlaceholderText("Add todo");
    fireEvent.change(input, { target: { value: "Task to clear" } });
    fireEvent.submit(input.closest("form")!);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    fireEvent.click(screen.getByText("Clear completed"));

    expect(screen.queryByText("Task to clear")).not.toBeInTheDocument();
  });

  it("должен отображать правильное количество активных задач", () => {
    render(<Card />);

    const input = screen.getByPlaceholderText("Add todo");
    fireEvent.change(input, { target: { value: "Task 1" } });
    fireEvent.submit(input.closest("form")!);

    fireEvent.change(input, { target: { value: "Task 2" } });
    fireEvent.submit(input.closest("form")!);

    expect(screen.getByText("2 items left")).toBeInTheDocument();
  });

  it("должен отображать правильный текст для одной задачи", () => {
    render(<Card />);

    const input = screen.getByPlaceholderText("Add todo");
    fireEvent.change(input, { target: { value: "Single Task" } });
    fireEvent.submit(input.closest("form")!);

    expect(screen.getByText("1 item left")).toBeInTheDocument();
  });
});
