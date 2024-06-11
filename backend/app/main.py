from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from .database import SessionLocal, engine, Base
from .models import Stack
from .schemas import StackCreate, StackRead

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
