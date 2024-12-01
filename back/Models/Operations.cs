using System.ComponentModel.DataAnnotations;

namespace VTZProject.Backend.Models
{
    public class Operations : IModel
    {
        [Key]
        public Guid Id { get; set; }
        public Guid AdminId { get; set; }
        public DateTime DateOfOperation { get; set; }

        public virtual Admins Admin { get; set; }
    }
}
