using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Restaurant.Controllers.Cashier
{
    public class Cashier_HomeController : Controller
    {
        // GET: Cashier_Home
        public ActionResult Index()
        {
            return View();
        }
    }
}