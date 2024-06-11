from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.models import Stack
from app.schemas import StackCreate, StackRead
from typing import List

app = FastAPI()

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/api/stacks", response_model=StackRead)
def create_stack(stack: StackCreate, db: Session = Depends(get_db)):
    db_stack = Stack(name=stack.name, description=stack.description)
    db.add(db_stack)
    db.commit()
    db.refresh(db_stack)
    return db_stack

@app.get("/api/stacks", response_model=List[StackRead])
def read_stacks(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    stacks = db.query(Stack).offset(skip).limit(limit).all()
    return stacks
