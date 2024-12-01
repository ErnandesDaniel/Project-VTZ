using Microsoft.AspNetCore.Mvc;
using VTZProject.Backend.BD;
using VTZProject.Backend.Models;
using VTZProject.Backend.Models.RequestResults;
using System.Linq;

namespace VTZProject.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PracticeToTaskController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public PracticeToTaskController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var practiceTasks = _context.PracticeToTasks.ToList();

            var result = new RequestResult<object[]>
            {
                State = StateResult.Success.ToString(),
                Value = practiceTasks.Cast<object>().ToArray()
            };

            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var practiceTask = _context.PracticeToTasks.FirstOrDefault(pt => pt.Id == id);

            if (practiceTask == null)
            {
                var notFoundResult = new RequestResult<object>
                {
                    State = StateResult.Error.ToString(),
                    ErrorDescription = "PracticeToTask not found."
                };
                return NotFound(notFoundResult);
            }

            var result = new RequestResult<object>
            {
                State = StateResult.Success.ToString(),
                Value = practiceTask
            };

            return Ok(result);
        }
    }
}
