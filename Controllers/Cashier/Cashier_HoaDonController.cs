using Restaurant.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Restaurant.Controllers.Cashier
{
    public class Cashier_HoaDonController : Controller
    {
        private Model1 db = new Model1();
        // GET: Cashier_HoaDon
        private Model1 cons = new Model1();
        public ActionResult DanhSach()
        {
            using (var con = new Model1())
            {
                var model = con.HoaDons.ToList();
                return View(model);
            }
        }
        
        
    }
}