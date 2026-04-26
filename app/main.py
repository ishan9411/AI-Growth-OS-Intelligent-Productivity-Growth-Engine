from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from . import models, schemas, crud, analytics, ai_service
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.post("/tasks/start")
def start_task(data: schemas.StartTask, db: Session = Depends(get_db)):
    return crud.start_task(db, data.task_id)


@app.post("/tasks/complete")
def complete_task(data: schemas.CompleteTask, db: Session = Depends(get_db)):
    return crud.complete_task(db, data.task_id, data.focus_rating)

@app.get("/analytics/{user_id}")
def get_productivity(user_id: int, db: Session = Depends(get_db)):

    tasks = db.query(models.Task).filter(models.Task.user_id == user_id).all()
    return analytics.calculate_productivity(tasks)

@app.get("/ai-report/{user_id}")
def ai_report(user_id: int, db: Session = Depends(get_db)):

    tasks = db.query(models.Task).filter(models.Task.user_id == user_id).all()

    metrics = analytics.calculate_productivity(tasks)

    ai_text = ai_service.generate_ai_insights(metrics)

    metrics['ai_insights'] = ai_text

    return metrics