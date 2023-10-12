using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Dtos;
using WebAPI.Errors;
using WebAPI.Extensions;
using WebAPI.Interfaces;
using WebAPI.Models;

// using System.Net;


namespace WebAPI.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IConfiguration configuration;
 
        public AccountController(IUnitOfWork uow, IConfiguration configuration)
        {
            this.uow = uow;
            this.configuration = configuration;
        }

        // POST api/account/login
       [HttpPost("login")]
        public async Task<IActionResult> Login(LoginReqDto loginReq)
        {
            var user = await uow.UserRepository.Authenticate(loginReq.UserName, loginReq.Password);
            
            ApiError apiError = new ApiError();
            if(user == null) 
            {
                apiError.ErrorCode = Unauthorized().StatusCode;
                apiError.ErrorMessage = "Invalid username ID or password";
                apiError.ErrorDetails = "This error appears to when provided user id or password does not exist";
                return Unauthorized(apiError);
            }
            
            var loginRes = new LoginResDto();
            loginRes.UserName = user.UserName;
            loginRes.Token = CreateJWT(user);
            return Ok(loginRes);
        }
        
        // POST api/account/register
        [HttpPost("Register")]
        public async Task<IActionResult> Register(LoginReqDto loginReq)
        {
            ApiError apiError = new ApiError();

            if (loginReq.UserName.IsEmpty()||
                loginReq.Password.IsEmpty()) {
                    apiError.ErrorCode = BadRequest().StatusCode;
                    apiError.ErrorMessage = "User name or password can not be blank";
                    return BadRequest(apiError);
                }

            if (await uow.UserRepository.UserAlreadyExists(loginReq.UserName))
                apiError.ErrorCode = BadRequest().StatusCode;
                apiError.ErrorMessage = "User already exists, please try something else";
                return BadRequest(apiError);

            uow.UserRepository.Register(loginReq.UserName, loginReq.Password, loginReq.UserEmail, loginReq.UserMobile);
            await uow.SaveAsync();
            return StatusCode(201);
        }
        private string CreateJWT(User user) 
        {   
            //For Windows OS
            // var secretKey = configuration.GetSection("AppSettings:Key").Value;

            // For Mac OS // You should set this local variable on your OS system (e.g. if you're using .zhsrc: export ASPNETCORE_AppSettings__Key="enter_any_sting_here" ) and add it in you Startup.cs file
            var secretKey = configuration["ASPNETCORE_AppSettings__Key"];
            var key = new SymmetricSecurityKey(Encoding.UTF8
                 .GetBytes(secretKey));

             var claims = new Claim[] {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var signingCredentials = new SigningCredentials(
                    key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(3),
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
     
    }
}