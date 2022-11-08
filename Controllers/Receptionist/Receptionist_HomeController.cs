using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Restaurant.Controllers.Receptionist
{
    public class Receptionist_HomeController : Controller
    {
        // GET: Receptionist_Home
        public ActionResult Index()
        {
            return View();
        }
    }
}