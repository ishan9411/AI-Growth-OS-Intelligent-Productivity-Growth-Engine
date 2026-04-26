
function History({tasks}){
    const completed_tasks = tasks.filter(task => task.completed);

    return(
        <div>
            {completed_tasks.length === 0 ? (
                <p style={{color: "grey", textAlign: "center"}}>No Completed Task</p>
            )
            : (
            completed_tasks.map((task) => (
                <div key={task.id} style={styles.card}>
                    <h3>{task.title}</h3>
                    <p>Planned: {task.planned_duration} mins |
                       Worked For: {task.actual_duration} mins |
                       Focus Rating: {task.focus_rating} 
                       </p>
                </div>
            ))
            )}
        </div>
    )
};

const styles = {
  card: {
    background: "white",
    padding: "15px",
    margin: "10px 0",
    borderRadius: "10px",
    boxShadow: "0px 2px 8px rgba(0,0,0,0.1)"
  }
};

export default History;