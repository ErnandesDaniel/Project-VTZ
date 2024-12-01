using Microsoft.AspNetCore.Mvc;
using VTZProject.Backend.BD;
using VTZProject.Backend.Models;
using VTZProject.Backend.Models.RequestResults;
using System;
using System.Linq;

namespace VTZProject.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SectionToTaskController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public SectionToTaskController(ApplicationContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var sectionToTasks = _context.SectionsToTask.ToList();
            var result = new RequestResult<object[]>
            {
                State = StateResult.Success.ToString(),
                Value = sectionToTasks.Cast<object>().ToArray()
            };

            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var sectionToTask = _context.SectionsToTask.FirstOrDefault(stt => stt.Id == id);
            if (sectionToTask == null)
            {
                var errorResult = new RequestResult<object>
                {
                    State = StateResult.Error.ToString(),
                    ErrorDescription = "Section to task relation not found."
                };
                return NotFound(errorResult);
            }

            var successResult = new RequestResult<SectionToTask>
            {
                State = StateResult.Success.ToString(),
                Value = sectionToTask
            };

            return Ok(successResult);
        }
    }
}