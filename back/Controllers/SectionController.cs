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
    public class SectionController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public SectionController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var sections = _context.Sections.ToList();
            var result = new RequestResult<object[]>
            {
                State = StateResult.Success.ToString(),
                Value = sections.Cast<object>().ToArray() // Приведение к object[], если требуется вернуть универсальный тип
            };

            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var section = _context.Sections.FirstOrDefault(s => s.Id == id);
            if (section == null)
            {
                var errorResult = new RequestResult<object>
                {
                    State = StateResult.Error.ToString(),
                    ErrorDescription = "Section not found."
                };
                return NotFound(errorResult);
            }

            var successResult = new RequestResult<Section>
            {
                State = StateResult.Success.ToString(),
                Value = section
            };

            return Ok(successResult);
        }
    }
}