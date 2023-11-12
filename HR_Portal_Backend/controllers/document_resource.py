# from flask_restful import Resource, reqparse
# from models.base import Session
# from .utils import paginate_query
# from flask import request, jsonify
# from models.document import Document
# from flask import current_app as app
# from werkzeug.utils import secure_filename
# import boto3
# import os

# # AWS S3 Setup
# s3_client = boto3.client('s3')
# BUCKET_NAME = 'courseproject-documents'

# class DocumentResource(Resource):
#     parser = reqparse.RequestParser(bundle_errors=True)
#     parser.add_argument('document_id', type=int, location='args', help="Document ID is required for specific operations")
#     parser.add_argument('page', type=int, location='args', default=1, help="Page number")
#     parser.add_argument('per_page', type=int, location='args', default=10, help="Number of items per page")
    
#     def upload_file(self):
#         file = request.files['file']
#         if file:
#             filename = secure_filename(file.filename)
#             s3_client.upload_fileobj(file, BUCKET_NAME, filename)
#             file_url = f'https://{BUCKET_NAME}.s3.amazonaws.com/{filename}'
#             return file_url

#     def download_file(self, file_path):
#         url = s3_client.generate_presigned_url('get_object', Params={'Bucket': BUCKET_NAME, 'Key': file_path}, ExpiresIn=3600)
#         return url

#     def get(self, document_id=None):
#         with Session() as session:
#             try:
#                 args = self.parser.parse_args()
#                 query = session.query(Document)
                
#                 if document_id:
#                     document = query.filter_by(document_id=document_id).first()
#                     if document:
#                         file_url = self.download_file(document.file_path)
#                         return jsonify({"file_url": file_url, "document": document.to_dict()})
#                     else:
#                         return jsonify({"message": "Document not found."}), 404

#                 documents, pagination_details = paginate_query(query, args['page'], args['per_page'])
#                 return jsonify({
#                     "data": [doc.to_dict() for doc in documents],
#                     "pagination": pagination_details
#                 })

#             except Exception as e:
#                 app.logger.error("Error in DocumentResource GET: %s", e, exc_info=True)
#                 return jsonify({"error": str(e)}), 500

#     def post(self):
#         with Session() as session:
#             file_url = self.upload_file()
#             data = request.get_json()
#             new_document = Document(
#                 title=data.get('title'),
#                 description=data.get('description'),
#                 file_path=file_url,  # Use the uploaded file's URL
#                 uploaded_by=data.get('uploaded_by')
#             )
#             try:
#                 session.add(new_document)
#                 session.commit()
#                 return {"message": "Document created successfully."}, 201
#             except Exception as e:
#                 session.rollback()
#                 app.logger.error("Error in DocumentResource POST: %s", e, exc_info=True)
#                 return {"error": str(e)}, 500

from flask import request, jsonify
from flask_restful import Resource
from werkzeug.utils import secure_filename
import boto3
from models.document import Document
from models.base import Session
import os

# AWS S3 Setup
s3_client = boto3.client('s3')
BUCKET_NAME = 'courseproject-documents'

class DocumentResource(Resource):
    def upload_file(self, file, filename):
        s3_client.upload_fileobj(file, BUCKET_NAME, filename)
        file_url = f'https://{BUCKET_NAME}.s3.amazonaws.com/{filename}'
        return file_url

    def download_file(self, file_path):
        url = s3_client.generate_presigned_url('get_object', Params={'Bucket': BUCKET_NAME, 'Key': file_path}, ExpiresIn=3600)
        return url

    def get(self, document_id=None):
        with Session() as session:
            query = session.query(Document)
            
            if document_id:
                document = query.filter_by(document_id=document_id).first()
                if document:
                    file_url = self.download_file(document.file_path)
                    return jsonify({"file_url": file_url, "document": document.to_dict()})
                else:
                    return jsonify({"message": "Document not found."}), 404

            documents = query.all()
            return jsonify({"data": [doc.to_dict() for doc in documents]})

    def post(self):
        print(request.form)  # Add this to log form data
        print(request.files)
        if 'file' not in request.files:
            return {"message": "No file part"}, 400
        file = request.files['file']
        if file.filename == '':
            return {"message": "No selected file"}, 400
        if file:
            filename = secure_filename(file.filename)
            file_url = self.upload_file(file, filename)
            title = request.form['title']
            description = request.form['description']
            uploaded_by = request.form['uploaded_by']

            new_document = Document(
                title=title,
                description=description,
                file_path=file_url,
                uploaded_by=uploaded_by
            )

            with Session() as session:
                try:
                    session.add(new_document)
                    session.commit()
                    return {"message": "Document created successfully."}, 201
                except Exception as e:
                    session.rollback()
                    return {"error": str(e)}, 500
        else:
            return {"message": "File upload failed"}, 500   
    def put(self, document_id):
        with Session() as session:
            data = request.get_json()
            document = session.query(Document).filter_by(document_id=document_id).first()
            if document:
                document.title = data.get('title', document.title)
                document.description = data.get('description', document.description)
                # Update other fields as necessary
                try:
                    session.commit()
                    return {"message": "Document updated successfully."}
                except Exception as e:
                    session.rollback()
                    app.logger.error("Error in DocumentResource PUT: %s", e, exc_info=True)
                    return {"error": str(e)}, 500
            else:
                return {"message": "Document not found."}, 404

    def delete(self, document_id):
        with Session() as session:
            document = session.query(Document).filter_by(document_id=document_id).first()
            if document:
                try:
                    session.delete(document)
                    session.commit()
                    return {"message": "Document deleted successfully."}
                except Exception as e:
                    session.rollback()
                    app.logger.error("Error in DocumentResource DELETE: %s", e, exc_info=True)
                    return {"error": str(e)}, 500
            else:
                return {"message": "Document not found."}, 404


