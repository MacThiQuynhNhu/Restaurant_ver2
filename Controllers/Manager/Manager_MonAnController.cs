using Restaurant.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Restaurant.Controllers.Manager
{
    public class Manager_MonAnController : Controller
    {
        Model1 db = new Model1();
        // GET: Manager_MonAn
        public ActionResult Index()
        {
            using (var con = new Model1())
            {
                var model = con.MonAns.ToList();
                return View(model);
            }
        }
        [HttpPost]
        public JsonResult getDetail(string id)
        {
            MonAn food = db.MonAns.SingleOrDefault(x => x.MaMonAn == id);
            return Json(new
            {
                MaMonAn = food.MaMonAn,
                TenMonAn = food.TenMonAn,
                Gia = food.Gia,
                DonViTinh = food.DonViTinh,
                MoTa = food.MoTa,
                HinhAnh = food.HinhAnh,
                ThoiGianRaMat = food.ThoiGianRaMat
            });
        }
        [HttpPost]
        public JsonResult addFood(string TenMonAn, int Gia, string DonViTinh, string HinhAnh, DateTime? ThoiGianRaMat, string Mota, string MaLoaiMon)
        {
            var context = new Model1();
            using (DbContextTransaction transaction = context.Database.BeginTransaction())
            {
                try
                {
                    List<MonAn> listFood = context.MonAns.ToList();
                    int count = listFood.Count();
                    MonAn lastFood = listFood.ElementAt(count - 1);
                    string temp_id = lastFood.MaMonAn;
                    string number = temp_id.Split('A')[1];
                    string next_id = "MA00" + (Int32.Parse(number) + 1).ToString();
                    MonAn newDb = new MonAn();
                    newDb.MaMonAn = next_id;
                    newDb.TenMonAn = TenMonAn;
                    newDb.Gia = Gia;
                    newDb.DonViTinh = DonViTinh;
                    var splitFile = HinhAnh.Split('\\');
                    string img = "/Web_Admin/assets/img/" + splitFile[splitFile.Length - 1];
                    newDb.MoTa = Mota;
                    newDb.HinhAnh = img;
                    newDb.ThoiGianRaMat = DateTime.Now;
                    newDb.MaLoaiMon = MaLoaiMon;
                    context.MonAns.Add(newDb);
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
        public JsonResult editFood(string MaMonAn, string TenMonAn, int Gia, string DonViTinh, string HinhAnh, DateTime? ThoiGianRaMat, string Mota, string MaLoaiMon)
        {
            var context = new Model1();
            using (DbContextTransaction transaction = context.Database.BeginTransaction())
            {
                try
                {
                    MonAn food = context.MonAns.SingleOrDefault(x => x.MaMonAn == MaMonAn);
                    food.TenMonAn = TenMonAn;
                    food.Gia = Gia;
                    food.DonViTinh = DonViTinh;
                    var splitFile = HinhAnh.Split('\\');
                    string img = "/Web_Admin/assets/img/" + splitFile[splitFile.Length - 1];
                    food.HinhAnh = img;
                    food.MoTa = Mota;
                    food.ThoiGianRaMat = ThoiGianRaMat;
                    food.MaLoaiMon = MaLoaiMon;
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

        public JsonResult deleteFood(string MaMonAn)
        {
            var context = new Model1();
            using (DbContextTransaction transaction = context.Database.BeginTransaction())
            {
                try
                {
                    MonAn food = context.MonAns.SingleOrDefault(x => x.MaMonAn == MaMonAn);
                    context.MonAns.Remove(food);
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