from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str


class TaskCreate(BaseModel):
    title: str
    planned_duration: int
    user_id: int


class StartTask(BaseModel):
    task_id: int


class CompleteTask(BaseModel):
    task_id: int
    focus_rating: int