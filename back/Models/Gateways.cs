using System.ComponentModel.DataAnnotations;

namespace VTZProject.Backend.Models
{
    public class Gateways : IModel
    {
        [Key]
        public Guid Id { get; set; }

        public virtual ICollection<TaskRelation> TaskRelations { get; set; }
    }
}
