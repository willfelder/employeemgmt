using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server_side.Data;
using server_side.Modals;
using server_side.Service;

namespace server_side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetEmployees()
        {
            return await _employeeService.GetEmployees();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetSingleEmployee(int id)
        {

            var result = await _employeeService.GetSingleEmployee(id);

            if (result == null)
                return NotFound("The employee was not found.");

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<List<Employee>>> InsertEmployee(Employee employee)
        {
            var result = await _employeeService.InsertEmployee(employee);

            return Ok(employee);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Employee>>> UpdateEmployee(int id, Employee request)
        {
            // _dataContext.Entry(request).State = EntityState.Modified;
            var result = await _employeeService.UpdateEmployee(id, request);

            if (result == null)
                return NotFound("Employee was not found.");

            return Ok(result);
        }

        [HttpDelete]
        public async Task<ActionResult<List<Employee>>> DeleteEmployee(int id)
        {
            var result = await _employeeService.DeleteEmployee(id);

            if (result == null) 
                return NotFound("Employee was not found.");

            return Ok(result);
        }
    }
}
