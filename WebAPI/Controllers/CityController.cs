using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
// using AutoMapper;
using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly IUnitOfWork uow;
        public CityController(IUnitOfWork uow) {
            this.uow = uow;
        }

        // GET api/city
        [HttpGet("")]
        public async Task<IActionResult> GetCities()
        {
            var cities = await uow.CityRepository.GetCitiesAsync();

            var citiesDto = from c in cities
                select new CityDto ()
                {
                    Id = c.Id,
                    Name = c.Name
                };
            return Ok(citiesDto);
        }

        // POST api/city/post --Post the data in JSON Format
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        { 
            var city = new City {
                Name = cityDto.Name,
                LastUpdatedOn = System.DateTime.Now,
                LastUpdatedBy = 1
            };

            uow.CityRepository.AddCity(city);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        // Delete a city
     [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            uow.CityRepository.DeleteCity(id);
            await uow.SaveAsync();
            return Ok(id);
        }

       
    }
}