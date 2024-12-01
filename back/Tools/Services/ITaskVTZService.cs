using VTZProject.Backend.Models.DTO;

namespace VTZProject.Backend.Tools.Services
{
    public interface ITaskVTZService
    {
        public void Set(TaskVTZDto dto);
        public void Create(TaskVTZDto dto);
        public void ConnectWith(Guid task1Id, Guid task2Id);
        public void UnconnectRelation(Guid relationId);
        public void UnconnectTaskVtzFromGateways(Guid taskId);
    }
}
