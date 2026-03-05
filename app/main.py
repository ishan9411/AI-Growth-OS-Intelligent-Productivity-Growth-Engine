from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from . import models, schemas, crud

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users/")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db, user)


@app.post("/tasks/")
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db, task)


@app.get("/tasks/")
def get_tasks(db: Session = Depends(get_db)):
    return crud.get_tasks(db)

@app.get("/users/")
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()


@app.put("/tasks/{task_id}/complete")
def complete_task(task_id: int, db: Session = Depends(get_db)):
    return crud.complete_task(db, task_id)

@app.post("/tasks/start")
def start_task(data: schemas.StartTask, db: Session = Depends(get_db)):
    return crud.start_task(db, data.task_id)


@app.post("/tasks/complete")
def complete_task(data: schemas.CompleteTask, db: Session = Depends(get_db)):
    return crud.complete_task(db, data.task_id, data.focus_rating)