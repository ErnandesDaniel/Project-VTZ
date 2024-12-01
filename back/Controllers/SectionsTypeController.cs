using Microsoft.AspNetCore.Mvc;
using VTZProject.Backend.BD;
using VTZProject.Backend.Models;
using VTZProject.Backend.Models.RequestResults;
using System;
using System.Collections.Generic;
using System.Linq;

namespace VTZProject.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SectionsTypeController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public SectionsTypeController(ApplicationContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var sectionsTypes = _context.SectionsTypes.ToList();
            var result = new RequestResult<List<SectionsType>>
            {
                State = StateResult.Success.ToString(),
                Value = sectionsTypes
            };
            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var sectionType = _context.SectionsTypes.FirstOrDefault(st => st.Id == id);
            if (sectionType == null)
            {
                return NotFound(new RequestResult<SectionsType>
                {
                    State = StateResult.Error.ToString(),
                    ErrorDescription = "Section type not found."
                });
            }

            var result = new RequestResult<SectionsType>
            {
                State = StateResult.Success.ToString(),
                Value = sectionType
            };
            return Ok(result);
        }
    }
}