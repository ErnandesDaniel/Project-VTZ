using Microsoft.AspNetCore.Mvc;
using VTZProject.Backend.Models;
using VTZProject.Backend.Repositories;
using VTZProject.Backend.Models.RequestResults;

namespace VTZProject.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PracticesController : ControllerBase
    {
        private readonly IRepository<Practice> _practiceRepository;

        public PracticesController(IRepository<Practice> practiceRepository)
        {
            _practiceRepository = practiceRepository;
        }

        [HttpGet]
        public RequestResult<List<Practice>> GetAll()
        {
            var practices = _practiceRepository.GetAll().ToList();
            return new RequestResult<List<Practice>>
            {
                State = StateResult.Success.ToString(),
                Value = practices
            };
        }

        [HttpGet("{id}")]
        public RequestResult<Practice> GetById(Guid id)
        {
            var practice = _practiceRepository.Get(p => p.Id == id).FirstOrDefault();
            if (practice == null)
            {
                return new RequestResult<Practice>
                {
                    State = StateResult.Error.ToString(),
                    ErrorDescription = "Practice not found."
                };
            }

            return new RequestResult<Practice>
            {
                State = StateResult.Success.ToString(),
                Value = practice
            };
        }
    }
}
