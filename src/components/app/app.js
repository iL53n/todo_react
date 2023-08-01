import { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import AddItem from "../add-item";

import "./app.css";

export default class App extends Component {
  maxId = 1;

  state = {
    todoData: [
      this.createTodoItem("Learn React"),
      this.createTodoItem("Build App"),
      this.createTodoItem("Drink coffee"),
    ],
    search: "",
    filter: "all",
  };

  createTodoItem(label) {
    return {
      id: this.maxId++,
      label: label,
      important: false,
      done: false,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  addItem = (label) => {
    this.setState(({ todoData }) => {
      const newItem = this.createTodoItem(label);
      const newArray = [...todoData, newItem];

      return {
        todoData: newArray,
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important"),
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done"),
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onSearchChange = (search) => {
    this.setState({ search });
  };

  searchItems(data, text) {
    if (text.length === 0) {
      return data;
    }
    return data.filter((item) =>
      item.label.toLowerCase().includes(text.toLowerCase())
    );
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  filterItems(data, filter) {
    switch (filter) {
      case "all":
        return data;
      case "active":
        return data.filter((item) => !item.done);
      case "done":
        return data.filter((item) => item.done);
      default:
        return data;
    }
  }

  render() {
    const { todoData, search, filter } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    const visibleItems = this.searchItems(
      this.filterItems(todoData, filter),
      search
    );

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter onFilterChange={this.onFilterChange} />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <AddItem onAdded={this.addItem} />
      </div>
    );
  }
}
