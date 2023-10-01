using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
//using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly DataContext dc;
        public CityController(DataContext dc) {
            this.dc = dc;
        }

        // GET api/city`
        [HttpGet("")]
        public async Task<IActionResult> GetCities()
        {
            var cities = await dc.Cities.ToListAsync();
            return Ok(cities);
        }

       
    }
}