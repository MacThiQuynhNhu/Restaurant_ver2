using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Restaurant.Models.Function;
using Restaurant.Models;
namespace Restaurant.Controllers.Manager
{
    public class Manager_SignUpController : Controller
    {
        // GET: Manager_SignUp

        public ActionResult Index()
        {
            Model1 db = new Model1();
            List<NhanVien> danhsachnhanvien = db.NhanViens.ToList();
            return View(danhsachnhanvien);
        }
        public ActionResult DangKi()
        {
            return View();
        }
        
        [HttpPost]
        public ActionResult DangKi(NhanVien model, int GioiTinh)
        {
            var dm = new NhanVienF().DSNhanVien.Where(p => p.HoTen != null);
            ViewBag.MaDM = new SelectList(dm, "MaNhanVien", "HoTen", null);

            NhanVienF a = new NhanVienF();
            if (GioiTinh == 0) model.GioiTinh = false;
            else model.GioiTinh = true;
            a.Insert(model);
            return RedirectToAction("Index");
        }
    }
}