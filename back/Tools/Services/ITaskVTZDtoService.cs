using VTZProject.Backend.Models.DTO;

namespace VTZProject.Backend.Tools.Services
{
    public interface ITaskVTZDtoService
    {
        public IEnumerable<TaskVTZDto> GetTasksWithLineNumber();
        public IEnumerable<TaskVTZDto> GetAllAfter(Guid id);
        public IEnumerable<TaskVTZDto> GetAllBefore(Guid id);
    }
}
