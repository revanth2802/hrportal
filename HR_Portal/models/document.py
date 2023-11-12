from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from .base import Base

class Document(Base):
    __tablename__ = 'documents'

    document_id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    upload_date = Column(DateTime)
    file_path = Column(String(255), nullable=False)
    uploaded_by = Column(Integer, ForeignKey('employees.emp_no'))

    # Assuming you want to reference the employee who uploaded the document
    employee = relationship("Employee", backref="documents")

    def to_dict(self):
        return {
            'document_id': self.document_id,
            'title': self.title,
            'description': self.description,
            'upload_date': self.upload_date.isoformat() if self.upload_date else None,
            'file_path': self.file_path,
            'uploaded_by': self.uploaded_by
        }

    def __repr__(self):
        return f'<Document {self.title}>'
