using System;
using System.Security.Cryptography;
// using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;


namespace WebAPI.Data.Repo
{
    public class UserRepository : IUserRepository 
    {
        private readonly DataContext dc;
        public UserRepository(DataContext dc)
        {
            this.dc = dc;
        }

       public async Task<User> Authenticate(string userName, string password)
       {
            return await dc.Users.FirstOrDefaultAsync(x => x.UserName == userName
                // && x.Password == password
            );
       }

       public void Register(string userName, string password)
       {
            byte[] passwordHash,  passwordKey;

            using (var hmac = new HMACSHA512())
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

            User user = new User();
            user.UserName = userName;
            user.Password = passwordHash;
            user.PasswordKey = passwordKey;

            dc.Users.Add(user);

       }

       public async Task<bool> UserAlreadyExists(string userName) 
       {
            return await dc.Users.AnyAsync(u => u.UserName == userName);
       }
    }
   
}