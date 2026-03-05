from statistics import mean

def calculate_productivity(tasks):
    
    completed_task = [t for t in tasks if t.completed]

    if not completed_task:
        return {
            "productivity_score": 0,
            "average_focus": 0,
            "time_accuracy": 0,
            "burnout_risk": "Unknown"
        }
    
    focus_values = [t.focus_rating for t in completed_task if t.focus_rating]

    avg_focus = mean(focus_values)

    accuracies = []

    for t in completed_task:
        if t.planned_duration and t.actual_duration:
            acc = t.planned_duration / t.actual_duration
            accuracies.append(acc)

    avg_accuracy = mean(accuracies) if accuracies else 0

    completion_rate = len(completed_task) / len(tasks)

    productivity_score = (
        avg_focus * 4 +
        completion_rate * 30 +
        avg_accuracy * 30
    )

    burnout_risk = "Low"

    if avg_focus < 4 or avg_accuracy < 0.5:
        burnout_risk = "High"

    return {
        "productivity_score": round(productivity_score, 2),
        "average_focus": round(avg_focus, 2),
        "time_accuracy": round(avg_accuracy * 100, 2),
        "burnout_risk": burnout_risk
    }