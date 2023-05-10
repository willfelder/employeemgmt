using Microsoft.EntityFrameworkCore;
using server_side.Modals;

namespace server_side.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=employeedb;Trusted_Connection=true;TrustServerCertificate=true;");
        }

        public DbSet<Employee> Employees { get; set; }
    }
}
