import React, { useState, useEffect } from 'react'
import { RiCheckboxCircleFill } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios';
import "./Todo.css";
import "./TodoForm.css"
import "./TodoList.css"

function CompletedTask() {

    let [completedTodo, setCompletedTodo] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const handleClick = (id) => {
        setSelectedId(id);
    };


    const handleClickBack = (id) => {
        setSelectedId(null);
    };


    useEffect(() => {
        fetchData()
    }, [completedTodo]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/tasks/completed");
            setCompletedTodo(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const removeTodo = async (id, text) => {
        await axios.delete(`http://localhost:8080/api/v1/tasks/${id}`);
        alert(`${text} deleted successfully`);
        // Fetch data again after deleting a todo
    };


    return (
        <>
            <div className='main-container'>
                {completedTodo.length > 0 && (
                    <div className="todo-list">
                        <h6>Completed Tasks</h6>
                        <hr />
                    </div>
                )}
                <div>
                    {completedTodo.length > 0 &&
                        completedTodo.map((todo, index) => (
                            <div className="todo-completed row" key={index}>
                                <div className="todo-list-item col-10">
                                    <div className="todo-mark-icon">
                                        <RiCheckboxCircleFill />
                                    </div>

                                    <div className="todo-item">
                                        {/* Task */}
                                        <p className="task">{todo.text}</p>
                                        {/* Description */}
                                    </div>
                                </div>
                                <div className="todo-icons col-2">
                                    <MdDeleteOutline
                                        onClick={() => removeTodo(todo.id, todo.text)}
                                        className="delete-icon"
                                    />
                                    {selectedId !== todo.id && 
                                     <button onClick={() => handleClick(todo.id)}>V</button>
                                    }
                                    {selectedId === todo.id && 
                                     <button onClick={() => handleClickBack(todo.id)}>X</button>
                                    }
                                     </div>
                                {selectedId === todo.id && (
                                    <div className='col-12 text-center p-3'>description :{todo.description}</div>
                                )}

                            </div>

                        ))}
                </div>
            </div>
        </>
    )
}

export default CompletedTask
