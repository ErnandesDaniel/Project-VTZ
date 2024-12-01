using System.ComponentModel.DataAnnotations;

namespace VTZProject.Backend.Models
{
    public class TaskToGroup : IModel
    {
        [Key]
        public Guid Id { get; set; }
        public Guid TaskId { get; set; }
        public Guid GroupId { get; set; }

        public virtual TaskVTZ Task { get; set; }
        public virtual Groups Group { get; set; }
    }
}
