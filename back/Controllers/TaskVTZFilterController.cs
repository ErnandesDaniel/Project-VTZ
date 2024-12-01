using Microsoft.AspNetCore.Mvc;
using VTZProject.Backend.Models.Filters;
using VTZProject.Backend.Models;
using VTZProject.Backend.Tools.Services;
using VTZProject.Backend.Services;
using VTZProject.Backend.Models.Extensions;
using VTZProject.Backend.Models.DTO;

namespace VTZProject.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskVTZFilterController : ControllerBase
    {
        private readonly TaskVTZFilterService _taskVTZFilterService;

        public TaskVTZFilterController(TaskVTZFilterService taskVTZFilterService)
        {
            _taskVTZFilterService = taskVTZFilterService;
        }

        /// <summary>
        /// Получить отфильтрованные задачи TaskVTZ
        /// </summary>
        /// <param name="filter">Фильтр для задачи</param>
        /// <returns>Список отфильтрованных задач</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskVTZ>>> GetFilteredTasks([FromQuery] TaskVTZFilter filter)
        {
            var tasks = await _taskVTZFilterService.GetFilteredTasks(filter);
            return Ok(tasks);
        }
    }
}
