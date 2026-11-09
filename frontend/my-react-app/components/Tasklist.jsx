import tasks from '../tasks';
function Tasklist() {
    return (
        <div >
            <h1>Task List</h1>
            <h2>Completed Tasks: </h2>
            <ul>
                {tasks.filter(task => task.completed).map(task => (
                    <li key={task._id}>{task.title} </li>
                ))}
            </ul>
            <h2>Pending Tasks: </h2>
            <ul>
                {tasks.filter(task => !task.completed).map(task => (
                    <li key={task._id}>{task.title} - Due: {task.dueDate}</li>
                ))}
            </ul>



        </div>

    );
}

export default Tasklist;