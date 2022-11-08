using Restaurant.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Restaurant.Controllers.Manager
{
    public class Manager_BaiVietController : Controller
    {
        // GET: Manager_BaiViet
        public ActionResult Index()
        {
            Model1 db = new Model1();
            List<BaiViet> danhsachbaiviet = db.BaiViets.ToList();
            return View(danhsachbaiviet);
        }
        public ActionResult ThemMoi()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ThemMoi(BaiViet model)
        {
            Model1 db = new Model1();
            //thêm mới bản ghi
            db.BaiViets.Add(model);
            //lưu lại thay đổi
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        public ActionResult CapNhat(string MaBaiViet)
        {
            Model1 db = new Model1();
            BaiViet model2 = db.BaiViets.Find(MaBaiViet);
            return View(model2);
        }
        [HttpPost]
        public ActionResult CapNhat(BaiViet model)
        {
            Model1 db = new Model1();
            //tim doi tuong
            var updateModel = db.BaiViets.Find(model.MaBaiViet);
            //gan gia tri
            updateModel.TieuDe = model.TieuDe;
            updateModel.HinhAnh = model.HinhAnh;
            updateModel.Link = model.Link;
            //luu thay doi
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        public ActionResult Xoa(string MaBaiViet)
        {
            Model1 db = new Model1();
            //tim doi tuong
            var updateModel = db.BaiViets.Find(MaBaiViet);
            //XOa
            db.BaiViets.Remove(updateModel);
            //luu thay doi
            db.SaveChanges();

            return RedirectToAction("Index");
        }
    }
}