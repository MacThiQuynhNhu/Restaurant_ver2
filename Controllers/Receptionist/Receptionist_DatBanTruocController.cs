using Restaurant.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Restaurant.Controllers.Receptionist
{
    public class Receptionist_DatBanTruocController : Controller
    {

        public ActionResult Index()
        {
            Model1 db = new Model1();
            List<BanDatTruoc> danhsachbandattruoc = db.BanDatTruocs.ToList();
            return View(danhsachbandattruoc);
        }
        public ActionResult ThemMoi()
        {
            return View(new BanDatTruoc());
        }
        [HttpPost]
        public ActionResult ThemMoi(BanDatTruoc model)
        {
            Model1 db = new Model1();
            //thêm mới bản ghi
            db.BanDatTruocs.Add(model);
            //lưu lại thay đổi
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        public ActionResult CapNhat(string idMaKhachHang)
        {
            Model1 db = new Model1();
            BanDatTruoc model2 = db.BanDatTruocs.Find(idMaKhachHang);
            return View(model2);
        }
        [HttpPost]
        public ActionResult CapNhat(BanDatTruoc model)
        {
            Model1 db = new Model1();
            //tim doi tuong
            var updateModel = db.BanDatTruocs.Find(model.MaKhachHang);
            //gan gia tri

            updateModel.MaBan = model.MaBan;
            updateModel.Ngay = model.Ngay;
            updateModel.Gio = model.Gio;
            updateModel.MaNhanVien = model.MaNhanVien;
            updateModel.SoLuong = model.SoLuong;
            updateModel.GhiChu = model.GhiChu;
            //luu thay doi
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        public ActionResult Xoa(string idMaKhachHang)
        {
            Model1 db = new Model1();
            //tim doi tuong
            var updateModel = db.BanDatTruocs.Find(idMaKhachHang);
            //Xoa
            db.BanDatTruocs.Remove(updateModel);
            //luu thay doi
            db.SaveChanges();

            return RedirectToAction("Index");
        }
    }
}