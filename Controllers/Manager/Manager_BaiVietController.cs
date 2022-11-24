using Restaurant.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Restaurant.Models.Function;
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
        /*
        [HttpPost]
        public ActionResult Create(DauBep model, HttpPostedFileBase UrlAnh, string controller)
        {
            try
            {
                // TODO: Add update logic here

                if (UrlAnh == null)
                {
                    ModelState.AddModelError("File", "Chưa upload file ảnh");
                }
                else if (UrlAnh.ContentLength > 0)
                {                 //TO:DO
                    var fileName = Path.GetFileName(UrlAnh.FileName);
                    var path = Path.Combine(Server.MapPath("~/Content/Admin/assets/img"), fileName);
                    UrlAnh.SaveAs(path);                    //   

                    DauBepF spF = new DauBepF();
                    model.HinhAnh = fileName;
                    if (spF.Insert(model))
                    {
                        return RedirectToAction("Index");
                    }
                }
            }
            catch
            {
                return View();
            }
            return View();
        }
        */
        public ActionResult Create()
        {
            var dm = new BaiVietF().DSBaiViet.Where(p => p.TieuDe != null);
            ViewBag.MaDM = new SelectList(dm, "MaBaiViet", "TieuDe", null);
            return View();
        }
        [HttpPost]
        public ActionResult Create(BaiViet model, HttpPostedFileBase UrlAnh, string controller)
        {
            try
            {
                // TODO: Add update logic here

                if (UrlAnh == null)
                {
                    ModelState.AddModelError("File", "Chưa upload file ảnh");
                }
                else if (UrlAnh.ContentLength > 0)
                {                 //TO:DO
                    var fileName = Path.GetFileName(UrlAnh.FileName);
                    var path = Path.Combine(Server.MapPath("~/Content/Admin/assets/img"), fileName);
                    UrlAnh.SaveAs(path);                    //   

                    BaiVietF spF = new BaiVietF();
                    model.HinhAnh = fileName;
                    //model.HinhAnh = path;
                    if (spF.Insert(model))
                    {
                        return RedirectToAction("Index");
                    }
                }
            }
            catch
            {
                return View();
            }
            return View();
            /*
            // TODO: Add insert logic here
            using (var con = new Model1())
            {
                con.BaiViets.Add(model);
                con.SaveChanges();
                return RedirectToAction("Index");
            }
            */
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
            ViewBag.capnhat = db.BaiViets.ToList();
            //tim doi tuong
            var updateModel = db.BaiViets.Find(model.MaBaiViet);
            //gan gia tri
            updateModel.TieuDe = model.TieuDe;
            updateModel.HinhAnh = model.HinhAnh;
            updateModel.NoiDung = model.NoiDung;
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