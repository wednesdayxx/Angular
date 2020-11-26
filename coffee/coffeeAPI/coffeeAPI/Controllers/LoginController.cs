using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using coffeeAPI.Models;
using coffeeAPI.Models.VM;

namespace coffeeAPI.Controllers
{
    [RoutePrefix("Api/login")]
    public class LoginController : Controller
    {
        coffeeShoutEntities DB = new coffeeShoutEntities();
        [Route("InsertUser")]
        [HttpPost]
        public object InsertUser(Register Reg)
        {
            try
            {
                coffeeDate CD = new coffeeDate();
                if (CD.Username == 0)
                {
                    CD.username = Reg.Username;
                    CD.password = Reg.Password;
                    DB.coffeeDates.Add(CD);
                    DB.SaveChanges();
                    return new Response
                    { Status = "Success", Message = "Record successfully saved" };
                }
            }

            catch (Exception)
            {

                throw;
            }
            return new Response
            { Status = "Error", Message = "Invalid Data." };
            }
            [Route("Login")]
            [HttpPost]
            public Response userLogin(Login login)
            {
                var log = DB.coffeeDates.Where(x => x.username.Equals(login.Username) &&
                          x.password.Equals(login.Password)).FirstOrDefault();

                if (log == null)
                {
                    return new Response { Status = "Invalid", Message = "Invalid User." };
                }
                else
                    return new Response { Status = "Success", Message = "Login Successfully" };
        }
    }
}