using System.ComponentModel.DataAnnotations;

namespace VTZProject.Backend.Models
{
    public class SectionToTask : IModel
    {
        [Key]
        public Guid Id { get; set; }
        public Guid SectionId { get; set; }
        public Guid TaskId { get; set; }

        public virtual Section Section { get; set; }
        public virtual TaskVTZ Task { get; set; }
    }
}
