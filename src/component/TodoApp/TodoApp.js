import React, { Component } from 'react'
import "./TodoApp.css";


export default class TodoApp extends Component {
    state = {
        input: "",
        items: []
    };

    handleChange = event => {
        this.setState({
            input: event.target.value
        });
    };

    storeItems = event => {
        event.preventDefault();
        const { input } = this.state;
        if(input === "")  return;

        this.setState({
            items:[...this.state.items,input],
            input: "",
            editingIndex: null,
            editingInput: ""

        })
    };

    deleteItem = key => {
        this.setState({
            items: this.state.items.filter(( _,index) => key !==index)
        })
    };

    editItem = index => {
        this.setState({
            editingIndex: index,
            editingInput: this.state.items[index]
        })
    }

    handleEditChange = event => {
        this.setState({
            editingInput: event.target.value
        })
    }

    saveEdit = index => {
        const { items, editingInput } = this.state
        if(editingInput === "")  return;
        const allItems = [...items];
        allItems[index] = editingInput; 
        this.setState({
            items: allItems,
            editingIndex: null,
            editingInput: ""
        })
    };

    cancelEdit = () => {
        this.setState({
            editingIndex: null,
            editingInput: ""
        })
    };


  render() {
    const { input, items, editingIndex, editingInput } = this.state;

    return (
      <div className="todo-container">
        <form className="input-section" onSubmit={this.storeItems}>
          <h1>Todo App</h1>
          <input
            type="text"
            value={input}
            onChange={this.handleChange}
            placeholder="Enter Tasks"
          />
          <button type='submit' >Add</button>
        </form>

        <ul>
          {items.map((data, index) => (
            <li key={index}>
                {editingIndex === index ? (
                    <div className='input-section'>
                        <input type="text"
                        value={editingInput}
                        onChange={this.handleEditChange}
                        />
                        <button onClick={() => this.saveEdit(index)}>Save</button>
                        <button onClick={this.cancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <>
                        {data}
                        <div className="icons">
                            <i className="fa-solid fa-pencil"
                            onClick={() => this.editItem(index)}
                            ></i>
                            <i className="fas fa-trash-alt"
                            onClick={() => this.deleteItem(index)}
                            ></i>
                        </div>
                    </>
                )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
