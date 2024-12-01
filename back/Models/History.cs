using System.ComponentModel.DataAnnotations;

namespace VTZProject.Backend.Models
{
    public class History : IModel
    {
        [Key]
        public Guid Id { get; set; }
        public Guid OperationId { get; set; }
        public string TableName { get; set; }
        public Guid EntityId { get; set; }
        public string Field { get; set; }
        public string OldValue { get; set; }
        public string NewValue { get; set; }

        public virtual Operations Operation { get; set; }
    }
}
