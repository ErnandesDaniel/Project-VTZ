using System.ComponentModel.DataAnnotations;

namespace VTZProject.Backend.Models
{
    public class TaskToGroupOfMatching : IModel
    {
        [Key]
        public Guid Id { get; set; }
        public Guid TaskId { get; set; }
        public Guid GroupOfMatchingId { get; set; }

        public virtual TaskVTZ Task { get; set; }
        public virtual GroupsOfMatching GroupOfMatching { get; set; }
    }
}
