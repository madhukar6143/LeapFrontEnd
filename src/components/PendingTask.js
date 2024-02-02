import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";
import "./Todo.css";
import "./TodoForm.css"
import "./TodoList.css"
import { useForm } from 'react-hook-form';

function PendingTask() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();


    let [pendingTodo, setTodos] = useState([])
    let [edit, setEdit] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    const handleClick = (id) => {
        setSelectedId(id);
    };


    const handleClickBack = (id) => {
        setSelectedId(null);
    };


    const updateTodo = async (todoId, newValue) => {
        if (!newValue) return;
        setEdit(todoId)
        const obj = {
            id: todoId
        };
        await axios.put(`http://localhost:8080/api/v1/tasks/${todoId}`, obj);
        // Fetch data again after updating a todo

    };

    const onSubmit = async (todo, data) => {
        try {
            todo.text = data.text
            console.log(todo, "xdjx")
            await axios.put(`http://localhost:8080/api/v1/tasks/${todo.id}`, todo);
            setEdit(null)
            reset();
        }
        catch (err) {
            console.log(err.message)
        }
    }

    const completeTodo = async (todo) => {
        todo.completed = true
        await axios.put(`http://localhost:8080/api/v1/tasks/${todo.id}`, todo);
        // Fetch data again after completing a todo

    };

    useEffect(() => {
        fetchData()
    }, [pendingTodo]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/tasks/incomplete");
            setTodos(response.data);
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
        <div className="  main-container todo-list">
            {pendingTodo.length > 0 ? (
                pendingTodo.map((todo, index) => (
                    <div className="todo-pending row" key={index}>
                        <div className="todo-list-item col-7">
                            <div className="todo-mark-icon">
                                <RiCheckboxBlankCircleLine onClick={() => completeTodo(todo)} />
                            </div>
                            <div className="todo-item">

                                {edit === todo.id ? (
                                    <form onSubmit={handleSubmit((data) => onSubmit(todo, data))}>
                                        <input
                                            type="text"
                                            defaultValue={todo.text}
                                            {...register("text", { required: "This field is required", })}
                                        />
                                    </form>
                                ) : (
                                    <p> {todo.text} </p>
                                )}
                            </div>
                        </div>
                        <div className="todo-icons col-3">
                            <p ><span className='text-danger'> Date: </span>{todo.dueDate}</p>
                            </div>
                            <div className="todo-icons col-2">
                            <MdModeEditOutline
                                onClick={() => updateTodo(todo.id, todo.text)}
                                className="edit-icon"
                            />
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
                ))
            ) : (
                <p className="text-center">Todolist is empty</p>
            )}

        </div>
    )
}

export default PendingTask
