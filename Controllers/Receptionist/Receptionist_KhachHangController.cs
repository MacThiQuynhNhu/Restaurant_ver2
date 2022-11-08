using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Restaurant.Models;

namespace Restaurant.Controllers.Receptionist
{
    public class Receptionist_KhachHangController : Controller
    {
        public ActionResult Index()
        {
            Model1 db = new Model1();
            List<KhachHang> danhsachkhachhang = db.KhachHangs.ToList();
            return View(danhsachkhachhang);
        }
        public ActionResult ThemMoi()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ThemMoi(KhachHang model)
        {
            Model1 db = new Model1();
            //thêm mới bản ghi
            db.KhachHangs.Add(model);
            //lưu lại thay đổi
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        public ActionResult CapNhat(string idKhachHang)
        {
            Model1 db = new Model1();
            KhachHang model2 = db.KhachHangs.Find(idKhachHang);
            return View(model2);
        }

        [HttpPost]
        public ActionResult CapNhat(KhachHang model)
        {
            Model1 db = new Model1();
            //tim doi tuong
            var updateModel = db.KhachHangs.Find(model.MaKhachHang);
            //gan gia tri
            updateModel.TenKhachHang = model.TenKhachHang;
            updateModel.SDT = model.SDT;
            updateModel.SoLanDatBan = model.SoLanDatBan;
            updateModel.SoLanGoiMon = model.SoLanGoiMon;
            //luu thay doi
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        public ActionResult Xoa(string idKhachHang)
        {
            Model1 db = new Model1();
            //tim doi tuong
            var updateModel = db.KhachHangs.Find(idKhachHang);
            //XOa
            db.KhachHangs.Remove(updateModel);
            //luu thay doi
            db.SaveChanges();

            return RedirectToAction("Index");
        }

    }
}