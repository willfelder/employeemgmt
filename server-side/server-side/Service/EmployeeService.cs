using Microsoft.EntityFrameworkCore;
using server_side.Data;
using server_side.Modals;

namespace server_side.Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly DataContext _dataContext;

        public EmployeeService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<Employee>> GetEmployees()
        {
            var employee = await _dataContext.Employees.ToListAsync();
            return employee;
        }

        public async Task<Employee> GetSingleEmployee(int id)
        {
            var employee = await _dataContext.Employees.FindAsync(id);

            if (employee is null)
                return null;

            return employee;
        }

        public async Task<List<Employee>> InsertEmployee(Employee employee)
        {
            _dataContext.Employees.Add(employee);
            await _dataContext.SaveChangesAsync();

            return await _dataContext.Employees.ToListAsync();
        }

        public async Task<List<Employee>> UpdateEmployee(int id, Employee request)
        {
            var employee = await _dataContext.Employees.FindAsync(id);

            if (employee is null)
                return null;

            employee.Name = request.Name;
            employee.Age = request.Age;
            employee.IsActive = request.IsActive;

            await _dataContext.SaveChangesAsync();

            return await _dataContext.Employees.ToListAsync();
        }

        public async Task<List<Employee>> DeleteEmployee(int id)
        {

            var employee = await _dataContext.Employees.FindAsync(id);

            if (employee is null)
                return null;

            _dataContext.Employees.Remove(employee);
            await _dataContext.SaveChangesAsync();

            return await _dataContext.Employees.ToListAsync();
        }
    }
}
