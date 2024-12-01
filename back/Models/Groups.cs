using System.ComponentModel.DataAnnotations;

namespace VTZProject.Backend.Models
{
    public class Groups : IModel
    {
        [Key]
        public Guid Id { get; set; }

        public virtual ICollection<TaskToGroup> TaskToGroups { get; set; }
    }
}
