from pydantic import BaseModel

class StackBase(BaseModel):
    name: str
    description: str

class StackCreate(StackBase):
    pass

class StackRead(StackBase):
    id: int

    class Config:
        orm_mode = True
