using server_side.Modals;

namespace server_side.Service
{
    public interface IEmployeeService
    {
        Task<List<Employee>> GetEmployees();
        Task<Employee?> GetSingleEmployee(int id);
        Task<List<Employee>> InsertEmployee(Employee employee);
        Task<List<Employee>?> UpdateEmployee(int id, Employee request);
        Task<List<Employee>?> DeleteEmployee(int id);
    }
}
