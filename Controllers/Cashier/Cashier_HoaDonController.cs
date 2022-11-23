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

        public ActionResult ThemHoaDon()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ThemHoaDon(HoaDon model)
        {

            // TODO: Add insert logic here
            using (var con = new Model1())
            {
                con.HoaDons.Add(model);
                con.SaveChanges();
                return RedirectToAction("DanhSach");
            }
        }
    }
}