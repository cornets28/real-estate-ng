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
    [Authorize]
    public class CityController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        public CityController(IUnitOfWork uow, IMapper mapper) {
            this.uow = uow;
            this.mapper = mapper;
        }

        // GET api/city
        [HttpGet("")]
        [AllowAnonymous] // Allow aauthorization
        public async Task<IActionResult> GetCities()
        {
            var cities = await uow.CityRepository.GetCitiesAsync();

            var citiesDto = mapper.Map<IEnumerable<CityDto>>(cities);

            return Ok(citiesDto);
        }

        // PUT api/city/update/3
        [HttpPut("update/{id}")]
        
        public async Task<IActionResult> UpdateCity(int id, CityDto cityDto) {
            var cityFromDb = await uow.CityRepository.FindCity(id);

            try
            {
                if (id != cityDto.Id)
                return BadRequest("Update not allowed");

                if (cityFromDb == null)
                    return BadRequest("Update not allowed");
                    
                cityFromDb.LastUpdatedOn = System.DateTime.Now;
                cityFromDb.LastUpdatedBy = 1;
                mapper.Map(cityDto, cityFromDb);
                await uow.SaveAsync();
                return StatusCode(201);
            }
            catch (System.Exception)
            {
                return StatusCode(500, "Update not allowed");
            }

            
        }

        // PUT api/city/updateCitiName/3
        [HttpPut("updateCitiName/{id}")]
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