using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Restaurant.Models.Function
{
    public class account
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        //public List<string> Roles { get; set; }
        public List<string> Roles { get; set; }
    }
}