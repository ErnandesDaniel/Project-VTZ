﻿using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using VTZProject.Backend.Models;
using VTZProject.Backend.Models.RequestResults;
using VTZProject.Backend.Repositories;

namespace VTZProject.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly IRepository<Groups> _repository;

        public GroupsController(IRepository<Groups> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public RequestResult<List<Groups>> GetAll()
        {
            var groups = _repository.GetAll().ToList();
            return new RequestResult<List<Groups>>
            {
                State = StateResult.Success.ToString(),
                Value = groups
            };
        }
    }
}
