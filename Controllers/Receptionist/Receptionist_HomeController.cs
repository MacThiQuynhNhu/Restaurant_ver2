using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Restaurant.Models.Security;
using Restaurant.Models;
namespace Restaurant.Controllers.Receptionist
{
    public class Receptionist_HomeController : Controller
    {
        // GET: Receptionist_Home
        //[CustomAuthorize(Roles = "Tiếp tân")]
        public ActionResult Index()
        {
            using (var con = new Model1())
            {
                var model = con.Bans.ToList();
                return View(model);
            }
        }
    }
}