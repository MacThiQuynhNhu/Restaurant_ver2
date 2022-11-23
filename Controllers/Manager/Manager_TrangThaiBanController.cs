using Restaurant.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Restaurant.Controllers.Manager
{
    public class Manager_TrangThaiBanController : Controller
    {

        private Model1 cons = new Model1();
        // GET: Manager_TrangThaiBan
        public ActionResult DanhSach()
        {
            using (var con = new Model1())
            {
                var model = con.Bans.ToList();
                return View(model);
            }
        }

        public ActionResult ThemBan()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ThemBan(Ban model)
        {

            // TODO: Add insert logic here
            using (var con = new Model1())
            {
                con.Bans.Add(model);
                con.SaveChanges();
                return RedirectToAction("DanhSach");
            }

        }

        public ActionResult CapNhatBan(string MaBan)
        {
            using (var con = new Model1())
            {
                var obj = con.Bans.Find(MaBan);
                //con.SaveChanges();
                return View(obj);
            }
        }


        [HttpPost]
        public ActionResult CapNhatBan(Ban model)
        {

            using (var con = new Model1())
            {
                var obj = con.Bans.Find(model.MaBan);
                obj.MaBan = model.MaBan;
                obj.TenBan = model.TenBan;
                obj.TrangThai = model.TrangThai;
                con.SaveChanges();
                return RedirectToAction("DanhSach");

            }

        }

        public ActionResult XoaBan(string MaBan)
        {

            using (var con = new Model1())
            {
                var obj = con.Bans.Find(MaBan);
                con.Bans.Remove(obj);
                con.SaveChanges();
                return RedirectToAction("DanhSach");
            }

        }

    }
}
