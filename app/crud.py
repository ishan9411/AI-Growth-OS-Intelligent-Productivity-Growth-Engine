from sqlalchemy.orm import Session
from . import models, schemas
from datetime import datetime, timezone

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(title=task.title, planned_duration=task.planned_duration, user_id=task.user_id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def get_tasks(db: Session):
    return db.query(models.Task).all()


def start_task(db, task_id):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if task:
        task.start_time = datetime.now(timezone.utc)
        db.commit()
        db.refresh(task)

    return task


def complete_task(db, task_id, focus_rating):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if task and task.start_time:
        task.end_time = datetime.now(timezone.utc)

        duration = task.end_time - task.start_time

        task.actual_duration = int(duration.total_seconds() / 60)

        task.focus_rating = focus_rating
        task.completed = True

        db.commit()
        db.refresh(task)

    return task