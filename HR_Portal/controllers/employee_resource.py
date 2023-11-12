
from flask_restful import Resource, reqparse
from models.base import Session
from .utils import paginate_query
from sqlalchemy import or_
from flask import request, jsonify
from models.employee import Employee
from models.department_manager import DepartmentManager
from models.department_employee import DepartmentEmployee
from flask import current_app as app
from datetime import datetime
#from auth_middleware import check_jwt

def positive_int(value):
    if value == '':
        return 1
    try:
        int_value = int(value)
        if int_value < 1:
            raise ValueError
        return int_value
    except ValueError:
        raise ValueError("The 'page' parameter must be a positive integer.")

class EmployeeResource(Resource):
    #method_decorators = [check_jwt]  # This applies the check_jwt decorator to all HTTP methods.

    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('emp_no', type=int, location='args', help="Employee number is required")
    parser.add_argument('page', type=positive_int, location='args', default=1, help="Page number")
    parser.add_argument('per_page', type=int, location='args', default=10, help="Number of items per page")
    parser.add_argument('search_term', type=str, location='args', default='', help="Search term for employees")

    # def get(self, emp_no=None):
    #     with Session() as session:  # Use context manager for handling the session
    #         manager = None
    #         try:
    #             args = self.parser.parse_args()
    #             query = session.query(Employee)
                
    #             if emp_no:
    #                 query = query.filter_by(emp_no=emp_no)
    #                 manager = self.get_manager(emp_no, session)

    #             if args['search_term']:
    #                 search = f"%{args['search_term']}%"
    #                 query = query.filter(or_(
    #                     Employee.first_name.ilike(search),
    #                     Employee.last_name.ilike(search)
    #                 ))

    #             employees, pagination_details = paginate_query(query, args['page'], args['per_page'])
                
    #             # Use jsonify to ensure the response is serialized to JSON properly
    #             return jsonify({
    #                 "data": [emp.to_dict() for emp in employees],
    #                 "pagination": pagination_details,
    #                 "manager": manager
    #             })
                
    #         except Exception as e:
    #             app.logger.error("Error in EmployeeResource GET: %s", e, exc_info=True)
    #             # Use jsonify for error as well
    #             return jsonify({"error": str(e)}), 500
    
    def get(self, emp_no=None):
        with Session() as session:  # Use context manager for handling the session
            manager = None
            try:
                args = self.parser.parse_args()
                query = session.query(Employee)
                
                if emp_no:
                    query = query.filter_by(emp_no=emp_no)
                    manager = self.get_manager(emp_no, session)

                if args['search_term']:
                    search = f"%{args['search_term']}%"
                    query = query.filter(or_(
                        Employee.first_name.ilike(search),
                        Employee.last_name.ilike(search)
                    ))

                # Handling the new 'hired_after' query parameter
                hired_after = request.args.get('hired_after')
                if hired_after:
                    try:
                        hired_after_date = datetime.strptime(hired_after, '%Y-%m-%d').date()
                        query = query.filter(Employee.hire_date > hired_after_date)
                    except ValueError:
                        return jsonify({"error": "Invalid date format. Please use YYYY-MM-DD."}), 400

                employees, pagination_details = paginate_query(query, args['page'], args['per_page'])
                
                return jsonify({
                    "data": [emp.to_dict() for emp in employees],
                    "pagination": pagination_details,
                    "manager": manager
                })
                
            except Exception as e:
                app.logger.error("Error in EmployeeResource GET: %s", e, exc_info=True)
                return jsonify({"error": str(e)}), 500

    def get_manager(self, emp_no, session):
        manager_query = session.query(Employee).join(DepartmentManager, Employee.emp_no == DepartmentManager.emp_no).\
                        join(DepartmentEmployee, DepartmentManager.dept_no == DepartmentEmployee.dept_no).\
                        filter(DepartmentEmployee.emp_no == emp_no, DepartmentManager.to_date == '9999-01-01').\
                        first()
        if manager_query:
            return {
                "emp_no": manager_query.emp_no,
                "first_name": manager_query.first_name,
                "last_name": manager_query.last_name
            }
        return None

    def post(self):
        with Session() as session:
            data = request.get_json()
            new_employee = Employee(
                emp_no=data.get('emp_no'),
                birth_date=data.get('birth_date'),
                first_name=data.get('first_name'),
                last_name=data.get('last_name'),
                gender=data.get('gender'),
                hire_date=data.get('hire_date')
            )
            try:
                session.add(new_employee)
                session.commit()
                return {"message": "Employee created successfully."}, 201
            except Exception as e:
                session.rollback()
                app.logger.error("Error in EmployeeResource POST: %s", e, exc_info=True)
                return {"error": str(e)}, 500

    def put(self, emp_no):
        with Session() as session:
            data = request.get_json()
            employee = session.query(Employee).filter_by(emp_no=emp_no).first()
            if employee:
                employee.birth_date = data.get('birth_date', employee.birth_date)
                employee.first_name = data.get('first_name', employee.first_name)
                employee.last_name = data.get('last_name', employee.last_name)
                employee.gender = data.get('gender', employee.gender)
                employee.hire_date = data.get('hire_date', employee.hire_date)
                try:
                    session.commit()
                    return {"message": "Employee updated successfully."}
                except Exception as e:
                    session.rollback()
                    app.logger.error("Error in EmployeeResource PUT: %s", e, exc_info=True)
                    return {"error": str(e)}, 500
            else:
                return {"message": "Employee not found."}, 404

    def delete(self, emp_no):
        with Session() as session:
            employee = session.query(Employee).filter_by(emp_no=emp_no).first()
            if employee:
                try:
                    session.delete(employee)
                    session.commit()
                    return {"message": "Employee deleted successfully."}
                except Exception as e:
                    session.rollback()
                    app.logger.error("Error in EmployeeResource DELETE: %s", e, exc_info=True)
                    return {"error": str(e)}, 500
            else:
                return {"message": "Employee not found."}, 404