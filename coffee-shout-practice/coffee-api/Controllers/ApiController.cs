using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;

namespace coffee_shout_practice.Controllers
{
    [ApiController]
    public class ApiController : ControllerBase
    {
        public struct LoginDetails 
        { 
            public string username { get; set; }
            public string password { get; set; }
        }

        public struct LoginResult 
        {
            public string token { get; set; }
        }

        public struct SavedDetails
        {
            public string date { get; set; }
            public int time { get; set; } 
            public string venue { get; set; } 
        }

        private static string connectionString = "Data Source=(localdb)\\MSSQLLocalDB;Integrated Security=True;Database=coffeeShout";

        private List<string> sessionTokens = new List<string>();

        [HttpPost("login")]
        public ActionResult Login([FromBody]LoginDetails loginDetails) 
        {
            using(var connection = new SqlConnection(connectionString))
            {
                var command = new SqlCommand($"select [password] from [user] where username = {loginDetails.username}", connection);
                connection.Open();

                using(var reader = command.ExecuteReader())
                {
                    if(reader.Read())
                    {
                        var password = (string)reader["password"];
                        if(password == loginDetails.password)
                        {
                            var random = new Random();
                            var token = random.Next(10000).ToString();
                            sessionTokens.Add(token);

                            var result = new LoginResult
                            {
                                token = token
                            };

                            return Ok(result);
                        }

                        else
                        {
                            return Forbid();
                        }
                    }

                    else 
                    { 
                        return Forbid();
                    }
                }
            }
        }

        [HttpPost("register")]
        public ActionResult Register([FromBody]LoginDetails loginDetails)
        {
            using(var connection = new SqlConnection(connectionString))
            {
                var command = new SqlCommand($"insert into [user] (username, [password]) values({loginDetails.username}, {loginDetails.password})", connection);
                connection.Open();

                command.ExecuteNonQuery();

                return Ok();
            } 
        }   

        [HttpPost("save")]
        public ActionResult Save([FromBody]SavedDetails savedDetails)
        {
            using(var connection = new SqlConnection(connectionString))
            {
                var command = new SqlCommand($"insert into [coffeeDate] ([date], [time], venue) values({savedDetails.date}, {savedDetails.time}, {savedDetails.venue})", connection);
                connection.Open();

                command.ExecuteNonQuery();

                return Ok();
            }
        }  
    }
}
