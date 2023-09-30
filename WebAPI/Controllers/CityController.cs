using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        public CityController()
        {
        }
        // Get api/city
        [HttpGet("")]
        public IEnumerable<string> GetTModels()
        {
            return new string[] { "New York", "Atlanta", "Boston", "Chicago" };
        }

    }
}