using System.ComponentModel.DataAnnotations;

namespace VTZProject.Backend.Models
{
    public class TaskRelation : IModel
    {
        [Key]
        public Guid Id { get; set; }
        public Guid SuccessorTaskId { get; set; }
        public Guid PredecessorTaskId { get; set; }
        public Guid? GatewayId { get; set; }
        public virtual Gateways Gateway { get; set; }
        public virtual TaskVTZ SuccessorTask { get; set; }
        public virtual TaskVTZ PredecessorTask { get; set; }
    }
}
