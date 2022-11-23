using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Restaurant.Models;
namespace Restaurant.Controllers.Cashier
{
    public class Cashier_HomeController : Controller
    {
        // GET: Cashier_Home
        Model1 con = new Model1();
        public ActionResult Index()
        {
            ViewBag.List_DanhSachGoiMon = con.DanhSachGoiMons.ToList().Where(x => x.MaHoaDon == null);
            return View();
        }

        public ActionResult ThemHoaDon(string ds)
        {
            DSGM_MonAn dsgm_ma = con.DSGM_MonAn.SingleOrDefault(x => x.MaGoiMon == ds);
            ViewBag.List_MonAn = con.MonAns.ToList().Where(x => x.MaMonAn == dsgm_ma.MaMonAn);
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