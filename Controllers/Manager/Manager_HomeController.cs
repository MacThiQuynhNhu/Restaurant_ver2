using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Restaurant.Models.Function;
using Restaurant.Models.Security;

namespace Restaurant.Controllers.Manager
{
    public class Manager_HomeController : Controller
    {
        // GET: Manager_Home
        [CustomAuthorize(Roles = "Quản lý")]
        //[AllowAnonymous(Roles )]
        public ActionResult Index()
        {
            return View();
        }
    }
}