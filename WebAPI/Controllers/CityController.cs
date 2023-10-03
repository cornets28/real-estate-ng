using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
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
        private readonly IMapper mapper;
        public CityController(IUnitOfWork uow, IMapper mapper) {
            this.uow = uow;
            this.mapper = mapper;
        }

        // GET api/city
        [HttpGet("")]
        public async Task<IActionResult> GetCities()
        {
            var cities = await uow.CityRepository.GetCitiesAsync();

            var citiesDto = mapper.Map<IEnumerable<CityDto>>(cities);

            return Ok(citiesDto);
        }

        // PUT api/city/updateCitiName/3

        [HttpPut("updateCitiName/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityDto cityDto) {
            var cityFromDb = await uow.CityRepository.FindCity(id);
            cityFromDb.LastUpdatedOn = System.DateTime.Now;
            cityFromDb.LastUpdatedBy = 1;
            mapper.Map(cityDto, cityFromDb);
            await uow.SaveAsync();
            return StatusCode(201);
        }

         [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityUpdateDto cityDto) {
            var cityFromDb = await uow.CityRepository.FindCity(id);
            cityFromDb.LastUpdatedOn = System.DateTime.Now;
            cityFromDb.LastUpdatedBy = 1;
            mapper.Map(cityDto, cityFromDb);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        // PATCH api/city/update/1 
         [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateCityPatch(int id, JsonPatchDocument<City> cityToPatch)
        {
            var cityFromDb = await uow.CityRepository.FindCity(id);
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;

            cityToPatch.ApplyTo(cityFromDb, ModelState);
            await uow.SaveAsync();
            return StatusCode(200);
        }

        // POST api/city/post --Post the data in JSON Format
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        { 
            var city = mapper.Map<City>(cityDto);
            city.LastUpdatedOn = System.DateTime.Now;
            city.LastUpdatedBy = 1;
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