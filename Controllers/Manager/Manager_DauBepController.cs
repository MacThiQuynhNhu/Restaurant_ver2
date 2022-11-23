using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Restaurant.Models;
using System.Web.Script.Serialization;
using System.Globalization;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using System.IO;
using System.Drawing;
using System.Text;
using System.Net;
using System.Threading.Tasks;
using System.Data.Entity;

namespace Restaurant.Controllers.Manager
{
    public class Manager_DauBepController : Controller
    {
        Model1 db = new Model1();
        // GET: Manager_DauBep
        public ActionResult Index()
        {
            using (var con = new Model1())
            {
                var model = con.DauBeps.ToList().Where(x => x.MoTa != "Blocked");
                return View(model);
            }
        }
        [HttpPost]
        public JsonResult getDetail(string id)
        {
            DauBep chef = db.DauBeps.SingleOrDefault(x => x.MaDauBep == id);
            return Json(new { res = chef });
        }
        [HttpPost]
        public JsonResult addChef(string TenDauBep, string DiaChi, string SoDienThoai, string HinhAnh, string GioiTinh, string Mota)
        {
            var context = new Model1();
            using (DbContextTransaction transaction = context.Database.BeginTransaction())
            {
                try
                {
                    List<DauBep> listChef = context.DauBeps.ToList();
                    int count = listChef.Count();
                    DauBep lastChef = listChef.ElementAt(count - 1);
                    string temp_id = lastChef.MaDauBep;
                    string next_id = (Int32.Parse(temp_id) + 1).ToString();
                    DauBep newDb = new DauBep();
                    newDb.MaDauBep = next_id;
                    newDb.TenDauBep = TenDauBep;
                    newDb.DiaChi = DiaChi;
                    newDb.SoDienThoai = SoDienThoai;
                    var splitFile = HinhAnh.Split('\\');
                    string img = "/Web_Admin/assets/img/" + splitFile[splitFile.Length - 1];
                    newDb.HinhAnh = img;
                    if (GioiTinh == "0")
                    {
                        newDb.GioiTinh = false;
                    }
                    else
                    {
                        newDb.GioiTinh = true;
                    }
                    newDb.MoTa = Mota;
                    context.DauBeps.Add(newDb);
                    context.SaveChanges();
                    transaction.Commit();
                    return Json(new { status = true });
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return Json(new { status = false });
                }
            }
        }
        [HttpPost]
        public JsonResult editChef(string MaDauBep, string TenDauBep, string DiaChi, string SoDienThoai, string HinhAnh, string GioiTinh, string Mota)
        {
            var context = new Model1();
            using (DbContextTransaction transaction = context.Database.BeginTransaction())
            {
                try
                {
                    DauBep chef = context.DauBeps.SingleOrDefault(x => x.MaDauBep == MaDauBep);
                    chef.TenDauBep = TenDauBep;
                    chef.DiaChi = DiaChi;
                    chef.SoDienThoai = SoDienThoai;
                    var splitFile = HinhAnh.Split('\\');
                    string img = "/Web_Admin/assets/img/" + splitFile[splitFile.Length - 1];
                    chef.HinhAnh = img;
                    if (GioiTinh == "0")
                    {
                        chef.GioiTinh = false;
                    }
                    else
                    {
                        chef.GioiTinh = true;
                    }
                    chef.MoTa = Mota;
                    context.SaveChanges();
                    transaction.Commit();
                    return Json(new { status = true });
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return Json(new { status = false });
                }
            }
        }

        public JsonResult deleteChef(string MaDauBep)
        {
            var context = new Model1();
            using (DbContextTransaction transaction = context.Database.BeginTransaction())
            {
                try
                {
                    DauBep chef = context.DauBeps.SingleOrDefault(x => x.MaDauBep == MaDauBep);
                    chef.MoTa = "Blocked";
                    context.SaveChanges();
                    transaction.Commit();
                    return Json(new { status = true });
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return Json(new { status = false });
                }
            }
        }
    }
}