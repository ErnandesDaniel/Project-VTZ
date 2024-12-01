using System.ComponentModel.DataAnnotations;

namespace VTZProject.Backend.Models
{
    public class Admins : IModel
    {
        [Key]
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Login { get; set; }
        public string HashPassword { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ICollection<Operations> Operations { get; set; }
    }
}
