using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Restaurant.Controllers.Client
{
    public class MenuController : Controller
    {
        // GET: Menu
        public ActionResult Index()
        {
            return View();
        }
    }
}