using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
// using Microsoft.Extensions.Logging;

using WebAPI.Interfaces;
using WebAPI.Dtos;

namespace WebAPI.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IUnitOfWork uow;
 
        public AccountController(IUnitOfWork uow)
        {
            this.uow = uow;
        }

        // POST api/account/login
       [HttpPost("login")]
        public async Task<IActionResult> Login(LoginReqDto loginReq)
        {
            var user = await uow.UserRepository.Authenticate(loginReq.UserName, loginReq.Password);
            
            if(user == null) 
            {
                return Unauthorized();
            }
            
            var loginRes = new LoginResDto();
            loginRes.UserName = user.UserName;
            loginRes.Token = "Token to be generated";
            return Ok(loginRes);

        }

     
    }
}