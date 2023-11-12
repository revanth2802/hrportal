
from flask_restful import Resource, reqparse
from models.salary import Salary
from models.base import Session
from .utils import paginate_query
from models.employee import Employee
from sqlalchemy import or_, cast, String, and_
from flask import request
from sqlalchemy.exc import IntegrityError

class SalariesResource(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('emp_no', type=int, location='args', help="Employee number is required")
    parser.add_argument('page', type=int, location='args', default=1, help="Page number")
    parser.add_argument('per_page', type=int, location='args', default=10, help="Number of items per page")
    parser.add_argument('search_term', type=str, location='args', default="", help="Search term for employee name or number")

    def get(self, emp_no=None, from_date=None):
        session = Session()
        
        print("Received request with emp_no:", emp_no, "and from_date:", from_date)
        
        try:
            args = self.parser.parse_args()
            print("Parsed arguments:", args)

            query = session.query(Salary)

            if emp_no:
                query = query.filter_by(emp_no=emp_no)
            if from_date:
                query = query.filter_by(from_date=from_date)
                
            search_term = args["search_term"]
            if search_term:
                query = query.join(Employee).filter(
                    or_(
                        Employee.first_name.ilike(f"%{search_term}%"),
                        Employee.last_name.ilike(f"%{search_term}%"),
                        cast(Employee.emp_no, String) == search_term
                    )
                )

            salaries, pagination_details = paginate_query(query, args['page'], args['per_page'])
            
            if not salaries:
                return {
                    "data": [],
                    "pagination": pagination_details
                }

            return {
                "data": [{'emp_no': sal.emp_no, 'salary': sal.salary, 'from_date': str(sal.from_date), 'to_date': str(sal.to_date)} for sal in salaries],
                "pagination": pagination_details
            }

        except IntegrityError as ie:
            print(ie)  # Log the error for debugging
            return {"error": "A database integrity constraint was violated."}, 500
        except Exception as e:
            print(e)  # Log the error for debugging
            return {"error": "An internal error occurred."}, 500
        finally:
            session.close()
    
    
    def post(self):
        session = Session()

        data = request.json

        salary = Salary(
            emp_no=data['emp_no'],
            salary=data['salary'],
            from_date=data['from_date'],
            to_date=data['to_date']
        )
        try:
            session.add(salary)
            session.commit()
            return {"message": "Salary added successfully."}, 201
        except Exception as e:
            print(e)  # Log the error for debugging
            session.rollback()
            return {"error": "An internal error occurred."}, 500
        finally:
            session.close()


    def put(self, emp_no):
        session = Session()

        data = request.json

        salary = session.query(Salary).filter_by(emp_no=emp_no).first()
        if salary:
            salary.salary = data['salary']
            salary.from_date = data['from_date']
            salary.to_date = data['to_date']
            try:
                session.commit()
                return {"message": "Salary updated successfully."}
            except Exception as e:
                print(e)  # Log the error for debugging
                session.rollback()
                return {"error": "An internal error occurred."}, 500
            finally:
                session.close()
        return {"message": "Salary not found for the provided employee number."}, 404


    def delete(self, emp_no):
        session = Session()
        salary = session.query(Salary).filter_by(emp_no=emp_no).first()
        if salary:
            try:
                session.delete(salary)
                session.commit()
                return {"message": "Salary deleted successfully."}
            except Exception as e:
                print(e)  # Log the error for debugging
                session.rollback()
                return {"error": "An internal error occurred."}, 500
            finally:
                session.close()
        return {"message": "Salary not found for the provided employee number."}, 404
