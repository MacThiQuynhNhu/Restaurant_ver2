using PagedList.Mvc;
using PagedList;
using Restaurant.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Restaurant.Controllers.Client
{
    public class HomeController : Controller
    {
        private Model1 db = new Model1();
        // GET: Home
        public ActionResult Index()
        {
            ViewBag.List_Foods = db.MonAns.ToList();
            ViewBag.List_Type = db.LoaiMons.ToList();
            ViewBag.List_Chef = db.DauBeps.ToList();            
            ViewBag.List_SaleOff = db.KhuyenMais.ToList();
            return View();
        }
    }
}