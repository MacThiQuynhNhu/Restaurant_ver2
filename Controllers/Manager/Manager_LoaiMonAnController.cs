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
    public class Manager_LoaiMonAnController : Controller
    {
        // GET: Manager_LoaiMonAn
        private Model1 db = new Model1();
        // GET: Manager_TrangThaiBan
        public ActionResult DanhSach()
        {
            ViewBag.dsLoaiMon = db.LoaiMons.ToList();
            return View();
        }

        [HttpPost]
        public JsonResult getDetail(string id)
        {
            LoaiMon loai = db.LoaiMons.SingleOrDefault(x => x.MaLoaiMon == id);
            return Json(new
            {
                MaLoaiMon = loai.MaLoaiMon,
                TenLoaiMon = loai.TenLoaiMon,
                MoTa = loai.MoTa
            });
        }
        [HttpPost]
        public JsonResult addTypeFood(string TenLoaiMon, string MoTa)
        {
            var context = new Model1();
            using (DbContextTransaction transaction = context.Database.BeginTransaction())
            {
                try
                {
                    List<LoaiMon> listTypeFood = context.LoaiMons.ToList();
                    int count = listTypeFood.Count();
                    LoaiMon lastTypeFood = listTypeFood.ElementAt(count - 1);
                    string temp_id = lastTypeFood.MaLoaiMon;
                    string number = temp_id.Split('M')[1];
                    string next_id = "LM00" + (Int32.Parse(number) + 1).ToString();
                    LoaiMon newDb = new LoaiMon();
                    newDb.MaLoaiMon = next_id;
                    newDb.TenLoaiMon = TenLoaiMon;
                    newDb.MoTa = MoTa;
                    context.LoaiMons.Add(newDb);
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
        public JsonResult editTypeFood(string MaLoaiMon, string TenLoaiMon, string MoTa)
        {
            var context = new Model1();
            using (DbContextTransaction transaction = context.Database.BeginTransaction())
            {
                try
                {
                    LoaiMon lm = context.LoaiMons.SingleOrDefault(x => x.MaLoaiMon == MaLoaiMon);
                    lm.TenLoaiMon = TenLoaiMon;
                    lm.MoTa = MoTa;
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

        public JsonResult deleteTypeFood(string MaLoaiMon)
        {
            var context = new Model1();
            using (DbContextTransaction transaction = context.Database.BeginTransaction())
            {
                try
                {
                    var lm = context.LoaiMons.SingleOrDefault(x => x.MaLoaiMon == MaLoaiMon);
                    context.LoaiMons.Remove(lm);
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