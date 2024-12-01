using System.ComponentModel.DataAnnotations;

namespace VTZProject.Backend.Models
{
    public class PracticeToTask : IModel
    {
        [Key]
        public Guid Id { get; set; }
        public Guid PracticeId { get; set; }
        public Guid TaskId { get; set; }

        public virtual Practice Practice { get; set; }
        public virtual TaskVTZ Task { get; set; }
    }
}
