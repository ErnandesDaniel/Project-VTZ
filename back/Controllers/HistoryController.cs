using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using VTZProject.Backend.Models;
using VTZProject.Backend.Models.RequestResults;
using VTZProject.Backend.Repositories;

namespace VTZProject.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistoryController : ControllerBase
    {
        private readonly IRepository<History> _repository;

        public HistoryController(IRepository<History> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public RequestResult<List<History>> GetAll()
        {
            var history = _repository.GetAll().ToList();
            return new RequestResult<List<History>>
            {
                State = StateResult.Success.ToString(),
                Value = history
            };
        }
    }
}
