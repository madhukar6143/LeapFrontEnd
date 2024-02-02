import React from "react"
import "./Todo.css";
import PendingTask from "./PendingTask";
import CompletedTask from "./CompletedTask";
function DisplayItems() {

    return (
        <>        
        <PendingTask/>
        <CompletedTask />
        </>

    )
}

export default DisplayItems
