import React from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineEditNote  } from "react-icons/md";
import axios from 'axios';

import { MdOutlineDescription } from "react-icons/md";

function Add() {
  
    

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data, e) => {
        e.preventDefault();
        console.log(data)
        const obj = {
            text: data.text,
            description: data.description,
            dueDate: data.dueDate,
            completed: false
        }
        await axios.post("http://localhost:8080/api/v1/tasks/", obj);
        
        reset();
    }

    return (
        <>
        <div className='main-container'>
            <form className=' border border-warning p-3' onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                    <div className="col-6 todo-input-form">
                        <MdOutlineEditNote size={35} />
                        <input type="text" placeholder="Add a todo" autoComplete='off' className="todo-input" {...register("text", { required: "This field is required", maxLength: { value: 25, message: "Length should be less than 25 chars" } })} />
                        {errors.text && <p className='text-danger'>{errors.text.message}</p>}
                    </div>
                    <div className="col-6 todo-input-form">
                        <input
                            type="date"
                            id="dueDate"
                            className="todo-input"
                            {...register("dueDate", { required: "This field is required", })}
                            min={new Date().toISOString().split("T")[0]}
                        />
                        {errors.dueDate && <p className='text-danger'>{errors.dueDate.message}</p>}
                    </div>

                </div>
                <div className="todo-input-form">
                    <MdOutlineDescription size={30} />
                    <input type="text" placeholder="Add description" autoComplete='off' className="todo-input" {...register("description", { required: "This field is required", minLength: { value: 5, message: "Description must be at least 5 chars" }, maxLength: { value: 100, message: "Description must be less than 100 chars" } })} />
                    {errors.description && <p className='text-danger'>{errors.description.message}</p>}
                </div>

                <input className='d-block  btn btn-outline-success mx-auto mt-3' type="submit" />
            </form>
            </div>
        </>
    );
}

export default Add;
