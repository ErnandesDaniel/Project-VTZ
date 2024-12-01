using System.ComponentModel.DataAnnotations;

namespace VTZProject.Backend.Models
{
    public class Practice : IModel
    {
        [Key]
        public Guid Id { get; set; }
        public string PracticeShortName { get; set; }
        public string PracticeFullName { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ICollection<PracticeToTask> Tasks { get; set; }
    }
}
