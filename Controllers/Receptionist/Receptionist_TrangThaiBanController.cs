using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Restaurant.Models;
namespace Restaurant.Controllers.Receptionist
{
    public class Receptionist_TrangThaiBanController : Controller
    {
        private Model1 cons = new Model1();
        // GET: Manager_TrangThaiBan
        public ActionResult Index()
        {
            using (var con = new Model1())
            {
                var model = con.Bans.ToList();
                return View(model);
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

    }
}