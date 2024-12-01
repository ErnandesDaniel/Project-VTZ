using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using VTZProject.Backend.Models;
using VTZProject.Backend.Models.RequestResults;
using VTZProject.Backend.Repositories;

namespace VTZProject.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminsController : ControllerBase
    {
        private readonly IRepository<Admins> _adminsRepository;

        public AdminsController(IRepository<Admins> repository)
        {
            _adminsRepository = repository;
        }

        [HttpGet]
        public RequestResult<List<Admins>> GetAll()
        {
            var admins = _adminsRepository.GetAll().ToList();
            return new RequestResult<List<Admins>>
            {
                State = StateResult.Success.ToString(),
                Value = admins
            };
        }
    };
}

