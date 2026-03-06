import requests

OLLAMA_URL = "http://localhost:11434/api/generate"

def generate_ai_insights(metrics):

    prompt = f"""
You are an AI productivity coach.

Here are the user's productivity metrics:

Productivity Score: {metrics['productivity_score']}
Average Focus: {metrics['average_focus']}
Time Accuracy: {metrics['time_accuracy']}%
Burnout Risk: {metrics['burnout_risk']}

Give:
1. Short analysis of productivity
2. 2-3 improvement suggestions
3. One actionable habit

Respond in plain text.
"""
    
    payload = {
        "model": "mistral",
        "prompt": prompt,
        "stream": False
    }

    response = requests.post(OLLAMA_URL, json=payload)

    result = response.json()

    return result['response']

