import React, { Component } from 'react'
import "./TodoApp.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        if(input.trim() === "")  {
            this.notify("please enter task",'warning');
            return
        }

        this.setState({
            items:[...this.state.items,input],
            input: "",
            editingIndex: null,
            editingInput: "",
            deletingIndex:null,

        })
        this.notify("task created",'success')
    };

    deleteItem = key => {
        this.setState({
            items: this.state.items.filter(( _,index) => key !==index)
        })
        this.notify('removed task', 'error')
    };

    editItem = index => {
        this.setState({
            editingIndex: index,
            editingInput: this.state.items[index]
        })
    }

    deleteItemtoggle = index => {
        this.setState({
            deletingIndex: index,
        })
    }

    handleEditChange = event => {
        this.setState({
            editingInput: event.target.value
        })
    }

    saveEdit = index => {
        const { items, editingInput } = this.state
        if(editingInput.trim() === "")  {
            this.notify("please enter task",'warning');
            return;
        };
        const allItems = [...items];
        allItems[index] = editingInput; 
        this.setState({
            items: allItems,
            editingIndex: null,
            editingInput: ""
        })
        this.notify('task edited','success')
        
    };

    cancelEdit = () => {
        this.setState({
            editingIndex: null,
            editingInput: ""
        })
    };
    canceldelete = () => {
        this.setState({
            deletingIndex: null,
        })
    };
    
    
    notify = (text,type) => {toast[type](text, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });}
    


  render() {
    const { input, items, editingIndex, editingInput, deletingIndex } = this.state;

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
                ) : deletingIndex === index ?  (
                    <div className='input-section'>
                        <p>Are you sure?</p>
                        <button onClick={() => this.deleteItem(index)}>Confirm</button>
                        <button onClick={this.canceldelete}>Cancel</button>
                    </div>
                ) : (
                    <>
                        {data}
                        <div className="icons">
                            <i className="fa-solid fa-pencil"
                            onClick={() => this.editItem(index)}
                            ></i>
                            <i className="fas fa-trash-alt"
                            onClick={() => this.deleteItemtoggle(index)}
                            ></i>
                        </div>
                    </>
                )}
            </li>
          ))}
        </ul>
        <ToastContainer />
      </div>
    );
  }
}
